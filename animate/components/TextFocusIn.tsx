import Animate, {AnimateProps} from './Animate'

export type TextFocusInProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const TextFocusIn = ({children, ...props}: TextFocusInProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="text-focus-in"
      easingFunc="cubic-bezier(0.550, 0.085, 0.680, 0.530)"
      duration={1000}
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default TextFocusIn
