import React, {useState, useCallback} from 'react'
import {Box, Grow, GrowProps} from '@mui/material'

type Props = {
  isIn: boolean
} & GrowProps

const WaitToGrow = ({isIn, children, ...rest}: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const enteringTransHandler = useCallback(() => {
    setShow(true)
  }, [])

  const exitedTransHandler = useCallback(() => {
    setShow(false)
  }, [])

  if (!show && !isIn) {
    return null
  }

  return (
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
  )
}

export default WaitToGrow
