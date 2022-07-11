// cspell:ignore customerservices pcwamain
import {string, object} from 'yup'
import {
  MailJetSendRequest,
  MailJetMessage,
  postMailJetRequest
} from '../../../lib/api/mailjet'
import {emailRecipientsSysAdmin, validateSchema} from '../../../lib/api/forms'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localFormat} from '@lib/api/shared'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 3804237

interface FormDataObj {
  name: string
  message: string
  email: string
  subject: string
  reason: string
  phone: string
  captcha: string
}

const bodySchema = object()
  .required()
  .shape({
    formData: object().camelCase().required().shape({
      name: string(),
      email: string().email(),
      message: string().required()
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
    const {email, name, message} = formData

    /*
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
    */

    const mainRecipients: MailJetMessage['To'] = isDev
      ? []
      : [{Email: 'cwmp@pcwa.net', Name: 'CWMP'}]

    // If user specified an email address 'cc' them.
    const ccRecipients: MailJetMessage['Cc'] = email
      ? [{Email: email, Name: name ? name : email}]
      : undefined

    // If user specified an email address use it with 'reply to'.
    const replyToRecipient: MailJetMessage['ReplyTo'] = email
      ? {Email: email, Name: name ? name : email}
      : undefined

    const toRecipients: MailJetMessage['To'] = [...mainRecipients]

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
          To: [...toRecipients],
          ...(ccRecipients && {Cc: ccRecipients}),
          Bcc: emailRecipientsSysAdmin,
          ...(replyToRecipient && {ReplyTo: replyToRecipient}),
          Headers: {
            'PCWA-No-Spam': 'webmaster@pcwa.net'
          },
          Subject: 'Contact Us Re. CWMP - PCWA.net',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            email,
            name,
            message,
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

    const postData = await postMailJetRequest(requestBody)
    res.status(200).json(postData)
  } catch (error) {
    // isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error)
    res.status(500).end()
  }
}

export default mainHandler
