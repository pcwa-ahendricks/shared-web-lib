// cspell:ignore addtl mnfg watersense Formik's
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {Typography as Type} from '@mui/material'
import {Formik} from 'formik'
import {string, object, array} from 'yup'
import {
  postForm,
  SmartControllerRebateFormData as RebateFormData,
  SmartControllerRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import delay from '@lib/delay'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {BooleanAsString} from '@lib/safeCastBoolean'
import SmartControllerForm from '@components/forms/smartControllerForm'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import SmartControllerEligibilityDialog from '@components/formFields/SmartControllerEligibilityDialog'
import FormValidate from '@components/forms/FormValidate/FormValidate'

const SERVICE_URI_PATH = 'smart-controller-rebate'

const formSchema = object({
  firstName: string().required().label('First Name'),
  lastName: string().required().label('Last Name'),
  email: string().email().required().label('Email'),
  accountNo: string()
    .matches(
      /^\d+-\d+$/,
      'Account Number must contain a dash ("-") character and should not include any letters or spaces'
    )
    .required('An Account Number is required (leading zeros are optional)')
    .label('Account Number'),
  address: string().required().label('Billing Address'),
  city: string().required().label('City'),
  otherCity: string()
    .label('City')
    .when('city', {
      is: (city: string | null) => city && city.toLowerCase() === 'other',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema
    }),
  phone: string().required().min(10).label('Phone Number'),
  howDidYouHear: string()
    .required()
    .label('How Did You Hear About this Rebate Program'),
  otherHowDidYouHear: string()
    .label('How Did You Hear About this Rebate Program')
    .when('howDidYouHear', {
      is: (howDidYouHear: string | null) =>
        howDidYouHear && howDidYouHear.toLowerCase() === 'other',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema
    }),
  propertyType: string().required().label('Property Type'),
  treatedCustomer: string().required().label('Treated Customer').oneOf(
    ['Yes'], // "Yes", "No"
    'You must be a current Placer County Water Agency treated water customer'
  ),
  make: string().required().label('Make'),
  model: string().required().label('Model/Zones'),
  replaceExisting: string()
    .required()
    .label(
      'Are you replacing an existing EPA WaterSense Weather-Based Irrigation Controller with another Weather-Based Irrigation Controller?'
    )
    .oneOf(
      ['No'], // "Yes", "No"
      'Rebates are not available for the replacement of an existing EPA WaterSense Weather-Based Irrigation Controller.'
    ),
  watersenseApproved: string().required().label('Watersense Approved'),
  termsAgree: string()
    .required()
    .oneOf(['true'], 'Must agree to Terms and Conditions by checking this box')
    .label('Agree to Terms'),
  emailAttachments: string().label('Email Attachments'),
  signature: string().required().label('Your signature'),
  captcha: string()
    .required('Checking this box is required for security purposes')
    .label('This checkbox'),
  comments: string()
    .max(200, 'Comments must be less than 200 characters.')
    .label('Comments'),
  receipts: array()
    .when('emailAttachments', {
      is: (emailAttachments: BooleanAsString) => emailAttachments === 'true',
      then: (schema) => schema,
      otherwise: (schema) =>
        schema.required('Must provide receipt(s) or proof of purchase')
    })
    .of(
      object({
        status: string()
          .required()
          .lowercase()
          .matches(/success/, 'Remove and/or retry un-successful uploads'),
        url: string().required('Attachment URL is not available').url()
      })
    ),
  installPhotos: array()
    .when('emailAttachments', {
      is: (emailAttachments: BooleanAsString) => emailAttachments === 'true',
      then: (schema) => schema,
      otherwise: (schema) =>
        schema.required('Must provide photo(s) of installed smart controller')
    })
    .of(
      object({
        status: string()
          .required()
          .lowercase()
          .matches(/success/, 'Remove and/or retry un-successful uploads'),
        url: string().required('Attachment URL is not available').url()
      })
    )
})
  .camelCase()
  .strict(true)

const initialFormValues: RebateFormData = {
  firstName: '',
  lastName: '',
  email: '',
  accountNo: '',
  address: '',
  city: '',
  otherCity: '',
  phone: '',
  howDidYouHear: '',
  otherHowDidYouHear: '',
  propertyType: '',
  treatedCustomer: '',
  make: '',
  model: '',
  replaceExisting: '',
  watersenseApproved: '',
  termsAgree: '',
  emailAttachments: '',
  signature: '',
  captcha: '',
  comments: '',
  receipts: [],
  installPhotos: []
}

export default function SmartController() {
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [eligibilityDialogOpen, setEligibilityDialogOpen] =
    useState<boolean>(false)
  const [providedEmail, setProvidedEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [ineligible, setIneligible] = useState<boolean>(false)

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
    setProvidedEmail('')
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  useEffect(() => {
    const fn = async () => {
      await delay(800)
      setEligibilityDialogOpen(true)
    }
    fn()
  }, [])

  const ineligibleChangeHandler = useCallback((value: boolean) => {
    setIneligible(value)
  }, [])

  const mainEl = useMemo(
    () => (
      <>
        <NarrowContainer>
          <MainBox>
            <Type variant="h1" color="primary" gutterBottom>
              Water Efficiency Rebate Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              Smart Controller
            </Type>

            <Formik
              initialValues={initialFormValues}
              validationSchema={formSchema}
              onSubmit={async (values: RebateFormData, actions) => {
                try {
                  // console.log(values, actions)
                  setProvidedEmail(values.email)
                  const body: RequestBody = {
                    formData: {...values}
                  }
                  await postForm(SERVICE_URI_PATH, body)
                  actions.setSubmitting(false)
                  // Reset Form
                  setIneligible(false)
                  actions.resetForm() // Strictly Formik
                  setFormSubmitDialogOpen(true)
                } catch (error) {
                  console.warn('An error occurred submitting form.', error)
                  setErrorMessage(error.message)
                  setFormSubmitDialogErrorOpen(true)
                  actions.setSubmitting(false)
                }
              }}
            >
              <ProtectRouteChange>
                <FormValidate>
                  <SmartControllerForm
                    ineligible={ineligible}
                    onIneligibleChange={ineligibleChangeHandler}
                  />
                  <SmartControllerEligibilityDialog
                    open={eligibilityDialogOpen}
                    onClose={() => setEligibilityDialogOpen(false)}
                  />
                </FormValidate>
              </ProtectRouteChange>
            </Formik>
          </MainBox>
        </NarrowContainer>
      </>
    ),
    [ineligible, ineligibleChangeHandler, eligibilityDialogOpen]
  )

  return (
    <>
      <PageLayout title="Smart Controller Rebate Form" waterSurface>
        {mainEl}
      </PageLayout>
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="Smart Controller Rebate Application"
        dialogTitle="Your Rebate Application Has Been Submitted"
      />
      <FormSubmissionDialogError
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </>
  )
}
