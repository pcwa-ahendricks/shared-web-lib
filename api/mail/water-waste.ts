// cspell:ignore customerservices pcwamain
import {string, object, array} from 'yup'
import {format} from 'date-fns'
import {
  MailJetSendRequest,
  MailJetMessage,
  postMailJetRequest
} from '../../src/lib/api/mailjet'
import {
  getRecaptcha,
  validateSchema,
  AttachmentFieldValue
} from '../../src/lib/api/forms'
import {NowRequest, NowResponse} from '@vercel/node'
import {json} from 'co-body'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 1487509

// Additional email addresses are added to array below.
const SA_RECIPIENTS: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

interface FormDataObj {
  name: string
  email: string
  phone: string
  location: string
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
        captcha: string().required(
          'Checking this box is required for security purposes'
        ),
        name: string(),
        email: string().email(),
        phone: string().min(10),
        location: string().required(),
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

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const data = await json(req)
    const body: {
      formData: FormDataObj
    } = data

    await validateSchema(bodySchema, body)

    // const sendEmail = Mailjet.post('send', {
    //   version: 'v3.1'
    // })

    const {formData} = body
    const {
      email,
      name,
      phone,
      location,
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

    const mainRecipients: MailJetMessage['To'] = isDev
      ? []
      : [{Email: 'waterefficiency@pcwa.net', Name: 'Water Efficiency'}]

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
          Subject: 'Water Waste - PCWA.net',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            email,
            name,
            phone,
            location,
            description,
            submitDate: format(new Date(), 'MMMM do, yyyy'),
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
