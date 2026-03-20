'use client'

import {forwardRef, type ComponentPropsWithoutRef, type ReactNode} from 'react'
import {IconSearch} from '@tabler/icons-react'

import {cn} from '../../lib/utils'

export type ImageTriggerProps = {
  children: ReactNode
  className?: string
  thumbClassName?: string
  zoomCursor?: boolean
  scrim?: 'subtle' | 'normal' | 'none'
  showIcon?: boolean
  icon?: ReactNode
  iconClassName?: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'>

const ImageTrigger = forwardRef<HTMLButtonElement, ImageTriggerProps>(
  (
    {
      children,
      className,
      thumbClassName,
      zoomCursor = true,
      scrim = 'normal',
      showIcon = true,
      icon,
      iconClassName = 'h-12 w-12 text-white/95',
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const scrimClass =
      scrim === 'none'
        ? ''
        : scrim === 'subtle'
          ? 'group-hover:bg-black/15 group-focus-visible:bg-black/15'
          : 'group-hover:bg-black/25 group-focus-visible:bg-black/25'

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'group block w-full cursor-zoom-in outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
          !zoomCursor && 'cursor-default',
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            'overflow-hidden transition-shadow group-hover:shadow-md group-focus-visible:shadow-md',
            thumbClassName
          )}
        >
          <div className="relative">
            {children}

            {scrim !== 'none' ? (
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 z-10 bg-black/0 transition-colors duration-150',
                  scrimClass
                )}
              />
            ) : null}

            {showIcon ? (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                {icon ?? (
                  <IconSearch
                    aria-hidden="true"
                    className={cn(
                      'opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100',
                      iconClassName
                    )}
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </button>
    )
  }
)

ImageTrigger.displayName = 'ImageTrigger'

export default ImageTrigger
