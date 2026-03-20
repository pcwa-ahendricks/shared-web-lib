import {forwardRef} from 'react'
import {Slot} from '@radix-ui/react-slot'

import {cn} from '../../lib/utils'

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean
  underline?: 'always' | 'hover' | 'none'
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({asChild = false, underline = 'always', className, ...props}, ref) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        ref={ref}
        className={cn(
          'decoration-current decoration-1 underline-offset-4 opacity-90 transition-colors hover:decoration-[1.5px] hover:opacity-100 focus-visible:underline focus-visible:decoration-[1.5px] focus-visible:opacity-100',
          underline === 'always' && 'underline',
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
