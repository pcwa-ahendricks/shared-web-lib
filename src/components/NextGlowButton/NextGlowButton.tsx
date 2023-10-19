import React, {forwardRef, Ref} from 'react'
import Link, {LinkProps} from 'next/link'
import GlowButton, {GlowButtonProps} from '@components/GlowButton/GlowButton'

type NextGlowButtonProps = {
  children: React.ReactNode
  href: string
  linkProps?: LinkProps
} & GlowButtonProps

// Using React.forwardRef made Typescript warnings and console error warnings go away. Not clear if this is implemented correctly.
const ForwardGlowButton = forwardRef(function forwardGlowButton(
  {children, color, size, ...rest}: GlowButtonProps,
  ref: Ref<any>
) {
  return (
    <GlowButton {...rest} {...ref} color={color} size={size}>
      {children}
    </GlowButton>
  )
})

const NextGlowButton = ({
  href,
  linkProps,
  children,
  size = 'medium',
  ...rest
}: NextGlowButtonProps) => {
  return (
    <Link href={href} {...linkProps} passHref legacyBehavior>
      <ForwardGlowButton color="inherit" size={size} {...rest}>
        {children}
      </ForwardGlowButton>
    </Link>
  )
}

export default NextGlowButton
