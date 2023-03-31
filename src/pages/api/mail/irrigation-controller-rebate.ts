// cspell:ignore addtl cbarnhill
import {
  string,
  object,
  array,
  date,
  StringSchema,
  ArraySchema,
  SchemaOf
} from 'yup'
import {parseISO} from 'date-fns'
import {MailJetSendRequest, postMailJetRequest} from '@lib/api/mailjet'
import {
  getRecaptcha,
  emailRecipientsIrrigation,
  validateSchema,
  emailRecipientsSysAdmin
} from '@lib/api/forms'
const isDev = process.env.NODE_ENV === 'development'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localFormat} from '@lib/api/shared'
import {BooleanAsString} from '@lib/safeCastBoolean'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 755362

// const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

interface AttachmentFieldValue {
  status: string
  url: string
}

interface FormDataObj {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity?: string
  phone: string
  propertyType: string
  manufacturer: string
  model: string
  additional?: string
  purchaseDate: string // Incoming date will be type 'string', not a Date Object.
  termsAgree: string
  signature: string
  captcha: string
  emailAttachments: BooleanAsString
  receipts: AttachmentFieldValue[]
  cntrlPhotos: AttachmentFieldValue[]
  addtlSensorPhotos?: AttachmentFieldValue[]
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
          (city: string | undefined, schema: StringSchema) =>
            city && city.toLowerCase() === 'other' ? schema.required() : schema
        ),
        phone: string().min(10).required(),
        propertyType: string().required(),
        manufacturer: string().required(),
        model: string().required(),
        additional: string(),
        purchaseDate: date().required(),
        termsAgree: string().required().oneOf(['true']),
        signature: string().required(),
        captcha: string().required(),
        emailAttachments: string(),
        receipts: array()
          .when(
            'emailAttachments',
            (
              emailAttachments: BooleanAsString,
              schema: ArraySchema<SchemaOf<string>>
            ) => (emailAttachments === 'true' ? schema : schema.required())
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
        cntrlPhotos: array()
          .when(
            'emailAttachments',
            (
              emailAttachments: BooleanAsString,
              schema: ArraySchema<SchemaOf<string>>
            ) => (emailAttachments === 'true' ? schema : schema.required())
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
        addtlSensorPhotos: array()
          .when(['additional', 'emailAttachments'], {
            is: (
              additional: string[] | undefined,
              emailAttachments: BooleanAsString
            ) => additional && emailAttachments !== 'true',
            then: (schema: ArraySchema<SchemaOf<string>>) =>
              schema.required(
                'Must provide photo(s) of installed sensor/outdoor cover'
              ),
            otherwise: (schema: ArraySchema<SchemaOf<string>>) => schema
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
      email,
      firstName,
      lastName,
      address,
      otherCity = '',
      phone,
      propertyType,
      manufacturer,
      model,
      additional,
      purchaseDate,
      emailAttachments = '',
      receipts = [],
      cntrlPhotos = [],
      addtlSensorPhotos = [],
      termsAgree,
      signature,
      captcha
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

    let purchaseDateStr = ''
    try {
      // Must convert string to Date prior to format() using Date() constructor or parseISO()
      const parsedDate = parseISO(purchaseDate)
      purchaseDateStr = localFormat(parsedDate, 'MM/dd/yyyy')
    } catch (error) {
      res.status(400).send('Invalid Date')
      return
    }

    const receiptImages = receipts.map((attachment) => attachment.url)
    const cntrlImages = cntrlPhotos.map((attachment) => attachment.url)
    const addtlSensorImages = addtlSensorPhotos.map(
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
            propertyType,
            purchaseDateStr,
            manufacturer,
            model,
            additional,
            submitDate: localFormat(localDate(), 'MMMM do, yyyy'),
            emailAttachments,
            receiptImages,
            cntrlImages,
            addtlSensorImages,
            termsAgree,
            signature,
            // Mailjet Template language errors will occur and the message will be "blocked" if template attempts to conditionally show section using boolean. Comparing strings works so boolean values are cast to string.
            hasAddtlSensorImages:
              addtlSensorImages && addtlSensorImages.length > 0
                ? 'true'
                : 'false'
          }
        }
      ]
    }

    // We are not actually attaching the attachments, but rather displaying the images inline in the email using the provided URI strings.
    // try {
    //   if (attachments && attachments.length > 0) {
    //     const sendAttachments = await attach(attachments)
    //     requestBody.Messages[0].Attachments = sendAttachments
    //   }
    // } catch (error) {
    //   isDev && console.log(error)
    //   throw createError(500, 'Error processing attachments.')
    // }

    isDev &&
      console.log(
        'Mailjet Request Body: ',
        JSON.stringify(requestBody, null, 2)
      )

    // See note above about Attachments.
    // const splitMessages = splitUpLargeMessage(requestBody.Messages[0])
    // requestBody.Messages = [...splitMessages]
    // console.log(requestBody.Messages.length)
    // const messageSendRequests: Array<MailJetSendRequest> = splitMessages.map(
    //   (msg) => ({
    //     Messages: [{...msg}]
    //   })
    // )
    // const allPromises = await messageSendRequests.map((request) =>
    //   postMailJetRequest(request)
    // )
    // const data = await Promise.all(allPromises)

    const postMailData = await postMailJetRequest(requestBody)
    res.status(200).json(postMailData)
  } catch (error) {
    // isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    res.status(500).end()
  }
}

export default mainHandler
