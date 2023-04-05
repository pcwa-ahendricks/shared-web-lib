import React from 'react'
import {Button, ButtonProps} from '@mui/material'
import NextLink, {LinkProps} from 'next/link'

export type FlexButtonProps = {
  children: React.ReactNode
  isNextLink?: boolean
  href: string
} & ButtonProps<'a'> &
  LinkProps

const FlexButton = ({
  children,
  href,
  as,
  isNextLink = true,
  ...rest
}: FlexButtonProps) => {
  if (isNextLink) {
    return (
      <Button component={NextLink} as={as} href={href} {...rest}>
        {children}
      </Button>
    )
  }
  return (
    <Button href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </Button>
  )
}

export default FlexButton
