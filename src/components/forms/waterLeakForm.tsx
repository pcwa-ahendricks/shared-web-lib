// cspell:ignore addtl mnfg watersense Formik's
import React, {useState, useCallback} from 'react'
import {
  Box,
  Divider,
  Grid,
  Typography as Type,
  InputAdornment,
  IconButton
} from '@mui/material'
import {useFormikContext, Field} from 'formik'
import {WaterLeakFormData} from '@lib/services/formService'
import EmailField from '@components/formFields/EmailField'
import AccountNoField from '@components/formFields/AccountNoField'
import CitySelectField from '@components/formFields/CitySelectField'
import OtherCityField from '@components/formFields/OtherCityField'
import StreetAddressField from '@components/formFields/StreetAddressField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import PropertyTypeSelectField from '@components/formFields/PropertyTypeSelectField'
import AgreeTermsCheckbox from '@components/formFields/AgreeTermsCheckbox'
import RecaptchaField from '@components/formFields/RecaptchaField'
import AttachmentField from '@components/formFields/AttachmentField'
import SignatureField from '@components/formFields/SignatureField'
import ReviewTermsConditions from '@components/ReviewTermsConditions/ReviewTermsConditions'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import FormBox from '@components/boxes/FormBox'
import FormTextField from '@components/formFields/FormTextField'
import EmailAttachmentsSwitch from '@components/formFields/EmailAttachmentsSwitch'
import RebatesEmail from '@components/links/RebatesEmail'
import SubmitFormButton from './SubmitFormButton/SubmitFormButton'
import Spacing from '@components/boxes/Spacing'
// import HowDidYouHearAutocomplete from '@components/formFields/HowDidYouHearAutoselect'
import HowDidYouHearSelectField from '@components/formFields/HowDidYouHearSelectField'
import OtherHowDidYouHearField from '@components/formFields/OtherHowDidYouHearField'
import FormDateField from '@components/formFields/FormDateField'
import CalendarIcon from '@mui/icons-material/Event'
import WaterLeakRequireCheckboxes from '@components/formFields/WaterLeakRequireCheckboxes'
import useTheme from '@hooks/useTheme'
import {ColumnBox} from '@components/MuiSleazebox'

type Props = {
  onIneligibleChange?: (eligible: boolean) => any
  ineligible?: boolean
}

