// cspell:ignore
import React, {useState, useCallback, useMemo} from 'react'
import {
  Button,
  CircularProgress,
  Divider,
  Theme,
  Typography as Type,
  Box
} from '@material-ui/core'
import {makeStyles, createStyles, useTheme} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Field} from 'formik'
import {string, object} from 'yup'
import {
  postForm,
  ContactUsRebateFormData as RebateFormData,
  ContactUsRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import NameField from '@components/formFields/NameField'
import ContactUsMessageField from '@components/formFields/ContactUsMessageField'
import ContactUsSubjectField from '@components/formFields/ContactUsSubjectField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import ReasonForContactSelectField from '@components/formFields/ReasonForContactSelectField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import ContactUsSubmitDialog from '@components/ContactUsSubmitDialog/ContactUsSubmitDialog'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import ContactUsErrorDialog from '@components/ContactUsErrorDialog/ContactUsErrorDialog'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import FlexBox, {
  ColumnBox,
  RespRowBox,
  ChildBox,
  RowBox
} from '@components/boxes/FlexBox'
import FormikValidate from '@components/FormikValidate/FormikValidate'
import MainPhone from '@components/links/MainPhone'
import EightHundredPhone from '@components/links/EightHundredPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import PageTitle from '@components/PageTitle/PageTitle'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'

const isDev = process.env.NODE_ENV === 'development'
const SERVICE_URI_PATH = 'contact-us'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    reason: string()
      .required()
      .label('Reason for contacting PCWA'),
    message: string()
      .required()
      .label('Message'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    name: string().label('Name'),
    email: string()
      .email()
      .label('Email'),
    phone: string()
      .min(10)
      .label('Phone Number'),
    subject: string()
      .required()
      .label('Subject')
  })

const initialFormValues: RebateFormData = {
  reason: '',
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  captcha: ''
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      // width: 'fit-content' // Doesn't seem to fit responsively in XS media layout.
      width: '100%'
    },
    buttonProgress: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    },
    formGroupTitle: {
      marginBottom: theme.spacing(3)
    },
    reserveRight: {
      marginTop: theme.spacing(3)
    }
  })
)

