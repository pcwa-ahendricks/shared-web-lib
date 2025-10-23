import Animate, {AnimateProps} from './Animate'

export type ShakeBottomProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const ShakeBottom = ({children, ...rest}: ShakeBottomProps) => {
  return (
    <Animate
      name="shake-bottom"
      easingFunc="cubic-bezier(0.455, 0.030, 0.515, 0.955)"
      duration={800}
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default ShakeBottom
