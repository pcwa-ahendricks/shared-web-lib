// cspell:ignore addtl cbarnhill truthy
import {string, object, StringSchema} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '../../../lib/api/mailjet'
import isNumber from 'is-number'
import {
  getRecaptcha,
  emailRecipientsIrrigation,
  validateSchema,
  emailRecipientsSysAdmin
} from '../../../lib/api/forms'

import {VercelRequest, VercelResponse} from '@vercel/node'
import {localDate, localFormat} from '@lib/api/shared'
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
  howDidYouHear: string
  otherHowDidYouHear?: string
  propertyType: string
  treatedCustomer: '' | 'Yes' | 'No'
  irrigMethod: string
  inspectAgree: string
  termsAgree: string
  signature: string
  captcha: string
  describe: string
  useArtTurf: string
  alreadyStarted: string
  approxSqFeet: string
  upgradeLocations: {
    [key: string]: boolean
  }
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
        treatedCustomer: string().required().oneOf(
          ['Yes'] // "Yes", "No"
        ),
        termsAgree: string().required().oneOf(['true']),
        inspectAgree: string().required().oneOf(['true']),
        signature: string().required(),
        captcha: string().required(),
        describe: string().required().max(300),
        irrigMethod: string().required().notOneOf(['Hand water']), // Case sensitive
        useArtTurf: string().required().oneOf(['false']),
        alreadyStarted: string().required(),
        approxSqFeet: string()
          .required()
          .test(
            'min-sq-feet',
            'A minimum of 300 square feet of lawn must be converted',
            (val) => {
              const stripped = (val && val.replace(/[^0-9.]/, '')) || ''
              if (isNumber(stripped)) {
                const valAsNo = Math.round(parseFloat(stripped))
                return valAsNo >= 300
              }
              return false
            }
          ),
        upgradeLocations: object()
          .required()
          .test(
            'has-one-location-option',
            'upgradeLocations has no truth',
            hasTrueValue
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
      otherHowDidYouHear = '',
      propertyType,
      upgradeLocations,
      treatedCustomer,
      irrigMethod,
      useArtTurf,
      approxSqFeet,
      alreadyStarted,
      termsAgree,
      signature,
      captcha,
      describe = ''
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
    // Overwrite "howDidYouHear" with "otherHowDidYouHear" if another city was specified.
    if (howDidYouHear.toLowerCase() === 'other') {
      howDidYouHear = otherHowDidYouHear
    }

    const replyToName = `${firstName} ${lastName}`
    // since email is required, use that info for 'cc' and 'reply to'
    const ccAndReplyToRecipient = {Email: email, Name: replyToName}

    const mappedUpgradeLocations = mapTruthyKeys(upgradeLocations)

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
            howDidYouHear,
            propertyType,
            upgradeLocations: mappedUpgradeLocations,
            treatedCustomer,
            irrigMethod,
            useArtTurf,
            approxSqFeet,
            alreadyStarted,
            submitDate: localFormat(localDate(), 'MMMM do, yyyy'),
            termsAgree,
            signature,
            describe
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

function mapTruthyKeys(obj: any) {
  return Object.keys(obj)
    .map((key) => {
      if (obj[key] === true) {
        return key
      } else {
        return null
      }
    })
    .filter(Boolean)
}

function hasTrueValue(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    Object.keys(value).some((chkBoxVal) => value[chkBoxVal] === true)
  )
}
