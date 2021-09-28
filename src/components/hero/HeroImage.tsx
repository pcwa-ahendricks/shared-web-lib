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
import JackinBox from 'mui-jackinbox'
import {useMediaQuery} from '@material-ui/core'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {RowBox} from 'mui-sleazebox'

const animateKey = 'homeHeroOverly'

export default function HeroImage() {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext
  const [heroOverlayIn] = useState(true) // onLoad doesn't work with Next Image, specifically 'priority' prop. See https://github.com/vercel/next.js/issues/20368#issuecomment-749539450
  const is5to4 = useMediaQuery('@media (min-aspect-ratio: 5/4)')
  const marginTop = useMemo(
    // () => (isMDUp && is1to1 ? '-175px' : is2to1 ? '-25vh' : 0),
    () => (is5to4 ? '-16vmax' : 0),
    [is5to4]
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
        amount={0.1}
        marginTop={marginTop}
        ImageProps={{
          width: 900,
          height: 600,
          priority: true,
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
              style={{
                flex: '0 0 auto'
              }}
            />
          </RowBox>
        </JackinBox>
      </ImageParallaxBanner>
    </div>
  )
}
