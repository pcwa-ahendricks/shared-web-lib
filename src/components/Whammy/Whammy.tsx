import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback
} from 'react'
import imgixLoader from '@lib/imageLoader'
import {useIntersection, useTimeoutFn} from 'react-use'
import JackinBox from '@components/mui-jackinbox/JackinBox'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import {BoxProps, useMediaQuery, useTheme, Box} from '@mui/material'
import Image from 'next/legacy/image'

const SHOW_WHAMMY = false // change this to true when we are ready to use this animation
const animateKey = 'homeWhammy'

export default function Whammy({children, ...rest}: BoxProps) {
  const theme = useTheme()

  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext

  const [removeAnimation, setRemoveAnimation] = useState(false)
  const [animationRemoved, setAnimationRemoved] = useState(false)
  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
  }, [uiDispatch])

  const animationEndHandler = useCallback(() => {
    setAnimationRemoved(true)
    //   Since this animation will end after the hero one set app state here
    animateDoneHandler()
  }, [animateDoneHandler])

  const animateRef = useRef<HTMLDivElement>(null)
  const [intersected, setIntersected] = useState(false)
  const intersection = useIntersection(animateRef, {
    root: null,
    rootMargin: '0px',
    threshold: isXS ? 0.7 : 0.5
  })

  //   On mobile the hero isn't very tall, and the alerts that may be tall are asynchronous so intersect will happen immediately which is undesirable. Wait a second before calculating intersect.
  const [initIntersectTimeout, setInitIntersectTimeout] = useState(false)
  useTimeoutFn(() => setInitIntersectTimeout(true), 1500)

  useEffect(() => {
    if (intersection?.isIntersecting && initIntersectTimeout) {
      setIntersected(true)
    }
  }, [intersection, initIntersectTimeout])

  const [_ready, _cancel, reset] = useTimeoutFn(
    () => intersected && setRemoveAnimation(true),
    8000
  )

  useEffect(() => {
    if (intersected === true && removeAnimation === false) {
      reset()
    }
  }, [intersected, reset, removeAnimation])

  const {[animateKey]: whammyAnimateDone} = uiState.animateDone

  const whammyTime = SHOW_WHAMMY
  const showWhammyIn =
    !animationRemoved && intersected && !whammyAnimateDone && whammyTime
  const showWhammyOut =
    removeAnimation && intersected && !whammyAnimateDone && whammyTime

  return (
    <Box position="relative" {...rest}>
      <div ref={animateRef}>
        {children}

        <JackinBox
          name="rollIn"
          delay={1}
          animate={showWhammyIn}
          hideUntilAnimate
          zIndex={!animationRemoved ? 2 : -1}
          position="absolute"
          top={{xs: -25, sm: -75}}
          left={{xs: -5, sm: -25}}
          width={{xs: 200, sm: 325}}
          height={{xs: 200, sm: 325}}
        >
          <JackinBox
            name="heartBeat"
            delay={4}
            animate={showWhammyIn}
            hideUntilAnimate
          >
            <JackinBox
              name="bounceOutRight"
              animate={showWhammyOut}
              onAnimateEnd={animationEndHandler}
              // Important - this animation will break mega menu if left on-screen
              noDisplayAfterAnimate
            >
              <Box
                // [HACK] - This transition is required to prevent the animation from flickering back on after animation. Not sure why it's flickering at all. This doesn't stop the flicker, merely makes the image transparent so that it is not seen.
                sx={{
                  transition: 'opacity 800ms ease',
                  opacity: removeAnimation ? 0 : 1
                }}
              >
                <Image
                  src="69045490-e337-11eb-b4d6-4f771ba4265e-whammy.png"
                  loader={imgixLoader}
                  alt="whammy"
                  layout="responsive"
                  width={800}
                  height={800}
                />
              </Box>
            </JackinBox>
          </JackinBox>
        </JackinBox>
      </div>
    </Box>
  )
}