const WaterLeakForm = ({ineligible = false, onIneligibleChange}: Props) => {
  const theme = useTheme()
  const style = {
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
  }
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [receiptIsUploading, setReceiptIsUploading] = useState<boolean>(false)
  const [installPhotosIsUploading, setInstallPhotosIsUploading] =
    useState<boolean>(false)

  const receiptIsUploadingHandler = useCallback((isUploading: boolean) => {
    setReceiptIsUploading(isUploading)
  }, [])

  const installPhotosIsUploadingHandler = useCallback(
    (isUploading: boolean) => {
      setInstallPhotosIsUploading(isUploading)
    },
    []
  )

  const {setFieldValue, errors, isSubmitting, dirty, touched, values} =
    useFormikContext<WaterLeakFormData>()

  if (dirty !== formIsDirty) {
    setFormIsDirty(dirty)
  }

  // Check if user is in-eligible for rebate and disable all form controls if so.
  const rebateIneligibility = [errors['eligibilityRequirements']].some(Boolean)

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

  return (
    <>
      {/* width: 'fit-content' // Doesn't seem to fit responsively in XS media layout. */}
      <FormBox display="flex" flexDirection="column" margin="auto" width="100%">
        <Box sx={{...style.formGroup}}>
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
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                required
                disabled={ineligible}
                name="lastName"
                label="Last Name"
                autoComplete="billing family-name"
                margin="normal"
              />
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12} sm={7}>
              <AccountNoField
                disabled={ineligible}
                name="accountNo"
                margin="normal"
              />
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
        </Box>

        <Divider variant="middle" />

        <Box sx={{...style.formGroup}}>
          <Type variant="h4" color="textSecondary" gutterBottom>
            Rebate Information
          </Type>
          <Spacing size="small" />
          <Type paragraph variant="body2">
            Please provide us the following information relating to your treated
            leak and leak fix. We would like to know approximately when the leak
            started, when you identified the leak, and when the leak was fixed.
            Additionally, we would like a brief description of the leak and the
            summary for the repairs that were made to fix the leak.
          </Type>
          <Spacing />
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormDateField
                name="leakBeginDate"
                label="Leak Begin Date"
                placeholder="Begin Date of Leak (approx.)"
                slotProps={{textField: {fullWidth: true, margin: 'normal'}}}
                disableFuture
                variant="outlined"
                format="M/dd/yyyy"
                // show Calendar icon
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CalendarIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormDateField
                name="leakIdentifyDate"
                label="Leak Identified Date"
                placeholder="Date Leak was Identified"
                slotProps={{
                  textField: {required: true, fullWidth: true, margin: 'normal'}
                }}
                disableFuture
                variant="outlined"
                format="M/dd/yyyy"
                // show Calendar icon
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CalendarIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormDateField
                name="leakRepairDate"
                label="Leak Repair Date"
                placeholder="Date Leak was Repaired"
                slotProps={{
                  textField: {required: true, fullWidth: true, margin: 'normal'}
                }}
                disableFuture
                variant="outlined"
                format="M/dd/yyyy"
                // show Calendar icon
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CalendarIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormTextField
                name="describe"
                multiline
                minRows={3} // That's about 200 characters
                label="Describe Leak and Repair"
                disabled={ineligible}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider variant="middle" />

        <Box sx={{...style.formGroup}}>
          <Type variant="h4" color="textSecondary" gutterBottom>
            Rebate Eligibility Requirements
          </Type>
          <Spacing />
          <Grid container spacing={5} justifyContent="space-between">
            <Grid item xs={12}>
              <Field
                name="eligibilityRequirements"
                component={WaterLeakRequireCheckboxes}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider variant="middle" />

        <Box sx={{...style.formGroup}}>
          <Type variant="h4" color="textSecondary" gutterBottom>
            Provide Attachments
          </Type>
          <Spacing />
          <Type variant="caption" color="textSecondary">
            Note - Image file formats are preferred <em>(eg. JPG, PNG)</em> for
            uploads. PDF files and Word Documents can be uploaded too but they{' '}
            <em>must be less than</em> 4 MB in size. If you are unable to attach
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
          <ColumnBox sx={{...style.dropzoneContainer}}>
            <Field
              disabled={ineligible || emailAttachments}
              name="receipts"
              attachmentTitle="Receipt(s)"
              uploadRoute="water-leak"
              onIsUploadingChange={receiptIsUploadingHandler}
              component={AttachmentField}
            />
          </ColumnBox>

          <Spacing />
          <ColumnBox sx={{...style.dropzoneContainer}}>
            <Field
              disabled={ineligible || emailAttachments}
              name="leakPhotos"
              attachmentTitle="Water Leak Photo(s)"
              uploadRoute="water-leak"
              onIsUploadingChange={installPhotosIsUploadingHandler}
              component={AttachmentField}
            />
          </ColumnBox>

          <Spacing />
          <ColumnBox sx={{...style.dropzoneContainer}}>
            <Field
              disabled={ineligible || emailAttachments}
              name="repairPhotos"
              attachmentTitle="Repaired Leak Photo(s)"
              uploadRoute="water-leak"
              onIsUploadingChange={installPhotosIsUploadingHandler}
              component={AttachmentField}
            />
          </ColumnBox>
        </Box>

        <Divider variant="middle" />

        <Box sx={{...style.formGroup}}>
          <Type color="textSecondary" variant="h4" gutterBottom>
            Acknowledge Terms & Conditions
          </Type>
          <Spacing />
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} sx={{...style.ieFixFlexColumnDirection}}>
              <ReviewTermsConditions
                pageCount={2}
                fileName="Water-Leak-Terms-and-Conditions.pdf"
                termsConditionsUrl="https://imgix.cosmicjs.com/fd0aca40-c4de-11ed-b620-593a056e791b-Water-Leak-Rebate-Program-Requirements.pdf"
              />
              <Spacing />
              <Type variant="body1" paragraph>
                <em>
                  I have read, understand, and agree to the Placer County Water
                  Agency Treated Water Leak Rebate Terms and Conditions.
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
        </Box>

        <Divider variant="middle" />

        <Box sx={{...style.formGroup}}>
          <Type color="textSecondary" variant="h4" gutterBottom>
            Release of Liability & Signature
          </Type>
          <Spacing />

          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} sx={{...style.ieFixFlexColumnDirection}}>
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

            <Grid item xs={12} sx={{...style.ieFixFlexColumnDirection}}>
              <Type variant="caption">
                You must sign this form by typing your name
              </Type>
              <Field
                disabled={ineligible}
                name="signature"
                component={SignatureField}
              />
            </Grid>

            <Grid item xs={12} sx={{...style.ieFixFlexColumnDirection}}>
              <Field
                disabled={ineligible}
                name="captcha"
                component={RecaptchaField}
              />
            </Grid>
          </Grid>
        </Box>

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

export default WaterLeakForm
