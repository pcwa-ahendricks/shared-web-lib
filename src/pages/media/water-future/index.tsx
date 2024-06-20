import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Box,
  List,
  ListItemText,
  ListItemButton,
  Unstable_Grid2 as Grid,
  Divider
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import BlockQuote from '@components/water-future/block-quote'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {useIntersection} from 'react-use'
import FadeInToTop, {
  FadeInToTopProps
} from '@components/boxes/animate/FadeInToTop'
import useLinkComponent from '@hooks/useLinkComponent'
import Image from 'next/image'
import {GetStaticProps} from 'next'
import {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import usePlaceholders from '@components/imageBlur/usePlaceholders'

const imgixImages = [
  'https://pcwa.imgix.net/pcwa-net/media/water-future/PCWA_WebBG2.jpg'
]

type Props = {
  placeholders: Placeholders
}

export default function WaterFuturePage({placeholders}: Props) {
  usePlaceholders(placeholders)
  const LinkComponent = useLinkComponent()

  return (
    <PageLayout title="Water Future" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Water for Our Future" hideDivider />
          <Type sx={{mt: 1}} variant="h3" color="primary">
            Reliable, Sustainable Water Supplies for Placer County
          </Type>
          <Box sx={{my: 4}}>
            <Divider />
          </Box>
          {/* <Grid container spacing={{xs: 4.5, sm: 6}}>
            <Grid xs={12} sm={7}>
              <Type paragraph>
                Water is not just essential for our daily lives; it's the
                cornerstone of Placer County's future. "Water for Our Future"
                symbolizes PCWA's proactive commitment to supporting a thriving
                community and the economic vitality of Placer County.
              </Type>
            </Grid>
            <Grid xs={12} sm={5}>
              <Box
                sx={{
                  mx: 'auto',
                  // Don't let portrait image get too big in small layouts.
                  width: {
                    xs: '60vw',
                    sm: '100%'
                  }
                }}
              >
                <Image
                  src="7dbe2de0-6b2f-11e7-b8ae-eb2280fc8c40-bill-pay-aside.jpg"
                  alt="demo image"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={200}
                  height={259}
                />
              </Box>
            </Grid>
          </Grid> */}
          <Spacing factor={2} size="large" />
          {/* <Type paragraph>
            Water is not just essential for our daily lives; it's the
            cornerstone of Placer County's future. "Water for Our Future"
            symbolizes PCWA's proactive commitment to supporting a thriving
            community and the economic vitality of Placer County.
          </Type> */}
          <BlockQuote />
          <Spacing size="large" factor={3} />
          <Type variant="h3" gutterBottom>
            PCWA has plenty of water to meet your needs now and for generations
            to come.
          </Type>
          <FadeInToTopIntersect animateKey="water-future-txt1">
            <Type paragraph>
              Our high-priority water rights in the American River and proactive
              planning help ensure that we can serve both existing and planned
              residential and business growth in our region.
            </Type>
            <Type paragraph>
              As our communities in West Placer County, including Roseville,
              Rocklin, Loomis, and Lincoln, experience rapid growth, we
              recognize the challenges and opportunities it brings. While PCWA
              doesn't have a role in approving or denying new development, our
              responsibility lies in making sure there's enough water to support
              planned growth and delivering it where it's needed.
            </Type>
            <Type paragraph>
              To fulfill this commitment, we're investing in long-term
              infrastructure projects like the Ophir Project. This initiative
              will enhance our treatment capacity and our pipeline network to
              deliver treated water to homes and businesses in the western part
              of the county. Scheduled to begin construction of a new water
              treatment plant in 2025, the Ophir Project demonstrates our
              dedication to meeting evolving community needs.
            </Type>
            <Type paragraph>
              The RiverArc Project is another cornerstone water reliability
              project, essential to enhancing our water portfolio to address the
              projected impacts of climate change. It improves our region's
              water supply reliability by better balancing supplies from its two
              major surface water sources—reducing pressure off the American
              River and harnessing the opportunities from the much larger
              Sacramento River.
            </Type>
          </FadeInToTopIntersect>
          <Spacing size="x-large" />
          <Image
            alt="Water for our Future"
            src="https://pcwa.imgix.net/pcwa-net/media/water-future/PCWA_WebBG2.jpg"
            width={1920}
            height={1080}
            style={{width: '100%', height: 'auto'}}
          />
          <Spacing size="x-large" />
          <Type variant="h3" gutterBottom>
            At PCWA, stewardship is at the core of everything we do.
          </Type>
          <FadeInToTopIntersect animateKey="water-future-txt2">
            <Type paragraph>
              We champion the health of our watershed and water supply
              reliability through forestry management initiatives that mitigate
              wildfire risks and safeguard our water sources. Additionally, we
              actively engage the community through educational programs and
              water efficiency initiatives, empowering customers to contribute
              to a sustainable, water-wise Placer County. Our rebate programs
              support you in implementing water-wise practices at home and work,
              demonstrating our commitment to promoting sustainable water use
              and resilience in our community.
            </Type>
          </FadeInToTopIntersect>
          <Spacing size="x-large" />
          <Type variant="h3">
            Learn more about PCWA's commitment to providing Water for our
            Future:
          </Type>
          <Spacing />
          <Grid container spacing={2}>
            <Grid
              xs={12}
              sm={6}
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              sx={{textAlign: 'center'}}
            >
              <Type variant="subtitle1" gutterBottom color="primary">
                Water Supply Reliability and Infrastructure
              </Type>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              sx={{textAlign: 'center'}}
            >
              <Type variant="subtitle1" gutterBottom color="primary">
                Stewardship
              </Type>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <List dense>
                <ListItemButton
                  href="/media/water-future/supporting-our-growing-communities"
                  LinkComponent={LinkComponent}
                >
                  <ListItemText
                    primary={
                      <Type variant="inherit">
                        Empowering Our Water Future: PCWA's Role in Supporting
                        our Growing Communities{' '}
                        <em>(General Manager’s Report—Jan-Feb 2024)</em>
                      </Type>
                    }
                  />
                </ListItemButton>
                <ListItemButton
                  href="/media/water-future/ophir-project"
                  LinkComponent={LinkComponent}
                >
                  <ListItemText primary="The Ophir Project" />
                </ListItemButton>
                <ListItemButton
                  href="https://www.riverarcproject.com"
                  LinkComponent={LinkComponent}
                >
                  <ListItemText primary="RiverArc Project" />
                </ListItemButton>
              </List>
            </Grid>
            <Grid xs={12} sm={6}>
              <List dense>
                <ListItemButton
                  href="/smart-water-use/rebate-programs"
                  LinkComponent={LinkComponent}
                >
                  <ListItemText primary="Rebate Programs" />
                </ListItemButton>
                <ListItemButton
                  href="/smart-water-use/house-calls"
                  LinkComponent={LinkComponent}
                >
                  <ListItemText primary="Water Wise House Calls" />
                </ListItemButton>
                <ListItemButton
                  href="/smart-water-use/master-gardener-demonstration-garden"
                  LinkComponent={LinkComponent}
                >
                  <ListItemText primary="UC Master Gardeners of Placer County Demonstration Garden at the Loomis Library and Community Learning Center" />
                </ListItemButton>
                <ListItemButton
                  href="/smart-water-use/go-to-school-on-leaks"
                  LinkComponent={LinkComponent}
                >
                  <ListItemText primary="School Outreach Programs" />
                </ListItemButton>
              </List>
            </Grid>
          </Grid>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const placeholders = await getImgixBlurHashes(imgixImages)
    return {
      props: {placeholders}
    }
  } catch (error) {
    console.log('There was an error fetching blurhashes', error)
    return {props: {}}
  }
}
