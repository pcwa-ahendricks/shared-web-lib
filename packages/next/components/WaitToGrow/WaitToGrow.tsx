import React, {useState, useCallback, useMemo} from 'react'
import {Box, Grow} from '@material-ui/core'
import {GrowProps} from '@material-ui/core/Grow'

type Props = {
  isIn: boolean
  children: React.ReactNode
} & GrowProps

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
        <React.Fragment>
          <Grow
            in={isIn}
            onEntering={enteringTransHandler}
            onExited={exitedTransHandler}
            {...rest}
          >
            {/* Wrap child of transitions in component with ForwardRef setup to prevent errors. Using a Material-UI component will suffice. */}
            <Box>{children}</Box>
          </Grow>
        </React.Fragment>
      ) : null,
    [show, isIn, enteringTransHandler, exitedTransHandler, children, rest]
  )

  return <React.Fragment>{waitToGrowEl}</React.Fragment>
}

export default WaitToGrow
