// cspell:ignore addtl mnfg watersense Formik's
import React, {useState, useCallback, useEffect} from 'react'
import {Divider, Grid, Theme, Typography as Type} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {useFormikContext, Field, FieldProps} from 'formik'
import {SmartControllerRebateFormData} from '@lib/services/formService'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import YesNoSelectField from '@components/formFields/YesNoSelectField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import SignatureField from '@components/formFields/SignatureField'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import WatersenseRadioField from '@components/formFields/WatersenseRadioField'
import FormBox from '@components/boxes/FormBox'
import FormTextField from '@components/formFields/FormTextField'
import WaterSenseLogo from '@components/WaterSenseLogo/WaterSenseLogo'
import EmailAttachmentsSwitch from '@components/formFields/EmailAttachmentsSwitch'
import RebatesEmail from '@components/links/RebatesEmail'
import SubmitFormButton from './SubmitFormButton/SubmitFormButton'
import Spacing from '@components/boxes/Spacing'
import {ColumnBox} from 'mui-sleazebox'
// import HowDidYouHearAutocomplete from '@components/formFields/HowDidYouHearAutoselect'
import HowDidYouHearSelectField from '@components/formFields/HowDidYouHearSelectField'
import OtherHowDidYouHearField from '@components/formFields/OtherHowDidYouHearField'

