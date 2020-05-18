import React, {useState, useCallback, useMemo} from 'react'
import {Box, Grow, Fade} from '@material-ui/core'
import {GrowProps} from '@material-ui/core/Grow'
import {FadeProps} from '@material-ui/core/Fade'

type Props = {
  isIn: boolean
  children: React.ReactNode
} & GrowProps

type WaitToFadeProps = {
  isIn: boolean
  children: React.ReactNode
} & FadeProps

const WaitToGrow = ({isIn, children, ...rest}: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const enteringTransHandler = useCallback(() => {
    setShow(true)
  }, [])

  const exitedTransHandler = useCallback(() => {
    setShow(false)
  }, [])

  // Spreading rest params in <Grow/> in conjunction with using <React.Fragment/> allows for easily making component use the full width of it's parent.
  const waitToGrowEl = useMemo(
    () =>
      show || isIn ? (
        <>
          <Grow
            in={isIn}
            onEntering={enteringTransHandler}
            onExited={exitedTransHandler}
            {...rest}
          >
            <Box>
              {/* Wrap child of transitions in component with ForwardRef setup to prevent errors. Using a Material-UI component will suffice. */}
              {children}
            </Box>
          </Grow>
        </>
      ) : null,
    [show, isIn, enteringTransHandler, exitedTransHandler, children, rest]
  )

  return <>{waitToGrowEl}</>
}

const WaitToFade = ({isIn, children, ...rest}: WaitToFadeProps) => {
  const [show, setShow] = useState<boolean>(false)
  const enteringTransHandler = useCallback(() => {
    setShow(true)
  }, [])

  const exitedTransHandler = useCallback(() => {
    setShow(false)
  }, [])

  // Spreading rest params in <Grow/> in conjunction with using <React.Fragment/> allows for easily making component use the full width of it's parent.
  const waitToGrowEl = useMemo(
    () =>
      show || isIn ? (
        <>
          <Fade
            in={isIn}
            onEntering={enteringTransHandler}
            onExited={exitedTransHandler}
            {...rest}
          >
            <Box>
              {/* Wrap child of transitions in component with ForwardRef setup to prevent errors. Using a Material-UI component will suffice. */}
              {children}
            </Box>
          </Fade>
        </>
      ) : null,
    [show, isIn, enteringTransHandler, exitedTransHandler, children, rest]
  )

  return <>{waitToGrowEl}</>
}

export default WaitToGrow
export {WaitToFade}
