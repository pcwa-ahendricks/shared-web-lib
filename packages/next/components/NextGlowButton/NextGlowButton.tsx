import React from 'react'
import Link, {LinkProps} from 'next/link'
import GlowButton, {GlowButtonProps} from '@components/GlowButton/GlowButton'

type NextGlowButtonProps = {
  children: React.ReactNode
  href: string
  linkProps?: LinkProps
} & GlowButtonProps

const NextGlowButton = ({
  href,
  linkProps,
  children,
  color = 'default',
  size = 'medium',
  ...rest
}: NextGlowButtonProps) => {
  return (
    <Link href={href} passHref {...linkProps}>
      <GlowButton {...rest} color={color} size={size}>
        {children}
      </GlowButton>
    </Link>
  )
}

export default NextGlowButton
