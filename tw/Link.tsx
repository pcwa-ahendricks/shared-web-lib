import {mergeProps} from '@base-ui/react/merge-props'
import {useRender} from '@base-ui/react/use-render'
import {cn} from '../_classnames'

type LinkProps = useRender.ComponentProps<'a'> & {
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
 * For Next.js client-side navigation, use `render` with `next/link`
 * to avoid nested anchors and keep styling centralized:
 *
 * ```tsx
 * import NextLink from 'next/link'
 * import Link from '@/share/tw/Link'
 *
 * <Link render={<NextLink href="/purpose-and-powers" />} underline="hover">
 *   Purpose & Powers
 * </Link>
 * ```
 *
 * - `Link` controls styling
 * - `NextLink` controls routing
 *
 * Use `className` to extend or override styles.
 */
function Link({underline = 'always', className, render, ...props}: LinkProps) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn(
          'decoration-faint decoration-1 underline-offset-4 opacity-90 ' +
            'transition-colors hover:decoration-[1.5px] hover:opacity-100 ' +
            'focus-visible:underline focus-visible:decoration-[1.5px] focus-visible:opacity-100',
          underline === 'always' && 'underline',
          underline === 'hover' &&
            'no-underline hover:underline hover:underline-offset-3 focus-visible:underline-offset-3',
          underline === 'none' && 'no-underline',
          className
        ),
      },
      props
    ),
    render,
  })
}

const A = Link

export {A, Link as default}
export type {LinkProps}
