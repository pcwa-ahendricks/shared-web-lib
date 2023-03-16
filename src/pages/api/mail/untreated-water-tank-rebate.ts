import {string, object, StringSchema} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '../../../lib/api/mailjet'
import {
  getRecaptcha,
  validateSchema,
  emailRecipientsEffRebates,
  emailRecipientsSysAdmin
} from '../../../lib/api/forms'

import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localFormat} from '@lib/api/shared'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 3883926

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
  untreatedCustomer: '' | 'Yes' | 'No'
  termsAgree: string
  signature: string
  captcha: string
  comments: string
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
        howDidYouHear: string().required(),
        otherHowDidYouHear: string().when(
          'howDidYouHear',
          (howDidYouHear: string | undefined, schema: StringSchema) =>
            howDidYouHear && howDidYouHear.toLowerCase() === 'other'
              ? schema.required()
              : schema
        ),
        propertyType: string().required(),
        untreatedCustomer: string().required().oneOf(
          ['Yes'] // "Yes", "No"
        ),
        termsAgree: string().required().oneOf(['true']),
        signature: string().required(),
        captcha: string().required(),
        comments: string().max(200)
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
      untreatedCustomer,
      propertyType,
      termsAgree,
      signature,
      captcha,
      comments = ''
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
        if (typeof error === 'string') {
          const translatedErrors = recaptcha.translateErrors(error) // translate error codes to human readable text
          console.log('Recaptcha key is invalid', translatedErrors)
          res.status(400).send(translatedErrors)
        }
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

    const replyToName = `${firstName} ${lastName}`
    // since email is required, use that info for 'cc' and 'reply to'
    const ccAndReplyToRecipient = {Email: email, Name: replyToName}

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
          To: [...emailRecipientsEffRebates],
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
            untreatedCustomer,
            submitDate: localFormat(localDate(), 'MMMM do, yyyy'),
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
