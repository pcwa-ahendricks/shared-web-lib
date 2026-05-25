import {cn} from '../_core'
import {useIntersectionObserver} from 'usehooks-ts'
import {useEffect, type ReactNode} from 'react'
import {useAnimateOnce} from '../hooks/useAnimateOnce'

/**
 * Props for AnimateOnIntersect.
 */
interface Props {
  children: ReactNode
  /** Tailwind animation class(es) applied when the element intersects the viewport. Include `motion-safe:` to respect reduced-motion preferences. */
  className?: string
  /** IntersectionObserver root margin. Use negative values (e.g. `"-100px"`) to trigger after the element is fully visible. */
  rootMargin?: string
  /**
   * Controls visibility behavior before the animation triggers.
   * - `entrance` (default): element is hidden until intersected, then animates in. Use for slide-in, fade-in, scale-in, etc.
   * - `attention`: element is always visible; animation is triggered on intersection. Use for shake, tada, etc.
   */
  type?: 'entrance' | 'attention'
  /**
   * Optional stable key used to persist "already seen" state in sessionStorage across Next.js page navigations.
   * When provided, the animation only plays once per browser session even if the user navigates away and returns.
   * Must be unique per animation instance on the page.
   */
  animateKey?: string
}

/**
 * AnimateOnIntersect
 *
 * A wrapper that triggers a Tailwind CSS animation when the element scrolls into view.
 * Pass the animation class via `className` — the component handles intersection detection,
 * visibility management, and optional once-per-session playback via `animateKey`.
 *
 * Animation properties (duration, easing, delay, fill-mode) can be overridden with
 * tw-animate-css utilities: `duration-*`, `ease-*`, `delay-*`, `fill-mode-*`.
 *
 * @example
 * // Entrance animation — hidden until scrolled into view
 * <AnimateOnIntersect
 *   className="motion-safe:animate-mista-slide-in-left"
 *   animateKey="hero-section"
 *   rootMargin="-100px"
 * >
 *   <h2>About the Project</h2>
 * </AnimateOnIntersect>
 *
 * @example
 * // Attention animation — always visible, shakes on intersection
 * <AnimateOnIntersect type="attention" className="motion-safe:animate-mista-shake-bottom">
 *   <button>Click me</button>
 * </AnimateOnIntersect>
 */
export default function AnimateOnIntersect({
  children,
  className,
  rootMargin = '0px',
  type = 'entrance',
  animateKey
}: Props) {
  const {alreadySeen, markSeen} = useAnimateOnce(animateKey)

  const {isIntersecting, ref} = useIntersectionObserver({
    rootMargin,
    freezeOnceVisible: true
  })

  useEffect(() => {
    if (isIntersecting && !alreadySeen) markSeen()
  }, [isIntersecting, alreadySeen, markSeen])

  const shouldAnimate = isIntersecting && !alreadySeen

  return (
    <div
      ref={ref}
      className={cn(
        type === 'entrance' &&
          !shouldAnimate &&
          !alreadySeen &&
          'opacity-0 motion-reduce:opacity-100',
        shouldAnimate && className
      )}
    >
      {children}
    </div>
  )
}
