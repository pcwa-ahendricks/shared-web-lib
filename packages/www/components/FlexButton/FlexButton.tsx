import React, {useMemo} from 'react'
import {Box, Button} from '@material-ui/core'
import {ButtonProps} from '@material-ui/core/Button'
import NextLink, {LinkProps} from 'next/link'
// import usePrefetchHandler from '@hooks/usePrefetchHandler'

export type FlexButtonProps = {
  children: React.ReactNode
  isNextLink?: boolean
  href: string
} & ButtonProps &
  LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

const FlexButton = ({
  children,
  href,
  isNextLink = true,
  // prefetch = true,
  ...rest
}: FlexButtonProps) => {
  // const mouseEnterHandler = usePrefetchHandler()

  const flexButton = useMemo(
    () =>
      isNextLink ? (
        <Box>
          <NextLink href={href}>
            <Button {...rest}>{children}</Button>
          </NextLink>
        </Box>
      ) : (
        <Button href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </Button>
      ),
    [children, href, isNextLink, rest]
  )

  return <React.Fragment>{flexButton}</React.Fragment>
}

export default FlexButton
