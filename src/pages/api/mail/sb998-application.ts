// cspell:ignore
import {string, object, StringSchema} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '../../../lib/api/mailjet'
import {
  getRecaptcha,
  validateSchema,
  emailRecipientsCollections,
  emailRecipientsSysAdmin
} from '../../../lib/api/forms'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localFormat} from '@lib/api/shared'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''
const MAILJET_TEMPLATE_ID = 3179372

interface FormDataObj {
  treatedCustomer: '' | 'Yes' | 'No'
  householdAssist: '' | 'Yes' | 'No'
  householdIncome: '' | 'Yes' | 'No'
  primaryCareCert: '' | 'Yes' | 'No'
  paymentPlan: '' | 'Yes' | 'No'
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  svcAddress: string
  ownerTenant: string
  phone: string
  signature: string
  captcha: string
  applicationTitle: string
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
        svcAddress: string().required(),
        ownerTenant: string().required(),
        phone: string().required().min(10),
        treatedCustomer: string().required().oneOf(
          ['Yes'] // "Yes", "No"
        ),
        householdAssist: string().required(),
        householdIncome: string().when(
          'householdAssist',
          (householdAssist: string | null, schema: StringSchema) =>
            householdAssist && householdAssist.toLowerCase() === 'no'
              ? schema.oneOf(['Yes'])
              : schema
        ),
        primaryCareCert: string().required(),
        paymentPlan: string().when(
          'primaryCareCert',
          (primaryCareCert: string | null, schema: StringSchema) =>
            primaryCareCert && primaryCareCert.toLowerCase() === 'yes'
              ? schema.oneOf(['Yes'])
              : schema
        ),
        signature: string().required(),
        captcha: string().required()
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
      svcAddress,
      phone,
      treatedCustomer,
      paymentPlan,
      primaryCareCert,
      householdAssist,
      householdIncome,
      applicationTitle,
      ownerTenant,
      signature,
      captcha
    } = formData
    let {accountNo} = formData

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
          To: [...emailRecipientsCollections],
          Cc: [ccAndReplyToRecipient],
          Bcc: emailRecipientsSysAdmin,
          ReplyTo: ccAndReplyToRecipient,
          Headers: {
            'PCWA-No-Spam': 'webmaster@pcwa.net'
          },
          Subject:
            'PCWA - Water Shutoff Protection Self Certification Form Submitted',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            firstName,
            lastName,
            accountNo,
            address,
            svcAddress,
            email,
            phone,
            treatedCustomer,
            primaryCareCert,
            householdAssist,
            ...(paymentPlan && {paymentPlan}),
            ...(householdIncome && {householdIncome}),
            ownerTenant,
            applicationTitle,
            submitDate: localFormat(localDate(), 'MMMM do, yyyy'),
            signature
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
