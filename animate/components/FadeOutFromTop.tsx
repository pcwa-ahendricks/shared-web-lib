import Animate, {AnimateProps} from './Animate'

export type FadeOutFromTopProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeOutFromTop = ({children, ...props}: FadeOutFromTopProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-out-from-top"
      easingFunc="ease"
      duration={800}
      fillMode="forwards"
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeOutFromTop
