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
import {Typography as Type, Box} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import BlockQuote from '@components/water-future/block-quote'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {useIntersection} from 'react-use'
import FadeInToTop, {
  FadeInToTopProps
} from '@components/boxes/animate/FadeInToTop'

export default function WaterFuturePage() {
  return (
    <PageLayout title="Water Future" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Water for Our Future" hideDivider />
          <Type variant="h3" color="primary">
            Reliable, Sustainable Water Supplies for Placer County
          </Type>
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
          <Spacing factor={2} size="x-large" />
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
              As our communities, including Roseville, Rocklin, Loomis, and
              Lincoln, experience rapid growth, we recognize the challenges and
              opportunities it brings. While PCWA doesn't have a role in
              approving or denying new development, our responsibility lies in
              making sure there's enough water to support planned growth and
              delivering it where it's needed.
            </Type>
            <Type paragraph>
              To fulfill this commitment, we're investing in long-term
              infrastructure projects like the Ophir Project. This initiative
              will enhance our treatment capacity and our pipeline network to
              deliver treated water to homes and businesses in West Placer
              County. Scheduled to begin construction in 2025, the Ophir Project
              demonstrates our dedication to meeting evolving community needs.
            </Type>
            <Type paragraph>
              The RiverArc Project is another cornerstone water reliability
              project, essential to enhancing our water portfolio to address the
              projected impacts of climate change.
            </Type>
          </FadeInToTopIntersect>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

const FadeInToTopIntersect = ({
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
