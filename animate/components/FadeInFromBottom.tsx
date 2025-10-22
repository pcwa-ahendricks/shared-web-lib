import Animate, {AnimateProps} from './Animate'

export type FadeInFromBottomProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeInFromBottom = ({children, ...props}: FadeInFromBottomProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-in-from-bottom"
      easingFunc="ease"
      duration={1000}
      fillMode="forwards"
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeInFromBottom
