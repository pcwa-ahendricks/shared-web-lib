import React from 'react'
import {Typography as Type} from '@mui/material'
import useSupportsTouch from '@hooks/useSupportsTouch'
import toTitleCase from '@lib/toTitleCase'

type Props = {
  titlecase?: boolean
  uppercase?: boolean
}

const ClickOrTap = ({titlecase = false, uppercase = false}: Props) => {
  const supportsTouch = useSupportsTouch()
  const text = supportsTouch ? 'tap' : 'click'
  const formattedText = uppercase
    ? text.toUpperCase()
    : titlecase
    ? toTitleCase(text)
    : text
  return (
    <Type variant="inherit" color="inherit">
      {formattedText}
    </Type>
  )
}

export default ClickOrTap
