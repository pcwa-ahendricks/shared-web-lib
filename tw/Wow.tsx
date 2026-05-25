import {cn} from '../_core'
import {useIntersectionObserver} from 'usehooks-ts'
import {useEffect, type ReactNode} from 'react'
import {useAnimateOnce} from '../hooks/useAnimateOnce'

/**
 * Props for Wow.
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
   * When `true` (default), the animation plays once and does not repeat on re-entry.
   * When `false`, the animation replays every time the element enters the viewport.
   */
  once?: boolean
  /**
   * Optional stable key used to persist "already seen" state across Next.js page visits.
   * Only meaningful when `once` is `true`. Must be unique per animation instance on the page.
   * Do not generate dynamically (e.g. with nanoid) — must be stable across renders and page visits.
   */
  animateKey?: string
}

/**
 * Wow
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
 * <Wow
 *   className="motion-safe:animate-mista-slide-in-left"
 *   animateKey="hero-section"
 *   rootMargin="-100px"
 * >
 *   <h2>About the Project</h2>
 * </Wow>
 *
 * @example
 * // Attention animation — always visible, shakes on intersection
 * <Wow type="attention" className="motion-safe:animate-mista-shake-bottom">
 *   <button>Click me</button>
 * </Wow>
 */
export default function Wow({
  children,
  className,
  rootMargin = '0px',
  type = 'entrance',
  once = true,
  animateKey
}: Props) {
  const {alreadySeen, markSeen} = useAnimateOnce(once ? animateKey : undefined)

  const {isIntersecting, ref} = useIntersectionObserver({
    rootMargin,
    freezeOnceVisible: once
  })

  useEffect(() => {
    if (isIntersecting && !alreadySeen) markSeen()
  }, [isIntersecting, alreadySeen, markSeen])

  const shouldAnimate = once
    ? isIntersecting && !alreadySeen
    : isIntersecting

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
