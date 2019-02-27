// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {type IncomingMessage} from 'http'
import * as yup from 'yup'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

const waterWasteHandler = async (req: IncomingMessage) => {
  const body = await json(req)

  const bodySchema = yup
    .object()
    .required()
    .shape({
      formData: yup
        .object()
        .required()
        .shape({
          location: yup.string().required(),
          description: yup.string().required(),
          userInfo: yup.object().shape({
            email: yup.string(),
            phone: yup.string(),
            firstName: yup.string(),
            lastName: yup.string()
          })
        }),
      attachments: yup.array().of(yup.string()),
      recipients: yup
        .array()
        .required()
        .of(
          yup
            .object()
            .required()
            .shape({
              Name: yup.string().required(),
              Email: yup
                .string()
                .email()
                .required()
            })
        )
    })

  const isValid = await bodySchema.isValid(body)
  console.log('is valid', isValid)
  if (!isValid) {
    isDev && console.log('Body is not valid', JSON.stringify(body, null, 2))
    throw createError(400)
  }

  const sendEmail = Mailjet.post('send', {
    version: 'v3.1'
  })

  // "PCWA-No-Spam: webmaster@pcwa.net" is a email Header that is used to bypass Barracuda Spam filter.
  // We add it to all emails so that they don"t get caught.  The header is explicitly added to the
  // Barracuda via a rule Bryan H. added.

  const {recipients, formData} = body
  const variables = flatten({...formData})

  const requestBody: MailJetSendRequest = {
    Messages: [
      {
        From: {
          Email: MAILJET_SENDER,
          Name: 'PCWA Mailjet'
        },
        To: [...recipients],
        Subject: 'Water Waste Notification - PCWA.net',
        TemplateLanguage: true,
        TemplateID: 82714,
        Variables: variables,
        InlinedAttachments: [],
        Headers: {'PCWA-No-Spam': 'webmaster@pcwa.net'}
      }
    ]
  }

  // Conditionally add ReplyTo to Mailjet request body if user supplied an email address, name is optional.
  const name =
    variables.firstName || variables.lastName
      ? `${variables.firstName || ''} ${variables.lastName || ''}`.trim()
      : null
  if (variables.email) {
    requestBody.Messages[0].ReplyTo = {
      Email: variables.email
    }
    // Name is not required. Add it if it is supplied.
    if (name) {
      requestBody.Messages[0].ReplyTo = {
        ...requestBody.Messages[0].ReplyTo,
        Name: name
      }
    }
  }

  // Use Reply-To if email address was submitted in post request.
  // if (formData && formData.userInfo && formData.userInfo.email) {
  //   if (requestBody.Headers) {
  //     requestBody.Headers['Reply-To'] = formData.userInfo.email
  //   } else {
  //     requestBody.Headers = {}
  //     requestBody.Headers['Reply-To'] = formData.userInfo.email
  //   }
  // }

  // const requestBody = {
  //   Messages: [
  //     {
  //       From: {
  //         Email: MAILJET_SENDER,
  //         Name: 'PCWA Forms'
  //       },
  //       To: recipients,
  //       ReplyTo: {
  //         Email: email,
  //         Name: `${title} Examinee`
  //       },
  //       Headers: {
  //         'PCWA-No-Spam': 'webmaster@pcwa.net'
  //       },
  //       Subject: `${title} Exam Submitted`,
  //       TextPart: `${title} Exam Submitted\n${email} completed the ${title} Exam.\nScore: ${score}%\nYou can review this exam at ${reviewLink}`,
  //       HTMLPart: `<h2>${title} Exam Submitted</h2><br /><p>${email} completed the ${title} Exam.</p><br /><h3>Score: ${score}%</h3><br /><p>You can review this exam at <a href='${reviewLink}' target='blank'>${reviewLink}</a>.</p>`
  //     }
  //   ]
  // }

  try {
    isDev &&
      console.log(
        'Mailjet Request Body: ',
        JSON.stringify(requestBody, null, 2)
      )
    const result = await sendEmail.request(requestBody)
    isDev &&
      console.log(
        'Mailjet sendMail post response: ',
        JSON.stringify(result.body, null, 2)
      )
    return result.body
  } catch (error) {
    isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    throw error
  }
}

export const requestHandler = async (req: IncomingMessage) => {
  try {
    needsApiKey(MAILJET_KEY)
    return await waterWasteHandler(req)
  } catch (error) {
    throw error
  }
}

const needsApiKey = (key: string) => {
  if (!key) {
    throw createError(401, 'Unauthorized - Invalid API key')
  }
}

// export default mainHandler

type MailJetAttachment = {
  'Content-type': string,
  Filename: string,
  content: string
}

type MailJetMessage = {|
  From: {
    Name: string,
    Email: string
  },
  Subject: string,
  ReplyTo?: {
    Name?: string,
    Email: string
  },
  TemplateLanguage?: boolean,
  TemplateID?: number,
  Variables?: {},
  To: Array<{Email: string, Name: string}>,
  InlinedAttachments?: Array<MailJetAttachment>,
  Attachments?: Array<MailJetAttachment>,
  Headers?: {[headerKey: string]: string}
|}

type MailJetSendRequest = {
  Messages: Array<MailJetMessage>
}

function flatten(obj: any) {
  return Object.keys(obj).reduce((acc, current) => {
    const _key = `${current}`
    const currentValue = obj[current]
    if (Array.isArray(currentValue) || Object(currentValue) === currentValue) {
      Object.assign(acc, flatten(currentValue))
    } else {
      acc[_key] = currentValue
    }
    return acc
  }, {})
}
