import {forwardRef} from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cn} from './utils'

/**
 * Props for the Link component.
 * Extends standard HTML <a> attributes and allows Tailwind class overrides.
 */
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean
}

/**
 * Link
 *
 * A lightweight, Tailwind-native link with accessible defaults.
 *
 * By default, renders a styled `<a>` element.
 *
 * For Next.js client-side navigation, use `asChild` with `next/link`
 * to avoid nested anchors and keep styling centralized:
 *
 * ```tsx
 * import NextLink from 'next/link'
 * import Link from '@/share/tw/Link'
 *
 * <Link asChild>
 *   <NextLink href="/purpose-and-powers">
 *     Purpose & Powers
 *   </NextLink>
 * </Link>
 * ```
 *
 * - `Link` controls styling
 * - `NextLink` controls routing
 *
 * Use `className` to extend or override styles.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({asChild = false, className, ...props}, ref) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
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
