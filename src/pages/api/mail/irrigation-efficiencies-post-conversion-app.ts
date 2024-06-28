// cspell:ignore addtl cbarnhill truthy conv
import {string, object, array} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '@lib/api/mailjet'
import {
  getRecaptcha,
  emailRecipientsIrrigation,
  validateSchema,
  emailRecipientsSysAdmin,
  AttachmentFieldValue
} from '@lib/api/forms'
import {VercelResponse, VercelRequest} from '@vercel/node'
import {localDate, localFormat} from '@lib/localDate'
import {BooleanAsString} from '@lib/safeCastBoolean'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 4662558

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
  photosTaken: '' | 'Yes' | 'No'
  partsReceipts: '' | 'Yes' | 'No'
  describe: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  postConvPhotos: AttachmentFieldValue[]
  itemizedReceipts: AttachmentFieldValue[]
}

const bodySchema = object({
  formData: object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    accountNo: string()
      .matches(/^\d+-\d+$/)
      .required(),
    address: string().required(),
    city: string().required(),
    otherCity: string().when('city', {
      is: (city: string | null) => city && city.toLowerCase() === 'other',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema
    }),
    phone: string().required().min(10),
    propertyType: string().required(),
    rebateCustomer: string().required().oneOf(['Yes']),
    projectCompleted: string().required().oneOf(['Yes']),
    photosTaken: string().required().oneOf(['Yes']),
    partsReceipts: string().required().oneOf(['Yes']),
    describe: string().required().max(600),
    termsAgree: string().required().oneOf(['true']),
    emailAttachments: string(),
    postConvPhotos: array()
      .when('emailAttachments', {
        is: (emailAttachments: BooleanAsString) => emailAttachments === 'true',
        then: (schema) => schema,
        otherwise: (schema) => schema.required().min(5)
      })
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/),
          url: string().required().url()
        })
      ),
    itemizedReceipts: array()
      .when('emailAttachments', {
        is: (emailAttachments: BooleanAsString) => emailAttachments === 'true',
        then: (schema) => schema,
        otherwise: (schema) => schema.required().min(1)
      })
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/),
          url: string().required().url()
        })
      ),
    inspectAgree: string().required().oneOf(['true']),
    signature: string().required(),
    captcha: string().required()
  })
    .camelCase()
    .required()
}).required()

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
      // rebateCustomer,
      // projectCompleted,
      // photosTaken,
      // partsReceipts,
      describe = '',
      // termsAgree,
      emailAttachments = '',
      signature,
      captcha,
      postConvPhotos = [],
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
            describe,
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
