// cspell:ignore customerservices pcwamain
import {string, object} from 'yup'
import {format} from 'date-fns'
import {
  MailJetSendRequest,
  MailJetMessage,
  postMailJetRequest
} from '../../../lib/api/mailjet'
import {getRecaptcha, validateSchema} from '../../../lib/api/forms'

import {NowRequest, NowResponse} from '@vercel/node'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 848345

// Additional email addresses are added to array below.
const SA_RECIPIENTS: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

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
    formData: object()
      .camelCase()
      .required()
      .shape({
        reason: string().required(),
        message: string().required(),
        captcha: string().required(
          'Checking this box is required for security purposes'
        ),
        subject: string().required(),
        name: string(),
        email: string().email(),
        phone: string().min(10)
      })
  })

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
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
      name,
      phone,
      reason,
      message,
      subject = '',
      captcha
    } = formData

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

    const mainRecipients: MailJetMessage['To'] = isDev
      ? []
      : subject.toLowerCase() === 'clerk to the board'
      ? [{Email: 'clerk@pcwa.net', Name: 'Clerk'}]
      : [{Email: 'customerservices@pcwa.net', Name: 'Customer Services'}]

    // If user specified an email address include it.
    const senderRecipients: MailJetMessage['To'] = email
      ? [{Email: email, Name: name ? name : email}]
      : []

    const toRecipients: MailJetMessage['To'] = [
      ...SA_RECIPIENTS,
      ...mainRecipients,
      ...senderRecipients
    ]

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
          ReplyTo: email
            ? {
                Email: email,
                Name: name ? name : email
              }
            : undefined,
          Headers: {
            'PCWA-No-Spam': 'webmaster@pcwa.net'
          },
          Subject: 'Contact Us - PCWA.net',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            email,
            name,
            phone,
            reason,
            message,
            subject,
            submitDate: format(new Date(), 'MMMM do, yyyy')
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
