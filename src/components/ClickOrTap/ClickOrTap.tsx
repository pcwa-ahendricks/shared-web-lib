import React from 'react'
import {Typography as Type, TypographyProps} from '@mui/material'
import useSupportsTouch from '@hooks/useSupportsTouch'
import toTitleCase from '@lib/toTitleCase'

type Props = {
  titlecase?: boolean
  uppercase?: boolean
} & TypographyProps

const ClickOrTap = ({titlecase = false, uppercase = false, ...rest}: Props) => {
  const supportsTouch = useSupportsTouch()
  const text = supportsTouch ? 'tap' : 'click'
  const formattedText = uppercase
    ? text.toUpperCase()
    : titlecase
      ? toTitleCase(text)
      : text
  return (
    <Type variant="inherit" color="inherit" component="span" {...rest}>
      {formattedText}
    </Type>
  )
}

export default ClickOrTap
