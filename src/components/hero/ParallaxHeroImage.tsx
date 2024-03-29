import React, {
  useEffect,
  useContext,
  useRef,
  useMemo,
  useState,
  useCallback
} from 'react'
import HeroOverlay from '@components/hero/HeroOverlay'
import ImageParallaxBanner from '@components/ImageParallaxBanner/ImageParallaxBanner'
import {useIntersection} from 'react-use'
import JackinBox from '@components/mui-jackinbox/JackinBox'
import {useMediaQuery, useTheme} from '@mui/material'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {imgixUrlLoader} from '@lib/imageLoader'
import {RowBox} from '@components/MuiSleazebox'

const animateKey = 'homeHeroOverly'

export default function ParallaxHeroImage() {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext
  const [heroOverlayIn] = useState(true) // onLoad doesn't work with Next Image, specifically 'priority' prop. See https://github.com/vercel/next.js/issues/20368#issuecomment-749539450
  const is5to4 = useMediaQuery('@media (min-aspect-ratio: 5/4)')
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const marginTop = useMemo(
    // () => (isMDUp && is1to1 ? '-175px' : is2to1 ? '-25vh' : 0),
    () => (isXS ? 10 : isSM ? 20 : is5to4 ? '-10vmax' : 0),
    [is5to4, isXS, isSM]
  )
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
      <ImageParallaxBanner
        speed={3}
        marginTop={marginTop}
        ImageProps={{
          width: 5366,
          height: 2425,
          priority: true,
          loader: imgixUrlLoader,
          layout: 'responsive',
          src: 'https://imgix.cosmicjs.com/cb26bd70-207c-11ec-99dc-57488d0e52ad-PCWAFrench-Meadows-Reservoirwebsite-banner.jpg',
          // src: `https://imgix.cosmicjs.com/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg${stringify(
          // {bri: -5, high: -15},
          // true
          // )}`,
          alt: 'A photo of French Meadows Reservoir'
          // See comment above regarding onLoad support
          // onLoad: () => setHeroOverlayIn(true),
          // paddingPercent: 66.6495,
        }}
        style={{
          height: '50vw',
          maxHeight: '45vh'
          // minHeight: 400
        }}
      >
        <JackinBox
          name="fadeIn"
          delay={1}
          hideUntilAnimate={!homeAnimateDone}
          animate={heroOverlayIn && heroIntersected && !homeAnimateDone}
          onAnimateEnd={animateDoneHandler}
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
        </JackinBox>
      </ImageParallaxBanner>
    </div>
  )
}
