import React from 'react'
import Link, {LinkProps} from 'next/link'
import GlowButton, {GlowButtonProps} from '@components/GlowButton/GlowButton'
import GlowGreen, {GlowGreenProps} from '@components/GlowGreen/GlowGreen'

type NextGlowButtonProps = {
  children: React.ReactNode
  href: string
  linkProps?: LinkProps
} & GlowButtonProps &
  GlowGreenProps

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
  inactiveColor,
  activeColor,
  size = 'medium',
  ...rest
}: NextGlowButtonProps) => {
  // It appears that the Next <Link/> is blocking onMouseEnter & onMouseLeave, so we duplicate that functionality in this component on a parent element.

  return (
    <GlowGreen inactiveColor={inactiveColor} activeColor={activeColor}>
      <Link href={href} passHref {...linkProps}>
        <ForwardGlowButton color="inherit" size={size} {...rest}>
          {children}
        </ForwardGlowButton>
      </Link>
    </GlowGreen>
  )
}

export default NextGlowButton
