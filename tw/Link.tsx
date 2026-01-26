import {forwardRef} from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from '../../lib/utils'

/**
 * Props for the Link component.
 * Extends standard HTML <a> attributes and allows Tailwind class overrides.
 */
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean
  underline?: 'always' | 'hover' | 'none'
}

/**
 * Link
 *
 * A lightweight, Tailwind-native link with accessible defaults.
 *
 * By default, renders a styled `<a>` element.
 *
 * Underline behavior can be configured with `underline`:
 * - `"always"` (default): underlined at rest
 * - `"hover"`: only underlined on hover (keyboard focus is still underlined)
 * - `"none"`: no underline at rest or hover (keyboard focus is still underlined)
 *
 * Note: we always show an underline on `:focus-visible` to provide a clear
 * keyboard focus indicator.
 *
 * For Next.js client-side navigation, use `asChild` with `next/link`
 * to avoid nested anchors and keep styling centralized:
 *
 * ```tsx
 * import NextLink from 'next/link'
 * import Link from '@/share/tw/Link'
 *
 * <Link asChild underline="hover">
 *   <NextLink href="/purpose-and-powers">Purpose & Powers</NextLink>
 * </Link>
 * ```
 *
 * - `Link` controls styling
 * - `NextLink` controls routing
 *
 * Use `className` to extend or override styles.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({asChild = false, underline = 'always', className, ...props}, ref) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        ref={ref}
        className={cn(
          'decoration-current decoration-1 underline-offset-4 opacity-90 ' +
            'hover:decoration-[1.5px] hover:opacity-100 ' +
            'focus-visible:underline focus-visible:decoration-[1.5px] focus-visible:opacity-100',
          underline === 'always' && 'underline',
          // tighten hover underline styles for better UX
          underline === 'hover' &&
            'no-underline hover:underline hover:underline-offset-3 focus-visible:underline-offset-3',
          underline === 'none' && 'no-underline',
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
