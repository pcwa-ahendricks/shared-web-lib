import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Unstable_Grid2 as Grid,
  Paper,
  Typography as Type
} from '@mui/material'
import Link from '@components/Link'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'
import {breakpoints} from '@lib/theme-config'
import {grey} from '@mui/material/colors'
import Spacing from '@components/boxes/Spacing'
import HikingIcon from '@mui/icons-material/Hiking'
import ChecklistIcon from '@mui/icons-material/Checklist'
import AlertIcon from '@mui/icons-material/ReportGmailerrorred'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import FadeIn, {FadeInProps} from '@components/boxes/animate/FadeIn'
import {useIntersection} from 'react-use'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import FadeInToTop, {
  FadeInToTopProps
} from '@components/boxes/animate/FadeInToTop'

export default function RecreationPage() {
  return (
    <PageLayout title="Recreation" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Recreation" subtitle="Stewardship" />

          <Grid
            container
            columnSpacing={8}
            rowSpacing={4}
            justifyContent="center"
          >
            <Grid sm={7}>
              <Type paragraph>
                Looking for a gorgeous place to whitewater raft, fish, camp,
                boat, or participate in other water-related recreation
                activities? Look no more! The Middle Fork American River is
                perfect for recreational water experiences.
              </Type>
              <Type paragraph>
                Explore the stunning landscapes and thrilling adventures that
                await you at MiddleForkFun.com. Managed by the Placer County
                Water Agency, our website is your ultimate guide to enjoying the
                Middle Fork American River.
              </Type>
              <Type paragraph>
                Placer and El Dorado counties are home to beautiful mountains,
                rivers, and reservoirs that are ideal for outdoor activities in
                or near the Middle Fork. The Placer County Water Agency operates
                the Middle Fork American River recreation facilities as part of
                its 40-year license from the Federal Energy Regulatory
                Commission to operate the Middle Fork American River Project
                (MFP). Whether you're looking to raft down exhilarating rapids,
                fish in serene reservoirs, hike through picturesque trails, or
                camp under the stars, we've got all the information you need to
                plan your perfect outdoor experience.
              </Type>
            </Grid>
            <Grid sm={5}>
              <RecreationCard />
            </Grid>
          </Grid>
          <Spacing />
          <Grid container spacing={{xs: 2, sm: 6}}>
            <Grid xs={12} sm={5} sx={{display: 'flex'}}>
              <FadeInIntersect
                animateKey="recreation-1"
                sx={{display: 'flex', height: '100%'}}
              >
                <Paper
                  sx={{bgcolor: 'common.white', height: '100%'}}
                  square={false}
                >
                  <Box sx={{py: 2, px: 3}}>
                    <Box display="flex" alignItems="center">
                      <HikingIcon color="secondary" />
                      <Type variant="subtitle1" marginLeft={1} color="primary">
                        Activities & Recreation
                      </Type>
                    </Box>
                    <Spacing size="small" />

                    <Box component="ul" sx={{marginTop: 1}}>
                      <Type component="li" variant="body2" gutterBottom>
                        Enjoy thrilling whitewater rafting with flow schedules
                        and access points for all experience levels.
                      </Type>
                      <Type component="li" variant="body2" gutterBottom>
                        Fish for trout in pristine reservoirs like French
                        Meadows and Hell Hole, stocked annually by the
                        Department of Fish and Wildlife.
                      </Type>
                      <Type component="li" variant="body2" gutterBottom>
                        Explore scenic trails for hiking, mountain biking, and
                        horseback riding, suitable for all ages and skill
                        levels.
                      </Type>
                      <Type component="li" variant="body2" gutterBottom>
                        Find perfect spots for tent, RV, and group camping
                        across beautiful campgrounds managed in partnership with
                        state and federal agencies.
                      </Type>
                      <Type component="li" variant="body2" gutterBottom>
                        Experience exhilarating off-road adventures with trails
                        and staging areas in the Tahoe National Forest.
                      </Type>
                    </Box>
                  </Box>
                </Paper>
              </FadeInIntersect>
            </Grid>
            <Grid xs={12} sm={7}>
              <FadeInIntersect animateKey="recreation-2">
                <Paper sx={{bgcolor: 'common.white'}} square={false}>
                  <Box sx={{py: 2, px: 3}}>
                    <Box display="flex" alignItems="center">
                      <ChecklistIcon color="secondary" />
                      <Type variant="subtitle1" marginLeft={1} color="primary">
                        Plan Your Trip
                      </Type>
                    </Box>
                    <Spacing size="small" />
                    <Type paragraph variant="body2">
                      Plan your trip with detailed maps of campgrounds, boat
                      ramps, picnic areas, and more to guide your adventure.
                      Stay informed with crucial safety guidelines for water
                      activities, camping, driving, and wildfire precautions.
                      Learn where to obtain fire permits and find potable water
                      sources to ensure a smooth trip.
                    </Type>
                  </Box>
                </Paper>
              </FadeInIntersect>

              <Box sx={{my: 2}} />

              <FadeInIntersect animateKey="recreation-3">
                <Paper sx={{bgcolor: 'common.white'}} square={false}>
                  <Box sx={{py: 2, px: 3}}>
                    <Box display="flex" alignItems="center">
                      <EnergySavingsLeafIcon color="secondary" />
                      <Type variant="subtitle1" marginLeft={1} color="primary">
                        Environmental Stewardship
                      </Type>
                    </Box>
                    <Spacing size="small" />
                    <Type paragraph variant="body2">
                      Learn how to prevent the spread of invasive species to
                      protect the natural ecosystem. Access real-time data on
                      stream flows and reservoir levels to plan your water
                      activities safely.
                    </Type>
                  </Box>
                </Paper>
              </FadeInIntersect>

              <Box sx={{my: 2}} />

              <FadeInIntersect animateKey="recreation-4">
                <Paper sx={{bgcolor: 'common.white'}} square={false}>
                  <Box sx={{py: 2, px: 3}}>
                    <Box display="flex" alignItems="center">
                      <AlertIcon color="secondary" />
                      <Type variant="subtitle1" marginLeft={1} color="primary">
                        Stay Updated
                      </Type>
                    </Box>
                    <Spacing size="small" />
                    <Type paragraph variant="body2">
                      Sign up for alerts to stay informed about maintenance
                      activities, reservoir spills, and other important updates.
                      Check out annual events like the Western States Trail and
                      Tevis Cup for unique experiences in the Middle Fork area.
                    </Type>
                  </Box>
                </Paper>
              </FadeInIntersect>
            </Grid>
          </Grid>
          <Spacing factor={2} />
          <FadeInToTopIntersect animateKey="recreation-5">
            <Type paragraph>
              PCWA developed{' '}
              <Link
                href="https://www.middleforkfun.com"
                target="_blank"
                rel="noopener"
              >
                MiddleForkFun.com
              </Link>{' '}
              to provide a centralized hub for all Middle Fork American River
              recreation information. We collaborate closely with state and
              federal governments to manage these facilities effectively. Visit{' '}
              <Link
                href="https://www.middleforkfun.com"
                target="_blank"
                rel="noopener"
              >
                MiddleForkFun.com
              </Link>{' '}
              for detailed information and resources to help you plan an
              unforgettable adventure in the Middle Fork American River area.
              Enjoy the natural beauty, <strong>be safe</strong>, and have fun!
            </Type>
          </FadeInToTopIntersect>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

function RecreationCard() {
  const cardImg = useCallback(
    () => (
      <Image
        loader={imgixUrlLoader}
        src="https://imgix.cosmicjs.com/4e14bd30-9760-11ed-93ee-cb9a2cd68754-Screenshot-2023-01-18-at-10.45.09-AM.png"
        alt="Middle Fork Fun Website thumbnail"
        width={2398}
        height={1744}
        // xs: 75, sm up: 5/12 = .416
        sizes={`(max-width: ${breakpoints.sm}px) 75vw, 42vw"`}
        style={{
          // 2398px/1744px = 1.375
          aspectRatio: '1.375',
          objectFit: 'cover',
          width: '100%',
          height: 'auto'
        }}
      />
    ),
    []
  )

  const [showLinkIcon, setShowLinkIcon] = useState(false)
  return (
    <Card
      onMouseEnter={() => setShowLinkIcon(true)}
      onMouseLeave={() => setShowLinkIcon(false)}
      sx={(theme) => ({
        ...(theme.breakpoints.only('xs') && {maxWidth: '75vw'})
      })}
    >
      <CardActionArea
        href="https://www.middleforkfun.com"
        target="_blank"
        rel="noopener"
      >
        <CardMedia component={cardImg} />
        <CardContent>
          <Type
            gutterBottom
            variant="h5"
            component="div"
            color="primary"
            sx={{display: 'flex', alignItems: 'center'}}
          >
            <Fade in={showLinkIcon}>
              <OpenInBrowserIcon
                sx={{
                  color: grey[600],
                  marginRight: 1
                }}
              />
            </Fade>{' '}
            MiddleForkFun.com
          </Type>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const FadeInIntersect = ({
  children,
  animateKey,
  ...props
}: FadeInProps & {animateKey: string}) => {
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

  const shouldAnimate = intersected && !previouslyAnimated

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <FadeIn
        transparentUntilAnimate={!previouslyAnimated}
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        {...props}
      >
        {children}
      </FadeIn>
    </Box>
  )
}

export const FadeInToTopIntersect = ({
  children,
  animateKey,
  ...props
}: FadeInToTopProps & {animateKey: string}) => {
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

  const shouldAnimate = intersected && !previouslyAnimated
  // syncronizing duration makes assigning onAnimationEnd prop easier
  // const duration = 700
  return (
    <Box ref={ref}>
      <FadeInToTop
        transparentUntilAnimate={!previouslyAnimated}
        animate={shouldAnimate}
        // duration={duration}
        speed="fast"
        // just call this once
        onAnimationEnd={animateDoneHandler}
        {...props}
      >
        {/* <TextFocusInOpaque
			animate={shouldAnimate}
			duration={duration}
			{...props}
		  > */}
        {children}
        {/* </TextFocusInOpaque> */}
      </FadeInToTop>
    </Box>
  )
}
