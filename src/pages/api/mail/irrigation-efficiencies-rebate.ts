// cspell:ignore addtl cbarnhill truthy
import {string, object, array} from 'yup'
import {MailJetSendRequest, postMailJetRequest} from '@lib/api/mailjet'
import {
  getRecaptcha,
  emailRecipientsIrrigation,
  validateSchema,
  emailRecipientsSysAdmin,
  AttachmentFieldValue
} from '@lib/api/forms'

import {VercelResponse, VercelRequest} from '@vercel/node'
import {localDate, localFormat} from '@lib/localDate'
import {BooleanAsString} from '@lib/safeCastBoolean'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 762551

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
  upgradeLocations: {
    [key: string]: boolean
  }
  upgradeOpts: {
    [key: string]: boolean
  }
  termsAgree: string
  inspectAgree: string
  signature: string
  captcha: string
  emailAttachments: BooleanAsString
  describe: string
  preConvPhotos: AttachmentFieldValue[]
}

const bodySchema = object({
  formData: object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    accountNo: string()
      .matches(/^\d+-\d+$/)
      .required(),
    address: string().required(),
    city: string().required(),
    otherCity: string().when('city', {
      is: (city: string | undefined) => city && city.toLowerCase() === 'other',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema
    }),
    phone: string().min(10).required(),
    howDidYouHear: string().required(),
    otherHowDidYouHear: string().when('howDidYouHear', {
      is: (howDidYouHear: string | undefined) =>
        howDidYouHear && howDidYouHear.toLowerCase() === 'other',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema
    }),
    propertyType: string().required(),
    treatedCustomer: string().required().oneOf(['Yes']), // "Yes", "No"
    termsAgree: string().required().oneOf(['true']),
    emailAttachments: string().label('Email Attachments'),
    preConvPhotos: array()
      .when('emailAttachments', {
        is: (emailAttachments: BooleanAsString) => emailAttachments === 'true',
        then: (schema) => schema,
        otherwise: (schema) => schema.required().min(5)
      })
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/),
          url: string().required().url()
        })
      ),
    inspectAgree: string().required().oneOf(['true']),
    signature: string().required(),
    captcha: string().required(),
    describe: string().required().max(300),
    irrigMethod: string().required().notOneOf(['Hand water']), // Case sensitive
    upgradeLocations: object()
      .required()
      .test(
        'has-one-location-option',
        'upgradeLocations has no truth',
        hasTrueValue
      ),
    upgradeOpts: object()
      .required()
      .test('has-one-upgrade-option', 'upgradeOpts has no truth', hasTrueValue)
  })
    .camelCase()
    .required()
}).required()

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
      treatedCustomer,
      irrigMethod,
      upgradeLocations,
      upgradeOpts,
      termsAgree,
      emailAttachments = '',
      preConvPhotos = [],
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
    // Overwrite "howDidYouHear" with "otherHowDidYouHear"
    if (howDidYouHear.toLowerCase() === 'other') {
      howDidYouHear = otherHowDidYouHear
    }

    const mappedUpgradeLocations = mapTruthyKeys(upgradeLocations)
    const mappedUpgradeOpts = mapTruthyKeys(upgradeOpts)

    const preConvImages = preConvPhotos.map((attachment) => attachment.url)

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
            treatedCustomer,
            irrigMethod,
            upgradeLocations: mappedUpgradeLocations,
            upgradeOpts: mappedUpgradeOpts,
            submitDate: localFormat(localDate(), 'MMMM do, yyyy'),
            emailAttachments,
            preConvImages,
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

function hasTrueValue(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    Object.keys(value).some((chkBoxVal) => value[chkBoxVal] === true)
  )
}

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

export default mainHandler
