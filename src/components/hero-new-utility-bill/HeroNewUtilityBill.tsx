import React, {useContext, useRef, useState, useCallback} from 'react'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {imgixUrlLoader} from '@lib/imageLoader'
import Image from 'next/image'
import {Box, useMediaQuery, Button, Typography as Type} from '@mui/material'
import {useTimeoutFn} from 'react-use'
import useLinkComponent from '@hooks/useLinkComponent'
import SlideInLeft from '@components/boxes/animate/SlideInLeft'

const animateKey = 'homeHeroNewUtilityBill'

export default function HeroNewUtilityBill() {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext

  const heroAnimateRef = useRef<HTMLDivElement>(null)

  const {[animateKey]: homeAnimateDone} = uiState.animateDone

  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
  }, [uiDispatch])

  const [colorState, setColorState] = useState(false)
  function fn() {
    setColorState(true)
  }
  const [_isReady, _cancel, _reset] = useTimeoutFn(fn, 100)

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
            margin: 'auto',
            maxWidth: 1200,
            '& img': {
              filter: 'grayscale(1)',
              opacity: 0.9,
              transition: 'all 0.8s ease-in-out',
              ...((colorState || homeAnimateDone) && {
                opacity: 1,
                filter: 'none',
                '-webkit-transform': 'scale(1.04) translate3d(0,0,0)',
                transform: 'scale(1.03) translate3d(0,0,0)'
              })
            }
          }}
        >
          <Image
            priority
            // fill
            width={2100}
            height={1500}
            loader={imgixUrlLoader}
            src="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/customer-service/erp/New%20Customer%20Portal%20-%20Postcard%20-%20no%20logo.png"
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
            alt="SMUD Rice Fields overflowing"
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 220,
            left: 30,
            maxWidth: '88vw'
          }}
        >
          <SlideInLeft
            animate={!homeAnimateDone}
            onAnimationEnd={animateDoneHandler}
            delay={1000}
          >
            {/* <Box>
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
            </Box> */}
            <Box>
              <Button
                LinkComponent={LinkComponent}
                variant="contained"
                color="inherit"
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
                See Our Frequently Asked Questions
              </Button>
            </Box>
          </SlideInLeft>
        </Box>
      </Box>
    </div>
  )
}
