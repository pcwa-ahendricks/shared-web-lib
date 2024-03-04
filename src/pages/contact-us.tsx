// cspell:ignore cc'd
import React, {useState, useCallback, useMemo} from 'react'
import {
  Divider,
  Typography as Type,
  Box,
  useMediaQuery,
  Unstable_Grid2 as Grid
} from '@mui/material'
import {Formik, Field} from 'formik'
import {string, object} from 'yup'
import {
  postForm,
  ContactUsFormData as FormData,
  ContactUsRequestBody as RequestBody
} from '@lib/services/formService'
import PageLayout from '@components/PageLayout/PageLayout'
import EmailField from '@components/formFields/EmailField'
import NameField from '@components/formFields/NameField'
import ContactUsMessageField from '@components/formFields/ContactUsMessageField'
import MultilineTextField from '@components/formFields/MultilineTextField'
import PhoneNoField from '@components/formFields/PhoneNoField'
import ReasonForContactSelectField from '@components/formFields/ReasonForContactSelectField'
import RecaptchaField from '@components/formFields/RecaptchaField'
import ContactUsSubmitDialog from '@components/ContactUsSubmitDialog/ContactUsSubmitDialog'
import ContactUsErrorDialog from '@components/ContactUsErrorDialog/ContactUsErrorDialog'
import MainBox from '@components/boxes/MainBox'
import FormBox from '@components/boxes/FormBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import FormValidate from '@components/forms/FormValidate/FormValidate'
import MainPhone from '@components/links/MainPhone'
import EightHundredPhone from '@components/links/EightHundredPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import SubmitFormButton from '@components/forms/SubmitFormButton/SubmitFormButton'
import ProtectRouteChange from '@components/forms/ProtectRouteChange/ProtectRouteChange'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import {Alert} from '@mui/material'
import FormTextField from '@components/formFields/FormTextField'
import EditLocIcon from '@mui/icons-material/Spellcheck'
import ContactUsGeolocator from '@components/ContactUsGeolocator/ContactUsGeolocator'
import HoursOfOperation from '@components/HoursOfOperation/HoursOfOperation'
import useTheme from '@hooks/useTheme'
import Link from '@components/Link'

const SERVICE_URI_PATH = 'contact-us'

const formSchema = object()
  .camelCase()
  .strict(true)
  .shape({
    reason: string().required().label('Reason for contacting PCWA'),
    message: string().required().label('Message'),
    captcha: string()
      .required('Checking this box is required for security purposes')
      .label('This checkbox'),
    name: string().label('Name'),
    email: string().email().label('Email'),
    phone: string().min(10).label('Phone Number'),
    serviceAddress: string().label('Service Street Address'),
    serviceCity: string().label('City'),
    subject: string().required().label('Subject')
  })

const initialFormValues: FormData = {
  reason: '',
  name: '',
  email: '',
  phone: '',
  serviceAddress: '',
  serviceCity: '',
  subject: '',
  message: '',
  captcha: ''
}

