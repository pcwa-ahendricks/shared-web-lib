import {forwardRef} from 'react'
import {cn} from './utils'

/**
 * Props for the Link component.
 * Extends standard HTML <a> attributes and allows Tailwind class overrides.
 */
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Link
 *
 * A lightweight, Tailwind-native anchor with accessible defaults.
 * - Always-underlined (WCAG-friendly)
 * - Subtle hover/focus emphasis
 *
 * Use `className` to extend or override styles.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({className, ...props}, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'underline decoration-current decoration-1 underline-offset-4 opacity-90 hover:decoration-[1.5px] hover:opacity-100 focus-visible:opacity-100',
          className
        )}
        {...props}
      />
    )
  }
)
Link.displayName = 'Link'

const A = Link

export {A, Link as default}
export type {LinkProps}
