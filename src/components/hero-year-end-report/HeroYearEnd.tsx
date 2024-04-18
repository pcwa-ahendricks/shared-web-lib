import React, {useContext, useRef, useState, useCallback} from 'react'
// import HeroYearEndOverlay from '@components/hero-year-end-report/HeroYearEndOverlay'
// import {useIntersection} from 'react-use'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {imgixUrlLoader} from '@lib/imageLoader'
import Image from 'next/image'
import {Box, useMediaQuery, Button, Typography as Type} from '@mui/material'
import {useTimeoutFn} from 'react-use'
import useLinkComponent from '@hooks/useLinkComponent'
import SlideInLeft from '@components/boxes/animate/SlideInLeft'

const animateKey = 'homeHeroOverly'

export default function HeroYearEnd() {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext
  const [heroOverlayIn] = useState(true) // onLoad doesn't work with Next Image, specifically 'priority' prop. See https://github.com/vercel/next.js/issues/20368#issuecomment-749539450

  const heroAnimateRef = useRef<HTMLDivElement>(null)
  // const [heroIntersected, setHeroIntersected] = useState(false)

  // const heroIntersection = useIntersection(heroAnimateRef, {
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 0.5
  // })

  // useEffect(() => {
  // if (heroIntersection?.isIntersecting) {
  // setHeroIntersected(true)
  //   }
  // }, [heroIntersection])

  const {[animateKey]: homeAnimateDone} = uiState.animateDone

  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
    console.log('done')
  }, [uiDispatch])

  const [colorState, setColorState] = useState(false)
  function fn() {
    setColorState(true)
  }
  const [_isReady, _cancel, _reset] = useTimeoutFn(fn, 1500)

  const isXs = useMediaQuery('@media (min-width:0px) and (max-width:525px)')
  const isSm = useMediaQuery('@media (min-width:525px) and (max-width:725px)')

  const LinkComponent = useLinkComponent()

  return (
    <div ref={heroAnimateRef}>
      <Box
        m="auto"
        width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
        // maxWidth={1400}
        // height={{xs: 400, sm: 450, md: 775, lg: 850, xl: 1000}} // Original Photo is not very tall, so special treatment is given on smaller devices. 'objectFit' is also toggled to help with image display.
        overflow="hidden"
        position="relative"
      >
        <Box
          sx={{
            // position: 'absolute',
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            '& img': {
              filter: 'grayscale(1)',
              opacity: 0.9,
              transition: 'all 0.8s ease-in-out',
              ...((colorState || homeAnimateDone) && {
                opacity: 1,
                filter: 'none',
                '-webkit-transform': 'scale(1.04) translate3d(0,0,0)',
                transform: 'scale(1.04) translate3d(0,0,0)'
              })
            }
          }}
        >
          <Image
            priority
            // fill
            width={4641}
            height={2940}
            loader={imgixUrlLoader}
            src="https://pcwa.imgix.net/pcwa-net/home/PCWA_Year%20End%20Report_2023_cover_no_brand.jpg"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              ...(isXs && {height: '375px'}),
              ...(isSm && {height: '475px'})
            }}
            // src: `https://imgix.cosmicjs.com/b2033870-12ef-11e9-97ad-6ddd1d636af5-fm-inlet-progressive.jpg${stringify(
            // {bri: -5, high: -15},
            // true
            // )}`,
            alt="A photo of French Meadows Reservoir"
          />
        </Box>

        <SlideInLeft
          animate={heroOverlayIn && !homeAnimateDone}
          onAnimationEnd={animateDoneHandler}
          delay={1000}
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <Box
            sx={{position: 'absolute', bottom: 30, left: 30, maxWidth: '90vw'}}
          >
            <Box>
              <Type
                variant="h1"
                sx={{
                  // fontSize: '2.5rem',
                  color: 'common.white',
                  fontWeight: 500,
                  textShadow:
                    '0 0 10px #010818, 0 0 2px #001d30, 0 0 36px #080709, 0 0 42px #599f46'
                }}
                gutterBottom
              >
                A YEAR IN REVIEW FOR PCWA 2023
              </Type>
            </Box>
            <Box>
              <Button
                LinkComponent={LinkComponent}
                variant="contained"
                color="secondary"
                size="large"
                // target="_blank"
                // rel="noopener noreferrer"
                // href="https://docs.pcwa.net/year-end-report-2024.pdf"
                href={
                  isXs
                    ? 'https://794f0754.flowpaper.com/PCWAYearEndReport2023/#MaximizeViewer=true'
                    : '/newsroom/publications/year-end-report'
                }
                target={isXs ? '_blank' : '_self'}
                sx={{
                  ...(!isXs && {
                    height: 50,
                    fontSize: '1.1rem'
                  })
                }}
              >
                Read Our 2023 Year End Report
              </Button>
            </Box>
            {/* <HeroYearEndOverlay
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              sx={{
                // zIndex: 99,
                flex: '0 0 auto'
              }}
            /> */}
          </Box>
        </SlideInLeft>
      </Box>
    </div>
  )
}