const ContactUsPage = () => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const [formSubmitDialogOpen, setFormSubmitDialogOpen] =
    useState<boolean>(false)
  const [formSubmitDialogErrorOpen, setFormSubmitDialogErrorOpen] =
    useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const dialogCloseHandler = useCallback(() => {
    setFormSubmitDialogOpen(false)
  }, [])

  const errorDialogCloseHandler = useCallback(() => {
    setFormSubmitDialogErrorOpen(false)
  }, [])

  const [showAddressConfirmAlert, setShowAddressConfirmAlert] = useState(false)
  const useMyLocationSuccessHandler = useCallback(
    () => setShowAddressConfirmAlert(true),
    []
  )

  const mainEl = useMemo(
    () => (
      <MainBox>
        <NarrowContainer>
          <PageTitle id="contact-us" title="Contact Us" />
          <Grid container xs={12} columnSpacing={5}>
            <Grid sm={7}>
              <Type paragraph>
                The PCWA Business Center Lobby is open Monday through Thursday:
                8am-5pm, and closed Friday. Customer Service Representatives are
                available by phone at <MainPhone /> or <EightHundredPhone />{' '}
                Monday through Friday: 8am-5pm. Customer Services can also be
                reached by email at <CustomerServicesEmail /> (please allow two
                business days for a response to your email inquiry). PCWA is
                closed on all major holidays.
              </Type>
              <Type paragraph>
                If you have an after-hours emergency, please call <MainPhone />{' '}
                and our answering service will relay your call to standby
                personnel who can assist you. If you are wanting to report water
                waste incident, please visit{' '}
                <Link href="/report-water-waste">Report Water Waste</Link>.
              </Type>
            </Grid>
            <Grid sm={5} display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  loader={imgixLoader}
                  src="a5afe2e0-6b51-11e7-b267-0b654f5c65d5-contact-customer-service.jpg"
                  alt="Customer Service Representative at Workstation"
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 35vw"
                  width={700}
                  height={790}
                />
              </Box>
            </Grid>
          </Grid>
          <Spacing size="x-small" />
          <HoursOfOperation />
          <Spacing factor={2} />
          <Box
            bgcolor={theme.palette.grey['100']}
            border={1}
            borderColor={theme.palette.grey['300']}
            p={3}
          >
            <Grid container justifyContent="space-around">
              <Grid xs display="flex" justifyContent="center">
                <Box>
                  <Type>
                    <em>Business Center Located At</em>
                  </Type>
                  <Link href="/about-pcwa/directions">
                    Placer County Water Agency
                    <br />
                    144 Ferguson Road
                    <br />
                    Auburn, CA 95603
                  </Link>
                </Box>
              </Grid>
              {/* <ChildBox>
                <Box display="flex"
                  position="relative"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                > */}
              {/* <Box
                    position="absolute"
                    bgcolor={theme.palette.grey['100']}
                    p={0.25}
                  >
                    <Type variant="h6" />
                  </Box> */}
              {/* <Divider orientation="vertical" /> */}
              {/* </FlexBox>
              </ChildBox> */}
              <Grid xs display="flex" justifyContent="center">
                <Type>
                  <em>Mailing Address</em>
                  <br />
                  P.O. Box 6570
                  <br />
                  Auburn, CA 95604-6570
                  <br />
                </Type>
              </Grid>
            </Grid>
          </Box>

          <Spacing size="large" factor={2} />
          {/* <Type variant="h3" color="primary" gutterBottom>
                React out to us via email
              </Type> */}
          <Formik
            initialValues={initialFormValues}
            validationSchema={formSchema}
            onSubmit={async (values: FormData, actions) => {
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
            <ProtectRouteChange>
              <FormValidate>
                {/* width: 'fit-content' // Doesn't seem to fit responsively in XS media layout. */}
                <FormBox
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  m="auto"
                >
                  {/* <Type variant="h3" color="primary" gutterBottom>
                        Weather Based Irrigation Controller Rebate Form
                      </Type> */}
                  <Type color="textSecondary" variant="h3" gutterBottom>
                    Contact Us by Email
                  </Type>
                  <Type paragraph>
                    Reach out to us via email today by filling out the following
                    form online. Fields marked with an asterisk are required, in
                    addition to the Google Captcha checkbox. If you would like
                    to be CC'd on this email and/or contacted by PCWA please
                    include your email address in the provided field.
                  </Type>
                  <Spacing size="x-small" />
                  {/* flex prop is an IE11 fix. */}
                  <Field
                    name="reason"
                    component={ReasonForContactSelectField}
                    required={true}
                  />

                  <Field
                    name="name"
                    label="Name"
                    component={NameField}
                    required={false}
                  />

                  <Grid container columnSpacing={4}>
                    <Grid xs={12} sm={7}>
                      <Field
                        name="email"
                        component={EmailField}
                        required={false}
                      />
                    </Grid>
                    <Grid xs={12} sm={5}>
                      <Field
                        name="phone"
                        component={PhoneNoField}
                        required={false}
                      />
                    </Grid>
                  </Grid>

                  {/* SM mobile & non-mobile address inputs */}
                  {!isXs ? (
                    <>
                      {showAddressConfirmAlert ? (
                        <Alert
                          sx={{my: 1}}
                          severity="info"
                          icon={<EditLocIcon />}
                        >
                          Please verify that the service address below is
                          correct before submitting
                        </Alert>
                      ) : null}
                      <Grid container columnSpacing={4}>
                        <Grid sm={7}>
                          <FormTextField
                            name="serviceAddress"
                            label="Service Street Address"
                            // placeholder="Street address for service"
                            required={false}
                          />
                        </Grid>
                        <Grid sm>
                          <FormTextField
                            name="serviceCity"
                            label="City"
                            // placeholder="City"
                            required={false}
                          />
                        </Grid>
                        {/* just show on sm devices (tablets) (not md and up)  */}
                        {isSm ? (
                          <Grid
                            sm="auto"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <ContactUsGeolocator
                              onSuccess={useMyLocationSuccessHandler}
                              addressFieldName="serviceAddress"
                              cityFieldName="serviceCity"
                            />
                          </Grid>
                        ) : null}
                      </Grid>
                    </>
                  ) : null}
                  {/* XS mobile address inputs   */}
                  {isXs ? (
                    <>
                      {showAddressConfirmAlert ? (
                        <Alert
                          sx={{my: 1}}
                          severity="info"
                          icon={<EditLocIcon />}
                        >
                          Please verify that the service address below is
                          correct before submitting
                        </Alert>
                      ) : null}
                      <Grid container columnSpacing={3}>
                        <Grid
                          xs
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <FormTextField
                            name="serviceAddress"
                            label="Service Street Address"
                            // placeholder="Street address for service"
                            required={false}
                          />
                        </Grid>
                        <Grid
                          xs="auto"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <ContactUsGeolocator
                            onSuccess={useMyLocationSuccessHandler}
                            addressFieldName="serviceAddress"
                            cityFieldName="serviceCity"
                          />
                        </Grid>
                      </Grid>
                      {/* see comment/todo above regard flexSpacing */}
                      <FormTextField
                        name="serviceCity"
                        label="City"
                        // placeholder="City"
                        required={false}
                      />
                    </>
                  ) : null}

                  <Field
                    name="subject"
                    component={MultilineTextField}
                    label="Subject"
                  />

                  <Field name="message" component={ContactUsMessageField} />

                  <Field name="captcha" component={RecaptchaField} />
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
                  <SubmitFormButton
                    boxProps={{
                      flex: '0 0 auto'
                    }}
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    Submit
                  </SubmitFormButton>
                </FormBox>
              </FormValidate>
            </ProtectRouteChange>
          </Formik>
          {/* {receipts.map((attach, idx) => (
            <div key={idx}>{attach}</div>
          ))} */}

          <Spacing size="large" factor={2}>
            <Divider />
          </Spacing>

          <Box
            bgcolor={theme.palette.grey['100']}
            border={1}
            borderColor={theme.palette.grey['300']}
          >
            <Box p={3}>
              <Type variant="h4" gutterBottom color="textSecondary">
                Trouble Contacting Us By Phone?
              </Type>
              <Type variant="body1" paragraph color="textSecondary">
                In the event you are unable to get through our main phone number
                feel free to email us at <CustomerServicesEmail />.
              </Type>
              <Spacing size="large" />
              <Type variant="h4" gutterBottom color="textSecondary">
                Connecting With Us On Social Media?
              </Type>
              <Type variant="body1" paragraph color="textSecondary">
                Please read our Social Media Comment Policy{' '}
                <OpenInNewLink
                  href="https://docs.pcwa.net/social-media-comment-policy"
                  showIconAlways
                  pdf
                >
                  here
                </OpenInNewLink>
                .
              </Type>
            </Box>
          </Box>
        </NarrowContainer>
      </MainBox>
    ),
    [theme, showAddressConfirmAlert, useMyLocationSuccessHandler, isXs, isSm]
  )

  return (
    <>
      <PageLayout title="Contact Us" waterSurface>
        {mainEl}
      </PageLayout>
      <ContactUsSubmitDialog
        open={formSubmitDialogOpen}
        onClose={dialogCloseHandler}
      />
      <ContactUsErrorDialog
        open={formSubmitDialogErrorOpen}
        onClose={errorDialogCloseHandler}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default ContactUsPage
