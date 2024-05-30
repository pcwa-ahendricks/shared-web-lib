// cspell:ignore cbarnhill watersense
// import {attach, splitUpLargeMessage} from '../lib/mailjet-attachments'
import {string, object, array, number} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '@lib/api/mailjet'
import {
  getRecaptcha,
  AttachmentFieldValue,
  emailRecipientsAppliance,
  validateSchema,
  emailRecipientsSysAdmin
} from '@lib/api/forms'

import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localFormat} from '@lib/api/shared'
import {BooleanAsString} from '@lib/safeCastBoolean'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 881955

interface FormDataObj {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity?: string
  phone: string
  howDidYouHear: string
  otherHowDidYouHear?: string
  propertyType: string
  noOfToilets: number
  treatedCustomer: '' | 'Yes' | 'No'
  builtPriorCutoff: '' | 'Yes' | 'No'
  manufacturerModel: {
    manufacturer: string
    model: string
  }[]
  watersenseApproved: string
  termsAgree: string
  signature: string
  captcha: string
  emailAttachments: BooleanAsString
  comments: string
  receipts: AttachmentFieldValue[]
  installPhotos: AttachmentFieldValue[]
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
      is: (city: string | undefined) => city && city.toLowerCase() === 'other',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema
    }),
    phone: string().min(10).required(),
    howDidYouHear: string().required(),
    otherHowDidYouHear: string().when('howDidYouHear', {
      is: (howDidYouHear: string | undefined) =>
        howDidYouHear && howDidYouHear.toLowerCase() === 'other',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema
    }),
    propertyType: string().required(),
    noOfToilets: number().required().moreThan(0),
    treatedCustomer: string().required().oneOf(['Yes']), // "Yes", "No"
    builtPriorCutoff: string().required().oneOf(['Yes']), // "Yes", "No"
    manufacturerModel: array()
      .required()
      .of(
        object({
          manufacturer: string().required(),
          model: string().required()
        })
      ),
    watersenseApproved: string().required(),
    termsAgree: string().required().oneOf(['true']),
    signature: string().required(),
    captcha: string().required(),
    comments: string().max(200),
    emailAttachments: string(),
    receipts: array()
      .when('emailAttachments', {
        is: (emailAttachments: BooleanAsString) => emailAttachments === 'true',
        then: (schema) => schema,
        otherwise: (schema) => schema.required()
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
    installPhotos: array()
      .when('emailAttachments', {
        is: (emailAttachments: BooleanAsString) => emailAttachments === 'true',
        then: (schema) => schema,
        otherwise: (schema) => schema.required()
      })
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/),
          url: string().required().url()
        })
      )
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

    const {formData} = bodyParsed
    const {
      email,
      firstName,
      lastName,
      address,
      otherCity = '',
      phone,
      otherHowDidYouHear = '',
      propertyType,
      emailAttachments = '',
      receipts = [],
      installPhotos = [],
      termsAgree,
      signature,
      captcha,
      comments = '',
      treatedCustomer,
      builtPriorCutoff,
      manufacturerModel = [],
      watersenseApproved,
      noOfToilets = 1
    } = formData
    let {city = '', howDidYouHear = '', accountNo} = formData

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
    // Overwrite "howDidYouHear" with "otherHowDidYouHear"
    if (howDidYouHear.toLowerCase() === 'other') {
      howDidYouHear = otherHowDidYouHear
    }

    const receiptImages = receipts.map((attachment) => attachment.url)
    const installImages = installPhotos.map((attachment) => attachment.url)

    const replyToName = `${firstName} ${lastName}`
    // since email is required, use that info for 'cc' and 'reply to'
    const ccAndReplyToRecipient = {Email: email, Name: replyToName}

    // [TODO] - Need to fix the for loop on Mailjet. It's not displaying any info in that list. This is a workaround, just show the first item.
    let manufacturerModelOne = ''
    if (manufacturerModel.length >= 1) {
      manufacturerModelOne = `${manufacturerModel[0].manufacturer} - ${manufacturerModel[0].model}`
    }

    // const noOfAppliances = manufacturerModel.length.toString()
    const noOfToiletsStr = noOfToilets.toString()

    const commentsLength = comments.length

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
          To: [...emailRecipientsAppliance],
          Cc: [ccAndReplyToRecipient],
          Bcc: emailRecipientsSysAdmin,
          ReplyTo: ccAndReplyToRecipient,
          Headers: {
            'PCWA-No-Spam': 'webmaster@pcwa.net'
          },
          Subject: 'PCWA - Water Efficiency Rebate Submitted',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            firstName,
            lastName,
            accountNo,
            city,
            address,
            email,
            phone,
            howDidYouHear,
            propertyType,
            treatedCustomer,
            builtPriorCutoff,
            manufacturerModel,
            manufacturerModelOne,
            noOfToiletsStr,
            watersenseApproved,
            submitDate: localFormat(localDate(), 'MMMM do, yyyy'),
            emailAttachments,
            receiptImages,
            installImages,
            termsAgree,
            signature,
            comments,
            commentsLength
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
    console.error('Mailjet sendMail error status: ', error.statusCode)
    res.status(500).end()
  }
}

export default mainHandler
