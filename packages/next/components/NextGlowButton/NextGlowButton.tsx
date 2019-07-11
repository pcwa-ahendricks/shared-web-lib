import React, {useCallback, useState} from 'react'
import Link, {LinkProps} from 'next/link'
import GlowButton, {GlowButtonProps} from '@components/GlowButton/GlowButton'
import {Box} from '@material-ui/core'

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
  color = 'initial',
  size = 'medium',
  ...rest
}: NextGlowButtonProps) => {
  // It appears that the Next <Link/> is blocking onMouseEnter & onMouseLeave, so we duplicate that functionality in this component on a parent element (<Box/>).
  const [active, setActive] = useState<boolean>(false)

  const buttonEnterHandler = useCallback(() => {
    setActive(true)
  }, [])

  const buttonLeaveHandler = useCallback(() => {
    setActive(false)
  }, [])
  return (
    <Box onMouseEnter={buttonEnterHandler} onMouseLeave={buttonLeaveHandler}>
      <Link href={href} passHref {...linkProps}>
        <ForwardGlowButton color={color} size={size} {...rest} active={active}>
          {children}
        </ForwardGlowButton>
      </Link>
    </Box>
  )
}

export default NextGlowButton
