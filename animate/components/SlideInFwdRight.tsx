import Animate, {AnimateProps} from './Animate'

export type SlideInFwdRightProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const SlideInFwdRight = ({children, ...rest}: SlideInFwdRightProps) => {
  return (
    <Animate
      name="slide-in-fwd-right"
      easingFunc="cubic-bezier(0.250, 0.460, 0.450, 0.940)"
      duration={400}
      animate3d
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default SlideInFwdRight