type Props = {
  onIneligibleChange?: (eligible: boolean) => any
  ineligible?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // formikContainer: {
    //   height: '100%',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   width: '100%'
    // },
    dropzoneContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(3)
    },
    formGroup: {
      flex: '0 0 auto', // IE fix
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    // IE fix - IE will shrink Flex Column layouts. Need to override any defaults.
    ieFixFlexColumnDirection: {
      flexBasis: 'auto',
      flexGrow: 0,
      flexShrink: 0
    }
  })
)
const SmartControllerForm = ({
  ineligible = false,
  onIneligibleChange
}: Props) => {
  const classes = useStyles()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [receiptIsUploading, setReceiptIsUploading] = useState<boolean>(false)
  const [installPhotosIsUploading, setInstallPhotosIsUploading] =
    useState<boolean>(false)

  const receiptIsUploadingHandler = useCallback((isUploading) => {
    setReceiptIsUploading(isUploading)
  }, [])

  const installPhotosIsUploadingHandler = useCallback((isUploading) => {
    setInstallPhotosIsUploading(isUploading)
  }, [])

  const {
    setFieldValue,
    errors,
    isSubmitting,
    dirty,
    touched,
    values,
    validateForm
  } = useFormikContext<SmartControllerRebateFormData>()

  useEffect(() => {
    // Validate the form values any time they are updated.
    validateForm()
  }, [values, validateForm])

  if (dirty !== formIsDirty) {
    setFormIsDirty(dirty)
  }

  // Check if user is in-eligible for rebate and disable all form controls if so.
  const rebateIneligibility = [
    errors['treatedCustomer'],
    errors['replaceExisting']
  ].some(Boolean)

  if (rebateIneligibility !== ineligible) {
    onIneligibleChange?.(rebateIneligibility)
  }

  // Use state to save a boolean version of 'touched'.
  const formTouched = Object.keys(touched).length > 0
  if (formTouched !== formIsTouched) {
    setFormIsTouched(formTouched)
  }
  const otherCitySelected = Boolean(
    values.city && values.city.toLowerCase() === 'other'
  )
  const otherHowDidYouHearSelected = Boolean(
    values.howDidYouHear && values.howDidYouHear.toLowerCase() === 'other'
  )

  const emailAttachments = Boolean(values.emailAttachments === 'true')

  // If city field is updated clear out otherCity field.
  const cityChangeHandler = (evt: any) => {
    // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
    if (evt.target.value.toLowerCase() !== 'other') {
      setFieldValue('otherCity', '')
    }
  }
  // If howDidYouHear field is updated clear out otherHowDidYouHear field.
  const howDidYouHearChangeHandler = (evt: any) => {
    // Only need to clear out value if the city actually changed, ie. User doesn't select Other again.
    if (evt.target.value.toLowerCase() !== 'other') {
      setFieldValue('otherHowDidYouHear', '')
    }
  }

  const attachmentsAreUploading = receiptIsUploading || installPhotosIsUploading

  const SmartControllerWatersenseRadioField = useCallback(
    ({...props}: FieldProps<any>) => (
      <WatersenseRadioField
        caption="Is the Smart Controller a WaterSense approved product? Check here: "
        {...props}
      />
    ),
    []
  )
  return (
    <>
      {/* width: 'fit-content' // Doesn't seem to fit responsively in XS media layout. */}
      <FormBox display="flex" flexDirection="column" margin="auto" width="100%">
        <div className={classes.formGroup}>
          <Type color="textSecondary" variant="h4" gutterBottom>
            Contact Information
          </Type>
          <Spacing />
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                required
                disabled={ineligible}
                name="firstName"
                label="First Name"
                autoComplete="billing given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                required
                disabled={ineligible}
                name="lastName"
                label="Last Name"
                autoComplete="billing family-name"
              />
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12} sm={7}>
              <AccountNoField disabled={ineligible} name="accountNo" />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Field
                disabled={ineligible}
                name="propertyType"
                component={PropertyTypeSelectField}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5} justifyContent="space-between">
            <Grid item xs={12} sm={8}>
              <Field
                disabled={ineligible}
                name="address"
                component={StreetAddressField}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Field
                disabled={ineligible}
                name="city"
                onChange={cityChangeHandler}
                component={CitySelectField}
              />
            </Grid>
          </Grid>

          <WaitToGrow isIn={otherCitySelected}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Field
                  disabled={!otherCitySelected || ineligible}
                  name="otherCity"
                  component={OtherCityField}
                />
              </Grid>
            </Grid>
          </WaitToGrow>

          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Field
                name="phone"
                disabled={ineligible}
                component={PhoneNoField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="email"
                disabled={ineligible}
                component={EmailField}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Field
                name="howDidYouHear"
                disabled={ineligible}
                onChange={howDidYouHearChangeHandler}
                component={HowDidYouHearSelectField}
              />
            </Grid>
          </Grid>

          <WaitToGrow isIn={otherHowDidYouHearSelected}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Field
                  disabled={!otherHowDidYouHearSelected || ineligible}
                  name="otherHowDidYouHear"
                  component={OtherHowDidYouHearField}
                />
              </Grid>
            </Grid>
          </WaitToGrow>
        </div>

        <Divider variant="middle" />

        <div className={classes.formGroup}>
          <Type variant="h4" color="textSecondary" gutterBottom>
            Rebate Information
          </Type>
          <Spacing />

          <Grid container spacing={5}>
            <Grid item xs={6}>
              <FormTextField
                name="make"
                label="Controller Make"
                disabled={ineligible}
              />
            </Grid>
            <Grid item xs={6}>
              <FormTextField
                name="model"
                label="Controller Model/Zones"
                disabled={ineligible}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5} justifyContent="space-between">
            <Grid item xs={12} sm={8}>
              <Field
                disabled={ineligible}
                name="watersenseApproved"
                component={SmartControllerWatersenseRadioField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <WaterSenseLogo />
            </Grid>
          </Grid>

          <Grid container spacing={5} justifyContent="space-between">
            <Grid item xs={12} sm={6}>
              <Field
                disabled
                name="treatedCustomer"
                inputLabel="PCWA Treated Customer"
                inputId="treated-water-select"
                labelWidth={200}
                component={YesNoSelectField}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormTextField
                name="comments"
                multiline
                rows={3} // That's about 200 characters
                label="Optionally, you can provide us any comments"
                disabled={ineligible}
              />
            </Grid>
          </Grid>
        </div>

        <Divider variant="middle" />

        <div className={classes.formGroup}>
          <Type variant="h4" color="textSecondary" gutterBottom>
            Provide Attachments
          </Type>
          <Spacing />
          <Type variant="caption" color="textSecondary">
            Note - Only Image file formats can be uploaded (eg. .jpg, .png). PDF
            files <em>cannot</em> be uploaded here. If you are unable to attach
            the correct file type, or if any other issues with the attachments
            arise, you may select the box below and submit the files in an
            email.
          </Type>
          <Field
            name="emailAttachments"
            component={EmailAttachmentsSwitch}
            fullWidth={false}
            label={
              <span>
                Optionally, check here to email receipts and photos instead.
                Send email with attachments to <RebatesEmail /> with your name
                and account number in the subject line. Failure to do so may
                result in a delay or rejected application.
              </span>
            }
            disabled={ineligible}
          />
          <Spacing />
          <ColumnBox className={classes.dropzoneContainer}>
            <Field
              disabled={ineligible || emailAttachments}
              name="receipts"
              attachmentTitle="Receipt"
              uploadRoute="smart-controller"
              onIsUploadingChange={receiptIsUploadingHandler}
              component={AttachmentField}
            />
          </ColumnBox>

          <Spacing />
          <ColumnBox className={classes.dropzoneContainer}>
            <Field
              disabled={ineligible || emailAttachments}
              name="installPhotos"
              attachmentTitle="Smart Controller installed photo"
              uploadRoute="smart-controller"
              onIsUploadingChange={installPhotosIsUploadingHandler}
              component={AttachmentField}
            />
          </ColumnBox>
        </div>

        <Divider variant="middle" />

        <div className={classes.formGroup}>
          <Type color="textSecondary" variant="h4" gutterBottom>
            Acknowledge Terms & Conditions
          </Type>
          <Spacing />
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.ieFixFlexColumnDirection}>
              <ReviewTermsConditions
                pageCount={2}
                fileName="Smart-Controller-Terms-and-Conditions.pdf"
                termsConditionsUrl="https://imgix.cosmicjs.com/ec1fc1a0-e3fc-11eb-be9a-bfe30c7c12b9-SMART-CONTROLLER-REBATE-PROGRAM-REQUIREMENTS.pdf"
              />
              <Spacing />
              <Type variant="body1" paragraph>
                <em>
                  I have read, understand, and agree to the Placer County Water
                  Agency Smart Controller Rebate Terms and Conditions.
                  {/* </Link> */}
                </em>
              </Type>
              <Spacing />
              <Type variant="body1" paragraph>
                <em>
                  I understand that PCWA reserves the right to have an Agency
                  representative verify the installation of the product(s) at
                  the service address on the application.
                </em>
              </Type>
              <Field
                disabled={ineligible}
                name="termsAgree"
                component={AgreeTermsCheckbox}
                fullWidth={false}
              />
            </Grid>
          </Grid>
        </div>

        <Divider variant="middle" />

        <div className={classes.formGroup}>
          <Type color="textSecondary" variant="h4" gutterBottom>
            Release of Liability & Signature
          </Type>
          <Spacing />

          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} className={classes.ieFixFlexColumnDirection}>
              <Type variant="body1" paragraph color="primary">
                Placer County Water Agency (PCWA) reserves the right to deny an
                application of any participant who does not meet all
                requirements as outlined. PCWA reserves the right to change the
                terms of this program at their discretion. PCWA cannot guarantee
                that the installation of the product(s) will result in lower
                water utility costs. The number of rebates is dependent upon the
                availability of program funds. Applications will be processed
                when all required information is provided by the applicant on a
                first-come, first-served basis.
              </Type>
            </Grid>

            <Grid item xs={12} className={classes.ieFixFlexColumnDirection}>
              <Type variant="caption">
                You must sign this form by typing your name
              </Type>
              <Field
                disabled={ineligible}
                name="signature"
                component={SignatureField}
              />
            </Grid>

            <Grid item xs={12} className={classes.ieFixFlexColumnDirection}>
              <Field
                disabled={ineligible}
                name="captcha"
                component={RecaptchaField}
              />
            </Grid>
          </Grid>
        </div>

        <Spacing />
        <SubmitFormButton
          boxProps={{
            flex: '0 0 auto'
          }}
          fullWidth
          variant="outlined"
          color="primary"
          disabled={
            ineligible ||
            isSubmitting ||
            /* // !isValid || */
            (!formTouched && !dirty) ||
            attachmentsAreUploading
          }
        >
          Submit Application
        </SubmitFormButton>
      </FormBox>
    </>
  )
}

export default SmartControllerForm
