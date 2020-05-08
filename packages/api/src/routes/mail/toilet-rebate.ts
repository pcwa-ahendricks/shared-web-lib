// cspell:ignore cbarnhill watersense
// import {attach, splitUpLargeMessage} from '../lib/mailjet-attachments'
import {string, object, array, StringSchema, number} from 'yup'
import {format} from 'date-fns'
import {MailJetSendRequest} from '../../types/mailjet'
import {
  getRecaptcha,
  AttachmentFieldValue,
  emailRecipientsAppliance,
  validateSchema
} from '../../lib/forms'
import {postMailJetRequest} from '../../lib/mailjet'
import {NowRequest, NowResponse} from '@vercel/node'
import {json} from 'co-body'
const isDev = process.env.NODE_ENV === 'development'

const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER ?? ''

const MAILJET_TEMPLATE_ID = 881955

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
  noOfToilets: number
  treatedCustomer: '' | 'Yes' | 'No'
  builtPriorCutoff: '' | 'Yes' | 'No'
  manufacturerModel: {
    manufacturer: string
    model: string
  }[]
  watersenseApproved: string
  termsAgree: string
  signature: string
  captcha: string
  emailAttachments: string
  comments: string
  receipts: AttachmentFieldValue[]
  installPhotos: AttachmentFieldValue[]
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
        noOfToilets: number().required().moreThan(0),
        treatedCustomer: string().required().oneOf(
          ['Yes'] // "Yes", "No"
        ),
        builtPriorCutoff: string().required().oneOf(
          ['Yes'] // "Yes", "No"
        ),
        manufacturerModel: array()
          .required()
          .of(
            object({
              manufacturer: string().required(),
              model: string().required()
            })
          ),
        watersenseApproved: string().required(),
        termsAgree: string().required().oneOf(['true']),
        signature: string().required(),
        captcha: string().required(),
        comments: string().max(200),
        emailAttachments: string(),
        receipts: array()
          .when(
            'emailAttachments',
            (emailAttachments: string, schema: StringSchema) =>
              emailAttachments === 'true' ? schema : schema.required()
          )
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(/success/),
              url: string().required().url()
            })
          ),
        installPhotos: array()
          .when(
            'emailAttachments',
            (emailAttachments: string, schema: StringSchema) =>
              emailAttachments === 'true' ? schema : schema.required()
          )
          .of(
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
    const data: any = await json(req)
    const body: {
      formData: FormDataObj
    } = data

    await validateSchema(bodySchema, body)

    const {formData} = body
    const {
      email,
      firstName,
      lastName,
      address,
      otherCity = '',
      phone,
      propertyType,
      emailAttachments = '',
      receipts = [],
      installPhotos = [],
      termsAgree,
      signature,
      captcha,
      comments = '',
      treatedCustomer,
      builtPriorCutoff,
      manufacturerModel = [],
      watersenseApproved,
      noOfToilets = 1
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

    const receiptImages = receipts.map((attachment) => attachment.url)
    const installImages = installPhotos.map((attachment) => attachment.url)

    const replyToName = `${firstName} ${lastName}`

    // const noOfAppliances = manufacturerModel.length.toString()
    const noOfToiletsStr = noOfToilets.toString()

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
          To: [{Email: email, Name: replyToName}, ...emailRecipientsAppliance],
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
            builtPriorCutoff,
            manufacturerModel,
            noOfToiletsStr,
            watersenseApproved,
            submitDate: format(new Date(), 'MMMM do, yyyy'),
            emailAttachments,
            receiptImages,
            installImages,
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
