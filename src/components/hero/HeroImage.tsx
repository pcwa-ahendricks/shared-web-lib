import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback
} from 'react'
import HeroOverlay from '@components/hero/HeroOverlay'
import {useIntersection} from 'react-use'
import JackinBox from '@components/mui-jackinbox/JackinBox'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {imgixUrlLoader} from '@lib/imageLoader'
import {RowBox} from '@components/MuiSleazebox'
import Image from 'next/image'
import {Box} from '@mui/material'
import FadeIn from '@components/boxes/animate/FadeIn'

const animateKey = 'homeHeroOverly'

export default function HeroImage() {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext
  const [heroOverlayIn] = useState(true) // onLoad doesn't work with Next Image, specifically 'priority' prop. See https://github.com/vercel/next.js/issues/20368#issuecomment-749539450

  const heroAnimateRef = useRef<HTMLDivElement>(null)
  const [heroIntersected, setHeroIntersected] = useState(false)

  const heroIntersection = useIntersection(heroAnimateRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  })

  useEffect(() => {
    if (heroIntersection?.isIntersecting) {
      setHeroIntersected(true)
    }
  }, [heroIntersection])

  const {[animateKey]: homeAnimateDone} = uiState.animateDone

  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
  }, [uiDispatch])

  return (
    <div ref={heroAnimateRef}>
      <Box
        m="auto"
        width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
        // maxWidth={1400}
        height={{xs: 300, sm: 350, md: 425, lg: 500, xl: 600}} // Original Photo is not very tall, so special treatment is given on smaller devices. 'objectFit' is also toggled to help with image display.
        overflow="hidden"
        position="relative"
      >
        <Image
          priority
          fill
          loader={imgixUrlLoader}
          src={`https://imgix.cosmicjs.com/cb26bd70-207c-11ec-99dc-57488d0e52ad-PCWAFrench-Meadows-Reservoirwebsite-banner.jpg?bri=-2&high=-20`}
          // src: `https://imgix.cosmicjs.com/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg${stringify(
          // {bri: -5, high: -15},
          // true
          // )}`,
          alt="A photo of French Meadows Reservoir"
          objectPosition="center 40%"
          objectFit={'cover'} // Original Photo is not very tall, so special treatment is given on smaller devices. Container height is also toggled to help with image display.
        />

        <FadeIn
          delay={1000}
          animate={heroOverlayIn && heroIntersected && !homeAnimateDone}
          onAnimationEnd={animateDoneHandler}
          transparentUntilAnimate={!homeAnimateDone}
        >
          <RowBox
            justifyContent="space-around"
            alignItems="center"
            position="absolute"
            top={0}
            bottom={0}
            right={0}
            left={0}
          >
            <HeroOverlay
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              sx={{
                flex: '0 0 auto'
              }}
            />
          </RowBox>
        </FadeIn>
      </Box>
    </div>
  )
}
