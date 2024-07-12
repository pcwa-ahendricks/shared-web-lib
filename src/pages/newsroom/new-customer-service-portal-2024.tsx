import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  alpha,
  useMediaQuery
} from '@mui/material'
import {imgixUrlLoader} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import Spacing from '@components/boxes/Spacing'
import NewUtilityBillSystemFaq from '@components/NewUtilityBillSystemFaq'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import {grey, orange, yellow} from '@mui/material/colors'
import ArrowIcon from '@mui/icons-material/ArrowRightAlt'
import CalIcon from '@mui/icons-material/EventAvailable'
import SlideInLeft, {
  SlideInLeftProps
} from '@components/boxes/animate/SlideInLeft'
import {useIntersection} from 'react-use'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import FadeOut, {FadeOutProps} from '@components/boxes/animate/FadeOut'
import useTheme from '@hooks/useTheme'

export default function NewCustomerServicePortal2024() {
  return (
    <PageLayout title="New Customer Service Portal" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            titleProps={{variant: 'h2'}}
            title="Enhanced Customer Experience with New Customer Service Portal"
            // subtitle="Newsroom"
          />
          <Grid container spacing={{xs: 3, sm: 4}}>
            <Grid xs={12} sm={5}>
              <Type paragraph>
                <StrongEmphasis>Coming Soon!</StrongEmphasis> Our initial launch
                of the new utility billing system, originally scheduled for
                August, has been rescheduled to September. We're working hard
                behind the scenes to ensure a smooth transition, and we thank
                you for your support.
              </Type>
              <Type paragraph>
                At PCWA, we're always striving to serve you better. Our new
                system will integrate various business processes into a single
                platform, enhancing your customer experience and improving our
                service efficiency.
              </Type>
              <Type paragraph>
                The new portal will make managing your account easier and more
                user-friendly than ever before.
              </Type>
            </Grid>
            <Grid xs={12} sm={7}>
              <MediaDialogOnClick
                // showPopper={false}
                // mediaUrl="https://pcwa.imgix.net/pcwa-net/customer-service/erp/New%20Customer%20Portal%20-%20Postcard%20-%20no%20logo.png"
                mediaUrl="https://pcwa.imgix.net/pcwa-net/customer-service/erp/PCWA_BillingPlatform_Graphic.jpg"
                mediaName="SMUD rice fields flooding"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 3840,
                    // height: 2742
                    height: 2560
                  }
                }}
              >
                <ImageFancier
                  // src="https://pcwa.imgix.net/pcwa-net/customer-service/erp/New%20Customer%20Portal%20-%20Postcard%20-%20short%20no%20logo%20.png"
                  src="https://pcwa.imgix.net/pcwa-net/customer-service/erp/PCWA_BillingPlatform_Graphic.jpg"
                  width={3840}
                  // height={2742}
                  height={2560}
                  // alt="SMUD rice fields flooding"
                  alt="PCWA New Billing System graphic"
                  loader={imgixUrlLoader}
                  sizes="(max-width: 600px) 100vw, 50vw"
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                />
              </MediaDialogOnClick>
            </Grid>
          </Grid>
          <Spacing />
          <Type variant="h3" color="primary">
            Enhanced Customer Portal
          </Type>
          <Box component="ul" sx={{marginTop: 1}}>
            <Type component="li">
              <strong>24/7 Access</strong>: Login from your desktop, tablet, or
              phone.
            </Type>
            <Type component="li">
              <strong>Autopay Registration</strong>: Sign up for autopay with
              ease.
            </Type>
            <Type component="li">
              <strong>Billing and Payments</strong>: Receive and pay bills, and
              view your billing and payment history.
            </Type>
            <Type component="li">
              <strong>Water Use Review</strong>: Keep track of your water usage
              effortlessly.
            </Type>
            <Type component="li">
              <strong>Service Requests</strong>: Request new service or transfer
              your service online.
            </Type>
            <Type component="li">
              <strong>Rebate Requests</strong>: Submit rebate requests directly
              through the portal.
            </Type>
            <Type component="li">
              <strong>Customer Service Contact</strong>: Reach out to our
              customer service team through the portal's self-service feature.
            </Type>
          </Box>

          <Spacing factor={2} />

          <Box>
            <Paper
              variant="elevation"
              square={false}
              sx={{backgroundColor: alpha(yellow[100], 0.3)}}
            >
              <Box sx={{padding: 2}}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    color: grey['700']
                  }}
                >
                  <CalIcon sx={{marginRight: 1}} />
                  <Type variant="h4">
                    <em>Key Dates to Remember</em>
                  </Type>
                </Box>

                <Spacing />
                <Box sx={{position: 'relative'}}>
                  <SlideInLeftIntersect
                    animateKey="cust-portal-arrow1-in"
                    transparentUntilAnimate
                  >
                    <FadeOutIntersect
                      animateKey="cust-portal-arrow1-out"
                      delay={3000}
                    >
                      <Box sx={{position: 'absolute', left: -75, top: -18}}>
                        <ArrowIcon sx={{fontSize: 60, color: orange['700']}} />
                      </Box>
                    </FadeOutIntersect>
                  </SlideInLeftIntersect>

                  <Type variant="h4">August 2024:</Type>
                </Box>
                <Box component="ul" sx={{marginTop: 1}}>
                  <Type component="li">
                    <strong>New Account Numbers:</strong> All PCWA account
                    numbers will change. Look out for your new account number in
                    the mail with instructions on how and when to use it.
                  </Type>
                </Box>

                <Spacing size="small" />
                <Box sx={{position: 'relative'}}>
                  <SlideInLeftIntersect
                    animateKey="cust-portal-arrow2-in"
                    transparentUntilAnimate
                    delay={2000}
                  >
                    <FadeOutIntersect
                      animateKey="cust-portal-arrow2-out"
                      delay={5000}
                    >
                      <Box sx={{position: 'absolute', left: -75, top: -18}}>
                        <ArrowIcon sx={{fontSize: 60, color: orange['700']}} />
                      </Box>
                    </FadeOutIntersect>
                  </SlideInLeftIntersect>
                  <Type variant="h4">September 2024:</Type>
                </Box>
                <Box component="ul" sx={{marginTop: 1}}>
                  <Type component="li">
                    <strong>New Customer Portal Launch:</strong> Our new portal
                    will go live! Keep an eye out for more details to come!
                  </Type>
                  <Type component="li">
                    <strong>Payment Options:</strong> Use your new account
                    number to make payments online, by check, or by phone.
                  </Type>
                  <Type component="li">
                    <strong>Autopay Sign-Up:</strong> Customers currently on
                    autopay will need to re-register in the new portal.
                  </Type>
                  <Type component="li">
                    <strong>Update Bank Bill Pay:</strong> Ensure your bank bill
                    pay services are updated with your new account number, if
                    applicable.
                  </Type>
                  <Type component="li">
                    <strong>New Bill Statements:</strong> Enjoy a new,
                    easier-to-read bill statement. This new bill statement will
                    also include your new account number.
                  </Type>
                </Box>
              </Box>
            </Paper>
          </Box>

          <Spacing factor={2} />

          <NewUtilityBillSystemFaq />

          <Spacing factor={2} size="large" />

          <Type variant="h4" paragraph>
            Thank you for being a valued PCWA customer. We look forward to
            serving you with our new ERP system!
          </Type>

          <Spacing factor={2} />

          <Type variant="h4" gutterBottom>
            Need Assistance?
          </Type>
          <Type variant="body1" paragraph>
            Our customer service team is here to help with any questions or
            concerns. Feel free to email us at <CustomerServicesEmail /> or call{' '}
            <MainPhone />.
          </Type>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

