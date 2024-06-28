// cspell:ignore customerservices pcwamain
import {string, object, array} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '@lib/api/mailjet'
import {
  getRecaptcha,
  validateSchema,
  AttachmentFieldValue,
  emailRecipientsSysAdmin,
  emailRecipientsWtrWaste
} from '@lib/api/forms'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localDateFrom, localFormat} from '@lib/localDate'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 1487509

interface FormDataObj {
  name: string
  email: string
  phone: string
  incidentDateTime: string
  incidentAddress: string
  incidentCity: string
  incidentReason: string
  description: string
  captcha: string
  photos: AttachmentFieldValue[]
}

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .camelCase()
      .required()
      .shape({
        captcha: string().required(),
        name: string(),
        email: string().email().required(),
        // .min() also makes the field required. Don't use here since the phone number is not a required field. Chaining .notRequired() or .nullable() doesn't seem ti fix issue.
        // phone: string().min(10)
        phone: string(),
        incidentAddress: string().required(),
        incidentCity: string().required(),
        incidentDateTime: string().required(),
        incidentReason: string().required(),
        description: string().required(),
        photos: array().of(
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
      name,
      email,
      phone,
      incidentAddress,
      incidentCity,
      incidentDateTime,
      incidentReason,
      description,
      captcha,
      photos = []
    } = formData

    const photoAttachments = photos.map((p) => p.url)

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

    // since email is required, use that info for 'cc' and 'reply to'
    const ccAndReplyToRecipient = {Email: email, Name: name ? name : email}

    const submitDate = localFormat(localDate(), 'MMMM do, yyyy')
    const incidentDateTimeFrmt = localFormat(
      localDateFrom(incidentDateTime),
      // 'PPPPpppp' // ex.) Thursday, July 7th, 2022 at 6:58:19 PM GMT+00:00
      "EEEE',' LLLL do',' yyy 'at' h:mm aaa" // ex.) Thursday, July 7th, 2022 at 12:00 pm
    )

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
          To: [...emailRecipientsWtrWaste],
          Cc: [ccAndReplyToRecipient],
          Bcc: emailRecipientsSysAdmin,
          ReplyTo: ccAndReplyToRecipient,
          Headers: {
            'PCWA-No-Spam': 'webmaster@pcwa.net'
          },
          Subject: 'Water Waste - PCWA.net',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            email,
            name,
            phone,
            incidentDateTime: incidentDateTimeFrmt,
            incidentAddress,
            incidentCity,
            incidentReason,
            description,
            submitDate,
            photoAttachments
          }
        }
      ]
    }

    isDev &&
      console.log(
        'Mailjet Request Body: ',
        JSON.stringify(requestBody, null, 2)
      )

    const postData = await postMailJetRequest(requestBody)
    res.status(200).json(postData)
  } catch (error) {
    // isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    res.status(500).end()
  }
}

export default mainHandler
