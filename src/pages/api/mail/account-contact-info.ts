// cspell:ignore maint
import {string, object} from 'yup'
import {format} from 'date-fns'
import {MailJetSendRequest, postMailJetRequest} from '../../../lib/api/mailjet'
import {
  getRecaptcha,
  emailRecipientsCsMaint,
  validateSchema
} from '../../../lib/api/forms'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {dLog} from '@lib/api/shared'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 951337

interface FormDataObj {
  name: string
  spouseName: string
  email: string
  accountNo: string
  address: string
  previousAddress: string
  city: string
  state: string
  zipCode: string
  phone: string
  cellPhone: string
  workPhone: string
  spousePhone: string
  signature: string
  lastFourSS: string
  captcha: string
}

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .camelCase()
      .required()
      .shape({
        name: string().required().max(30),
        spouseName: string().max(27),
        email: string().email(),
        accountNo: string()
          .matches(/^\d+-\d+$/)
          .required(),
        address: string().required().max(30),
        previousAddress: string().max(60),
        city: string().required(),
        state: string().required(),
        zipCode: string().required(),
        // .min() also makes the field required. Don't use here since the phone number is not a required field. Chaining .notRequired() or .nullable() doesn't seem ti fix issue.
        phone: string().min(10),
        cellPhone: string().min(10),
        workPhone: string().min(10),
        spousePhone: string().min(10),
        lastFourSS: string().min(4),
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
      name,
      spouseName,
      address,
      previousAddress,
      email,
      city,
      state,
      zipCode,
      phone,
      cellPhone,
      workPhone,
      spousePhone,
      lastFourSS,
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
        const translatedErrors = recaptcha.translateErrors(error) // translate error codes to human readable text
        console.log('Recaptcha key is invalid', translatedErrors)
        res.status(400).send(translatedErrors)
        return
      }
    }

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
          To: [{Email: email, Name: name}, ...emailRecipientsCsMaint],
          ReplyTo: {
            Email: email,
            Name: name
          },
          Headers: {
            'PCWA-No-Spam': 'webmaster@pcwa.net'
          },
          Subject: 'PCWA - Customer Contact Information Change',
          TemplateID: MAILJET_TEMPLATE_ID,
          TemplateLanguage: true,
          Variables: {
            name,
            accountNo,
            spouseName,
            address,
            previousAddress,
            email,
            city,
            state,
            zipCode,
            phone,
            cellPhone,
            workPhone,
            spousePhone,
            lastFourSS,
            signature,
            submitDate: format(new Date(), 'MMMM do, yyyy')
          }
        }
      ]
    }

    dLog('Mailjet Request Body: ', JSON.stringify(requestBody, null, 2))

    const postMailData = await postMailJetRequest(requestBody)
    res.status(200).json(postMailData)
  } catch (error) {
    console.error('Mailjet sendMail error status: ', error.statusCode)
    throw error
  }
}

export default mainHandler
