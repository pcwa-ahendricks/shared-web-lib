// cspell:ignore addtl cbarnhill truthy
import {string, object, StringSchema} from 'yup'
import {format} from 'date-fns'
import {MailJetSendRequest, postMailJetRequest} from '../../../lib/api/mailjet'
import isNumber from 'is-number'
import {
  getRecaptcha,
  emailRecipientsIrrigation,
  validateSchema
} from '../../../lib/api/forms'

import {NowRequest, NowResponse} from '@vercel/node'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 765489

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
  treatedCustomer: '' | 'Yes' | 'No'
  irrigMethod: string
  inspectAgree: string
  termsAgree: string
  signature: string
  captcha: string
  comments: string
  useArtTurf: string
  alreadyStarted: string
  approxSqFeet: string
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
        treatedCustomer: string().required().oneOf(
          ['Yes'] // "Yes", "No"
        ),
        termsAgree: string().required().oneOf(['true']),
        inspectAgree: string().required().oneOf(['true']),
        signature: string().required(),
        captcha: string().required(),
        comments: string().max(200),
        irrigMethod: string().required().notOneOf(['Hand water']), // Case sensitive
        useArtTurf: string().required().oneOf(['false']),
        alreadyStarted: string().required(),
        approxSqFeet: string()
          .required()
          .test(
            'min-sq-feet',
            'A minimum of 300 square feet of lawn must be converted',
            (val: string): boolean => {
              const stripped = val && val.replace(/[^0-9.]/, '')
              if (isNumber(stripped)) {
                const valAsNo = Math.round(parseFloat(stripped))
                return valAsNo >= 300
              }
              return false
            }
          )
      })
  })

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const body: {
      formData: FormDataObj
    } = req.body
    if (!body) {
      res.status(400).end()
    }

    await validateSchema(bodySchema, body)

    // const sendEmail = Mailjet.post('send', {
    //   version: 'v3.1'
    // })

    const {formData} = body
    const {
      email,
      firstName,
      lastName,
      address,
      otherCity = '',
      phone,
      propertyType,
      treatedCustomer,
      irrigMethod,
      useArtTurf,
      approxSqFeet,
      alreadyStarted,
      termsAgree,
      signature,
      captcha,
      comments = ''
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

    const replyToName = `${firstName} ${lastName}`

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
          To: [{Email: email, Name: replyToName}, ...emailRecipientsIrrigation],
          ReplyTo: {
            Email: email,
            Name: replyToName
          },
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
            treatedCustomer,
            irrigMethod,
            useArtTurf,
            approxSqFeet,
            alreadyStarted,
            submitDate: format(new Date(), 'MMMM do, yyyy'),
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
    // isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    res.status(500).end()
  }
}

export default mainHandler
