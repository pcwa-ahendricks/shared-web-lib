// cspell:ignore cbarnhill watersense
// import {attach, splitUpLargeMessage} from '../lib/mailjet-attachments'
import {string, object, array, StringSchema, ArraySchema, SchemaOf} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '@lib/api/mailjet'
import {
  getRecaptcha,
  AttachmentFieldValue,
  emailRecipientsAppliance,
  validateSchema,
  emailRecipientsSysAdmin
} from '@lib/api/forms'

import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localDateFrom, localFormat} from '@lib/api/shared'
import {BooleanAsString} from '@lib/safeCastBoolean'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 4665597

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
  leakBeginDate?: string
  leakIdentifyDate: string
  leakRepairDate: string
  describe: string
  eligibilityRequirements: {
    [key: string]: boolean
  }
  termsAgree: string
  signature: string
  captcha: string
  emailAttachments: BooleanAsString
  receipts: AttachmentFieldValue[]
  leakPhotos: AttachmentFieldValue[]
  repairPhotos: AttachmentFieldValue[]
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
          .matches(/^\d+-\d+$/)
          .required(),
        address: string().required(),
        city: string().required(),
        otherCity: string().when(
          'city',
          (city: string | null, schema: StringSchema) =>
            city && city.toLowerCase() === 'other' ? schema.required() : schema
        ),
        phone: string().required().min(10),
        howDidYouHear: string().required(),
        otherHowDidYouHear: string().when(
          'howDidYouHear',
          (howDidYouHear: string | null, schema: StringSchema) =>
            howDidYouHear && howDidYouHear.toLowerCase() === 'other'
              ? schema.required()
              : schema
        ),
        propertyType: string().required(),
        leakBeginDate: string(), // not required
        leakIdentifyDate: string().required(),
        leakRepairDate: string().required(),
        termsAgree: string().required().oneOf(['true']),
        emailAttachments: string(),
        signature: string().required(),
        captcha: string().required(),
        describe: string().required().max(400),
        eligibilityRequirements: object()
          .required()
          .test(
            'is-eligible',
            'You must meet all the requirements to apply for Water Leak Rebate',
            hasAllTrueValue
          ),
        receipts: array()
          .when(
            'emailAttachments',
            (
              emailAttachments: BooleanAsString,
              schema: ArraySchema<SchemaOf<string>>
            ) =>
              emailAttachments === 'true' ? schema : schema.required().min(1)
          )
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(/success/),
              url: string().required().url()
            })
          ),
        leakPhotos: array()
          .when(
            'emailAttachments',
            (
              emailAttachments: BooleanAsString,
              schema: ArraySchema<SchemaOf<string>>
            ) =>
              emailAttachments === 'true' ? schema : schema.required().min(1)
          )
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(/success/),
              url: string().required().url()
            })
          ),
        repairPhotos: array()
          .when(
            'emailAttachments',
            (
              emailAttachments: BooleanAsString,
              schema: ArraySchema<SchemaOf<string>>
            ) =>
              emailAttachments === 'true' ? schema : schema.required().min(1)
          )
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
      leakBeginDate,
      leakIdentifyDate,
      leakRepairDate,
      describe = '',
      // eligibilityRequirements,
      receipts = [],
      leakPhotos = [],
      repairPhotos = [],
      termsAgree,
      signature,
      captcha
    } = formData
    let {city = '', howDidYouHear = '', accountNo} = formData

    const leakBeginDateFrmt = leakBeginDate
      ? localFormat(
          localDateFrom(leakBeginDate),
          // 'PPPPpppp' // ex.) Thursday, July 7th, 2022 at 6:58:19 PM GMT+00:00
          "EEEE',' LLLL do',' yyy" // ex.) Thursday, July 7th, 2022
        )
      : ''

    const leakIdentifyDateFrmt = localFormat(
      localDateFrom(leakIdentifyDate),
      "EEEE',' LLLL do',' yyy" // ex.) Thursday, July 7th, 2022
    )

    const leakRepairDateFrmt = localFormat(
      localDateFrom(leakRepairDate),
      "EEEE',' LLLL do',' yyy" // ex.) Thursday, July 7th, 2022
    )

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
    const leakImages = leakPhotos.map((attachment) => attachment.url)
    const repairImages = repairPhotos.map((attachment) => attachment.url)

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
            emailAttachments,
            receiptImages,
            leakImages,
            repairImages,
            leakBeginDateFrmt,
            leakIdentifyDateFrmt,
            leakRepairDateFrmt,
            describe,
            termsAgree,
            signature,
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
    console.error('Mailjet sendMail error status: ', error.statusCode)
    res.status(500).end()
  }
}

export default mainHandler

function hasAllTrueValue(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    Object.keys(value).every((chkBoxVal) => value[chkBoxVal] === true)
  )
}