const ContactUs = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<RebateFormData>(
    initialFormValues
  )
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)

  const [formSubmitDialogOpen, setFormSubmitDialogOpen] = useState<boolean>(
    false
  )
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] = useState<
    boolean
  >(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [shouldConfirmRouteChange, setShouldConfirmRouteChange] = useState<
    boolean
  >(false)

  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  const mainEl = useMemo(
    () => (
      <>
        <MainBox>
          <NarrowContainer>
            <PageTitle title="Contact Us" />
            <RespRowBox flexSpacing={4}>
              <ChildBox flex="65%">
                <Type paragraph>
                  The PCWA Business Center is open Monday – Friday from 8:00
                  a.m. to 5:00 p.m. except major holidays. Customer Services is
                  available by phone at <MainPhone /> or <EightHundredPhone />{' '}
                  weekdays from 8:00 a.m. to 5:00 p.m. except major holidays or
                  by email at <CustomerServicesEmail /> (please allow two
                  business days for a response to your email inquiry).
                </Type>
                <Type paragraph>
                  If you have an after-hours emergency, please call{' '}
                  <MainPhone /> and our answering service will relay your call
                  to standby personnel who can assist you.
                </Type>
                <Type paragraph>
                  If you are wanting to report water waste, please do so at{' '}
                  <MuiNextLink href="/report-water-waste">
                    Report Water Waste
                  </MuiNextLink>
                  .
                </Type>
              </ChildBox>
              <ChildBox flex="35%" display="flex">
                <Box
                  mx="auto"
                  width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
                >
                  <LazyImgix
                    src="https://cosmicjs.imgix.net/a5afe2e0-6b51-11e7-b267-0b654f5c65d5-contact-customer-service.jpg"
                    htmlAttributes={{
                      alt: 'Customer Service Representative at Workstation'
                    }}
                  />
                </Box>
              </ChildBox>
            </RespRowBox>
            <Spacing />
            <Box
              bgcolor={theme.palette.grey['200']}
              border={1}
              borderColor={theme.palette.grey['300']}
            >
              <RowBox justifyContent="space-around">
                <ChildBox p={3}>
                  <Type>
                    <em>Located At</em>
                  </Type>
                  <MuiNextLink href="/about-pcwa/directions">
                    Placer County Water Agency
                    <br />
                    144 Ferguson Road
                    <br />
                    Auburn, CA 95603
                  </MuiNextLink>
                </ChildBox>
                <ChildBox>
                  <FlexBox
                    position="relative"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Box
                      position="absolute"
                      bgcolor={theme.palette.grey['200']}
                      p={0.25}
                    >
                      <Type variant="h6">or</Type>
                    </Box>
                    <Divider orientation="vertical" />
                  </FlexBox>
                </ChildBox>
                <ChildBox p={3}>
                  <Type>
                    <em>Mailing Address</em>
                    <br />
                    P.O. Box 6570
                    <br />
                    Auburn, CA 95604-6570
                    <br />
                  </Type>
                </ChildBox>
              </RowBox>
            </Box>

            <Spacing size="large" factor={2} />
            {/* <Type variant="h3" color="primary" gutterBottom>
                React out to us via email
              </Type> */}
            <Formik
              initialValues={initialFormValues}
              validationSchema={formSchema}
              onSubmit={async (values: RebateFormData, actions) => {
                try {
                  // console.log(values, actions)
                  const body: RequestBody = {
                    formData: {...values}
                  }
                  await postForm(SERVICE_URI_PATH, body)
                  actions.setSubmitting(false)
                  // Reset Form
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
              {(formik) => {
                const {values, touched = {}, dirty, isSubmitting} = formik

                if (dirty !== formIsDirty) {
                  setFormIsDirty(dirty)
                  setShouldConfirmRouteChange(Boolean(dirty))
                }
                if (values !== formValues) {
                  setFormValues(values)
                }
                // Use state to save a boolean version of 'touched'.
                const formTouched = Object.keys(touched).length > 0
                if (formTouched !== formIsTouched) {
                  setFormIsTouched(formTouched)
                }

                return (
                  <FormikValidate>
                    <FormBox className={classes.form}>
                      {/* <Type variant="h3" color="primary" gutterBottom>
                        Weather Based Irrigation Controller Rebate Form
                      </Type> */}
                      <Type
                        color="textSecondary"
                        variant="h3"
                        gutterBottom
                        className={classes.formGroupTitle}
                      >
                        Contact Us by Email
                      </Type>
                      <Type paragraph>
                        Reach out to us via email today by filling out the
                        following form online.
                      </Type>
                      <Spacing />
                      {/* flex prop is an IE11 fix. */}
                      <ColumnBox flexSpacing={5} flex="0 0 auto">
                        <ChildBox>
                          <Field
                            name="reason"
                            component={ReasonForContactSelectField}
                            required={true}
                          />
                        </ChildBox>

                        <ChildBox>
                          <Field
                            name="name"
                            component={NameField}
                            required={false}
                          />
                        </ChildBox>
                        {/* <Grid container>
                        </Grid>

                        <Grid container>
                        </Grid> */}

                        <ChildBox>
                          <RespRowBox flexSpacing={5}>
                            <ChildBox flex="60%">
                              <Field
                                name="email"
                                component={EmailField}
                                required={false}
                                margin="none"
                              />
                            </ChildBox>
                            <ChildBox flex="40%">
                              <Field
                                name="phone"
                                component={PhoneNoField}
                                required={false}
                                margin="none"
                              />
                            </ChildBox>
                          </RespRowBox>
                        </ChildBox>

                        <ChildBox>
                          <Field
                            name="subject"
                            component={ContactUsSubjectField}
                          />
                        </ChildBox>

                        <ChildBox>
                          <Field
                            name="message"
                            component={ContactUsMessageField}
                          />
                        </ChildBox>

                        <ChildBox>
                          <Field name="captcha" component={RecaptchaField} />
                        </ChildBox>
                      </ColumnBox>

                      <Spacing />
                      {/* For debugging form reset */}
                      {/* <Button
                      variant="outlined"
                      type="submit"
                      onClick={handleReset}
                    >
                      Reset Form
                    </Button> */}

                      {/* For debugging dialog */}
                      {/* <Button
                        variant="outlined"
                        type="submit"
                        onClick={() => {
                          setProvidedEmail(values.email)
                          setFormSubmitDialogOpen(true)
                        }}
                      >
                        Show Dialog
                      </Button> */}

                      {/* flex prop is an IE11 fix. */}
                      <Box flex="0 0 auto" position="relative">
                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            // || !isValid
                            (!formTouched && !dirty)
                          }
                        >
                          Submit
                        </Button>
                        {isSubmitting && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </Box>
                    </FormBox>
                  </FormikValidate>
                )
              }}
            </Formik>
            {/* {receipts.map((attach, idx) => (
            <div key={idx}>{attach}</div>
          ))} */}
          </NarrowContainer>
        </MainBox>
      </>
    ),
    [classes, formIsDirty, formValues, formIsTouched, theme]
  )

  // GO-LIVE - Won't need this ternary or logo after GO LIVE date.
  const contactUsEl = useMemo(
    () =>
      !isDev ? (
        <>
          <Head>
            <title>Contact Us Form</title>
            <meta name="description" content="PCWA Contact Form" />
          </Head>
          <ColumnBox
            justifyContent="center"
            alignItems="flex-start"
            mt={2}
            ml={2}
            mr={2}
          >
            <PcwaLogo
              height="70%"
              style={{
                maxHeight: 48,
                maxWidth: 200
              }}
              missionStatementFill="rgba(0,0,0,0)"
            />
          </ColumnBox>
          <WaterSurfaceImg />
          {mainEl}
        </>
      ) : (
        <PageLayout title="Contact Us" waterSurface>
          {mainEl}
        </PageLayout>
      ),
    [mainEl]
  )

  return (
    <ConfirmPageLeaveLayout
      onDialogCancel={() => setShouldConfirmRouteChange(true)}
      onDialogLeave={() => setShouldConfirmRouteChange(false)}
      shouldConfirmRouteChange={shouldConfirmRouteChange}
    >
      {contactUsEl}
      <ContactUsSubmitDialog
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
      />
      <ContactUsErrorDialog
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </ConfirmPageLeaveLayout>
  )
}

export default ContactUs