// Delete (or comment out) the following function to enable this page at the request of CS. In the meantime it will redirect to the homepage.
// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: '/',
//       permanent: false
//     }
//   }
// }

const SlideInLeftIntersect = ({
  children,
  animateKey,
  ...props
}: SlideInLeftProps & {animateKey: string}) => {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext

  const {[animateKey]: previouslyAnimated} = uiState.animateDone
  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
  }, [uiDispatch, animateKey])

  const ref = useRef<HTMLDivElement>(null)
  const [intersected, setIntersected] = useState(false)
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px'
  })

  useEffect(() => {
    const animate = intersection?.isIntersecting
    if (animate && !intersected) {
      setIntersected(true)
    }
  }, [intersection, intersected])

  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const shouldAnimate = intersected && !previouslyAnimated && isMdUp

  return (
    <Box ref={ref}>
      <SlideInLeft
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        {...props}
      >
        {children}
      </SlideInLeft>
    </Box>
  )
}

const FadeOutIntersect = ({
  children,
  animateKey,
  fadeOutDelay = 3000,
  ...props
}: FadeOutProps & {animateKey: string; fadeOutDelay?: number}) => {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext

  const {[animateKey]: previouslyAnimated} = uiState.animateDone
  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
  }, [uiDispatch, animateKey])

  const ref = useRef<HTMLDivElement>(null)
  const [intersected, setIntersected] = useState(false)
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px'
  })

  useEffect(() => {
    const animate = intersection?.isIntersecting
    if (animate && !intersected) {
      setIntersected(true)
    }
  }, [intersection, intersected, fadeOutDelay])

  const shouldAnimate = intersected && !previouslyAnimated

  return (
    <Box ref={ref}>
      <FadeOut
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        // not sure why this is necessary
        sx={{...(previouslyAnimated && {opacity: 0})}}
        {...props}
      >
        {children}
      </FadeOut>
    </Box>
  )
}
