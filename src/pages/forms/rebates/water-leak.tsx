// cspell:ignore addtl mnfg watersense Formik's
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {Typography as Type} from '@material-ui/core'
import {Formik} from 'formik'
import {string, object, array, StringSchema, ArraySchema, SchemaOf} from 'yup'
import {
  postForm,
  WaterLeakFormData as RebateFormData,
  WaterLeakRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import delay from 'then-sleep'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {BooleanAsString} from '@lib/safeCastBoolean'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import WaterLeakForm from '@components/forms/waterLeakForm'

const SERVICE_URI_PATH = 'water-leak'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
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
      .when('city', (city: string | null, schema: StringSchema) =>
        city && city.toLowerCase() === 'other' ? schema.required() : schema
      ),
    phone: string().required().min(10).label('Phone Number'),
    howDidYouHear: string()
      .required()
      .label('How Did You Hear About this Rebate Program'),
    otherHowDidYouHear: string()
      .label('How Did You Hear About this Rebate Program')
      .when(
        'howDidYouHear',
        (howDidYouHear: string | null, schema: StringSchema) =>
          howDidYouHear && howDidYouHear.toLowerCase() === 'other'
            ? schema.required()
            : schema
      ),
    propertyType: string().required().label('Property Type'),
    treatedCustomer: string().required().label('Treated Customer').oneOf(
      ['Yes'], // "Yes", "No"
      'You must be a current Placer County Water Agency treated water customer'
    ),
    termsAgree: string()
      .required()
      .oneOf(
        ['true'],
        'Must agree to Terms and Conditions by checking this box'
      )
      .label('Agree to Terms'),
    emailAttachments: string().label('Email Attachments'),
    signature: string().required().label('Your signature'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    describe: string()
      .required('Please briefly describe your leak and repair')
      .max(400, 'Comments must be less than 400 characters.')
      .label('Describe Leak and Repair'),
    receipts: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema.required('Must provide receipt(s) or proof of purchase')
      )
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string().required('Attachment URL is not available').url()
        })
      ),
    leakPhotos: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema.required('Must provide photo(s) of Water Leak')
      )
      .of(
        object({
          status: string()
            .required()
            .lowercase()
            .matches(/success/, 'Remove and/or retry un-successful uploads'),
          url: string().required('Attachment URL is not available').url()
        })
      ),
    repairPhotos: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema.required('Must provide photo(s) of Leak Repair')
      )
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
  treatedCustomer: 'Yes',
  describe: '',
  leakBeginDate: null,
  leakIdentifyDate: null,
  leakRepairDate: null,
  receipts: [],
  leakPhotos: [],
  repairPhotos: [],
  termsAgree: '',
  emailAttachments: '',
  signature: '',
  captcha: ''
}

const WaterLeak = () => {
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
    console.log('changing inel', value)
    setIneligible(value)
  }, [])

  const mainEl = useMemo(
    () => (
      <>
        <NarrowContainer>
          <MainBox>
            {/* <Type variant="h1" color="primary" gutterBottom>
              Water Efficiency Rebate Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              Treated Water Leak
            </Type> */}

            <Type variant="h1" color="primary" gutterBottom>
              Treated Water Leak
            </Type>

            <Type variant="h2" color="primary" gutterBottom>
              Water Efficiency Rebate Form
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
              {/* Note - <FormValidate/> wrapper not needed with this form since it's implemented in <WaterLeakForm/>. */}
              <ProtectRouteChange>
                <WaterLeakForm
                  ineligible={ineligible}
                  onIneligibleChange={ineligibleChangeHandler}
                />
                {/* <LeakFixEffEligibilityDialog
                  open={eligibilityDialogOpen}
                  onClose={() => setEligibilityDialogOpen(false)}
                /> */}
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
      <PageLayout title="Water Leak Rebate Form" waterSurface>
        {mainEl}
      </PageLayout>
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="Water Leak Rebate Application"
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

export default WaterLeak
