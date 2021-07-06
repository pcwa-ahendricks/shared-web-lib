// cspell:ignore addtl mnfg watersense Formik's
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {Typography as Type} from '@material-ui/core'
import {Formik} from 'formik'
import {
  string,
  object,
  array,
  StringSchema,
  number,
  ArraySchema,
  SchemaOf
} from 'yup'
import {
  postForm,
  ToiletRebateFormData as RebateFormData,
  ToiletRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import FormSubmissionDialog from '@components/FormSubmissionDialog/FormSubmissionDialog'
import FormSubmissionDialogError from '@components/FormSubmissionDialogError/FormSubmissionDialogError'
import delay from 'then-sleep'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import ToiletEffEligibilityDialog from '@components/formFields/ToiletEffEligibilityDialog'
import {BooleanAsString} from '@lib/safeCastBoolean'
import ToiletForm from '@components/forms/toiletForm'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'

const SERVICE_URI_PATH = 'toilet-rebate'
const MAX_TOILETS = 25
const MIN_TOILETS = 1

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
    propertyType: string().required().label('Property Type'),
    noOfToilets: number()
      .required(
        'Number of toilets/urinals installed must be a number that is greater than 0.'
      )
      .moreThan(0)
      .label('Number of toilets/urinals installed'),
    treatedCustomer: string().required().label('Treated Customer').oneOf(
      ['Yes'], // "Yes", "No"
      'You must be a current Placer County Water Agency treated water customer'
    ),
    builtPriorCutoff: string()
      .required()
      .label('Was your building(s) built prior to 1994?')
      .oneOf(
        ['Yes'], // "Yes", "No"
        'Old toilets replaced must be rated at 3.0 (GPF) or more'
      ),
    manufacturerModel: array()
      .required()
      .label('Manufacturer and Model')
      .min(MIN_TOILETS)
      .max(MAX_TOILETS)
      .of(
        object({
          manufacturer: string().required().label('Toilet/Urinal Manufacturer'),
          model: string().required().label('Toilet/Urinal Model')
        })
      ),
    watersenseApproved: string().required().label('Watersense Approved'),
    // .oneOf(
    //   [''], // "Yes", "No"
    //   ''
    // ),
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
    comments: string()
      .max(200, 'Comments must be less than 200 characters.')
      .label('Comments'),
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
    installPhotos: array()
      .when(
        'emailAttachments',
        (
          emailAttachments: BooleanAsString,
          schema: ArraySchema<SchemaOf<string>>
        ) =>
          emailAttachments === 'true'
            ? schema
            : schema.required('Must provide photo(s) of installed toilet')
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
  propertyType: '',
  noOfToilets: 1,
  treatedCustomer: '',
  builtPriorCutoff: '',
  manufacturerModel: [{manufacturer: '', model: ''}],
  watersenseApproved: '',
  termsAgree: '',
  emailAttachments: '',
  signature: '',
  captcha: '',
  comments: '',
  receipts: [],
  installPhotos: []
}

const Toilet = () => {
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

  // Wasn't able to get this to work with React Hooks API. Likely due to use of Formik's use of render props function.
  // const getRows = (values: RebateFormData) => {
  //   if (!values || !(values.noOfToilets > 0)) {
  //     return []
  //   }
  //   const tempX: {key: number}[] = [],
  //     endInt = values.noOfToilets,
  //     maxInt = MAX_TOILETS
  //   let i = 1
  //   while (i <= endInt && i <= maxInt) {
  //     tempX.push({key: i})
  //     i++
  //   }
  //   return [...tempX]
  // }

  const mainEl = useMemo(
    () => (
      <>
        <NarrowContainer>
          <MainBox>
            <Type variant="h1" color="primary" gutterBottom>
              Water Efficiency Rebate Form
            </Type>

            <Type variant="h3" color="primary" gutterBottom>
              High Efficiency Toilet/Urinal
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
              {/* Note - <FormValidate/> wrapper not needed with this form since it's implemented in <ToiletForm/>. */}
              <ProtectRouteChange>
                <ToiletForm
                  ineligible={ineligible}
                  onIneligibleChange={ineligibleChangeHandler}
                />
                <ToiletEffEligibilityDialog
                  open={eligibilityDialogOpen}
                  onClose={() => setEligibilityDialogOpen(false)}
                />
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
      <PageLayout title="Toilet Rebate Form" waterSurface>
        {mainEl}
      </PageLayout>
      <FormSubmissionDialog
        providedEmail={providedEmail}
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
        description="High Efficiency Toilet and Waterless Urinal Retrofit Rebate Application"
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

export default Toilet
