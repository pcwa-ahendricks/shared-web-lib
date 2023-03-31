import React, {useMemo} from 'react'
import {Button, ButtonProps} from '@mui/material'
import NextLink, {LinkProps} from 'next/link'
// import usePrefetchHandler from '@hooks/usePrefetchHandler'

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
  // const mouseEnterHandler = usePrefetchHandler()

  const flexButton = useMemo(
    () =>
      isNextLink ? (
        <>
          <NextLink href={href} as={as} passHref>
            <Button component="a" {...rest}>
              {children}
            </Button>
          </NextLink>
        </>
      ) : (
        <Button href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </Button>
      ),
    [children, href, isNextLink, rest, as]
  )

  return <>{flexButton}</>
}

export default FlexButton
