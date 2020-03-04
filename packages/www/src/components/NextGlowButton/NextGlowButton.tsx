import React from 'react'
import Link, {LinkProps} from 'next/link'
import GlowButton, {GlowButtonProps} from '@components/GlowButton/GlowButton'

type NextGlowButtonProps = {
  children: React.ReactNode
  href: string
  linkProps?: LinkProps
} & GlowButtonProps

// Using React.forwardRef made Typescript warnings and console error warnings go away. Not clear if this is implemented correctly.
const ForwardGlowButton = React.forwardRef(
  ({children, color, size, ...rest}: GlowButtonProps, ref: React.Ref<any>) => (
    <GlowButton {...rest} {...ref} color={color} size={size}>
      {children}
    </GlowButton>
  )
)
ForwardGlowButton.displayName = 'ForwardGlowButton'

const NextGlowButton = ({
  href,
  linkProps,
  children,
  size = 'medium',
  ...rest
}: NextGlowButtonProps) => {
  return (
    <Link href={href} passHref {...linkProps}>
      <ForwardGlowButton color="inherit" size={size} {...rest}>
        {children}
      </ForwardGlowButton>
    </Link>
  )
}

export default NextGlowButton
