// cspell:ignore addtl cbarnhill truthy conv
import {string, object, StringSchema, array, SchemaOf, ArraySchema} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '@lib/api/mailjet'
import {
  getRecaptcha,
  emailRecipientsIrrigation,
  validateSchema,
  emailRecipientsSysAdmin,
  AttachmentFieldValue
} from '@lib/api/forms'
import {VercelResponse, VercelRequest} from '@vercel/node'
import {localDate, localFormat} from '@lib/api/shared'
import {BooleanAsString} from '@lib/safeCastBoolean'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 4662607

interface FormDataObj {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  rebateCustomer: '' | 'Yes' | 'No'
  projectCompleted: '' | 'Yes' | 'No'
  worksheetCompleted: '' | 'Yes' | 'No'
  photosTaken: '' | 'Yes' | 'No'
  artTurfInstalled: '' | 'Yes' | 'No'
  partsReceipts: '' | 'Yes' | 'No'
  approxSqFeet: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  postConvPhotos: AttachmentFieldValue[]
  worksheetUploads: AttachmentFieldValue[]
  checklistUploads: AttachmentFieldValue[]
  itemizedReceipts: AttachmentFieldValue[]
}

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .camelCase()
      .required()
      .shape({
        firstName: string().required(),
        lastName: string().required(),
        email: string().email().required(),
        accountNo: string()
          .matches(
            /^\d+-\d+$/,
            'Account Number must contain a dash ("-") character and should not include any letters or spaces'
          )
          .required(
            'An Account Number is required (leading zeros are optional)'
          ),
        address: string().required(),
        city: string().required(),
        otherCity: string().when(
          'city',
          (city: string | null, schema: StringSchema) =>
            city && city.toLowerCase() === 'other' ? schema.required() : schema
        ),
        phone: string().required().min(10),
        propertyType: string().required(),
        rebateCustomer: string().required().oneOf(
          ['Yes'], // "Yes", "No"
          'You must be currently participating in the Irrigation Efficiencies Rebate Program'
        ),
        projectCompleted: string().required().oneOf(
          ['Yes'], // "Yes", "No"
          'Project must be completed'
        ),
        photosTaken: string().required().oneOf(
          ['Yes'], // "Yes", "No"
          'Post Conversion photographs (5) are required in order to submit application'
        ),
        partsReceipts: string().required().oneOf(
          ['Yes'], // "Yes", "No"
          'You must have itemized receipts or invoices to receive this rebate'
        ),
        describe: string()
          .required()
          .max(600, 'Description must be less than 600 characters.'),
        termsAgree: string()
          .required()
          .oneOf(
            ['true'],
            'Must agree to Terms and Conditions by checking this box'
          ),
        emailAttachments: string(),
        postConvPhotos: array()
          .when(
            'emailAttachments',
            (
              emailAttachments: BooleanAsString,
              schema: ArraySchema<SchemaOf<string>>
            ) =>
              emailAttachments === 'true'
                ? schema
                : schema
                    .required('You must provide 5 photos')
                    .min(5, 'You must provide 5 photos')
          )
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(
                  /success/,
                  'Remove and/or retry un-successful uploads'
                ),
              url: string().required('Attachment URL is not available').url()
            })
          ),
        itemizedReceipts: array()
          .when(
            'emailAttachments',
            (
              emailAttachments: BooleanAsString,
              schema: ArraySchema<SchemaOf<string>>
            ) =>
              emailAttachments === 'true'
                ? schema
                : schema
                    .required('You must provide itemized receipt(s)')
                    .min(1, 'You must provide itemized receipt(s)')
          )
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(
                  /success/,
                  'Remove and/or retry un-successful uploads'
                ),
              url: string().required('Attachment URL is not available').url()
            })
          ),
        inspectAgree: string()
          .required()
          .oneOf(
            ['true'],
            'Must agree to a scheduled site inspection by checking this box'
          ),
        signature: string().required().label('Your signature'),
        captcha: string().required(
          'Checking this box is required for security purposes'
        )
      })
  })

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader(
      'Cache-Control',
      'private, no-cache, no-store, must-revalidate'
    )
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')
    const {body} = req
    // body is string.
    const bodyParsed: {formData: FormDataObj} = JSON.parse(body)
    if (!bodyParsed) {
      res.status(400).end()
      return
    }

    await validateSchema(bodySchema, bodyParsed)

    // const sendEmail = Mailjet.post('send', {
    //   version: 'v3.1'
    // })

    const {formData} = bodyParsed
    const {
      firstName,
      lastName,
      email,
      address,
      otherCity = '',
      phone,
      propertyType,
      emailAttachments = '',
      signature,
      captcha,
      // rebateCustomer,
      // projectCompleted,
      // worksheetCompleted,
      // photosTaken,
      artTurfInstalled,
      partsReceipts,
      approxSqFeet,
      postConvPhotos = [],
      worksheetUploads = [],
      checklistUploads = [],
      itemizedReceipts = []
    } = formData
    let {city = '', accountNo} = formData

    // Remove leading zeros from account number.
    accountNo = accountNo
      .split('-')
      .map((part) => part.replace(/^[0]+/g, ''))
      .join('-')

    // Only validate recaptcha key in production.
    if (!isDev) {
      const recaptcha = getRecaptcha()
      try {
        await recaptcha.validate(captcha)
      } catch (error) {
        const translatedErrors = recaptcha.translateErrors(error) // translate error codes to human readable text
        console.log('Recaptcha key is invalid', translatedErrors)
        res.status(400).send(translatedErrors)
        return
      }
    }

    // Overwrite "city" with "otherCity" if another city was specified.
    if (city.toLowerCase() === 'other') {
      city = otherCity
    }

    const postConvImages = postConvPhotos.map((attachment) => attachment.url)
    const itemizedReceiptImages = itemizedReceipts.map(
      (attachment) => attachment.url
    )

    const replyToName = `${firstName} ${lastName}`
    // since email is required, use that info for 'cc' and 'reply to'
    const ccAndReplyToRecipient = {Email: email, Name: replyToName}

    // "PCWA-No-Spam: webmaster@pcwa.net" is a email Header that is used to bypass Barracuda Spam filter.
    // We add it to all emails so that they don"t get caught.  The header is explicitly added to the
    // Barracuda via a rule Bryan H. added.
    const requestBody: MailJetSendRequest = {
      Messages: [
        {
          From: {
            Email: MAILJET_SENDER,
            Name: 'PCWA Forms'
          },
          To: [...emailRecipientsIrrigation],
          Cc: [ccAndReplyToRecipient],
          Bcc: emailRecipientsSysAdmin,
          ReplyTo: ccAndReplyToRecipient,
          Headers: {
            'PCWA-No-Spam': 'webmaster@pcwa.net'
          },
          Subject:
            'PCWA - Water Efficiency Post-Conversion Application Submitted',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            firstName,
            lastName,
            email,
            accountNo,
            address,
            city,
            phone,
            propertyType,
            // rebateCustomer,
            // projectCompleted,
            // photosTaken,
            // partsReceipts,
            // termsAgree,
            emailAttachments,
            // captcha,
            signature,
            postConvImages,
            itemizedReceiptImages,
            submitDate: localFormat(localDate(), 'MMMM do, yyyy')
          }
        }
      ]
    }

    isDev &&
      console.log(
        'Mailjet Request Body: ',
        JSON.stringify(requestBody, null, 2)
      )

    const postMailData = await postMailJetRequest(requestBody)
    res.status(200).json(postMailData)
  } catch (error) {
    // isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    res.status(500).end()
  }
}

export default mainHandler
