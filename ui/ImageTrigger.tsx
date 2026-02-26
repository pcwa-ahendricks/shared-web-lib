'use client'

import {forwardRef, type ComponentPropsWithoutRef, type ReactNode} from 'react'
import {cn} from '../../lib/utils'
import {IconSearch} from '@tabler/icons-react'

export type ImageTriggerProps = {
  /**
   * Content to render inside the trigger, typically a Next.js <Image />.
   * This should generally fill the available width (e.g. `className="w-full h-auto"`).
   */
  children: ReactNode

  /**
   * Optional wrapper class for the <button>.
   * The trigger always includes `group` so hover/focus styles work.
   */
  className?: string

  /**
   * Optional wrapper class for the “thumbnail” container (controls clipping, rounding, shadow).
   */
  thumbClassName?: string

  /**
   * If true, uses a zoom-in cursor to suggest “click to enlarge”.
   * Defaults to true.
   */
  zoomCursor?: boolean

  /**
   * Controls the hover/focus scrim strength.
   * - "subtle": bg-black/15
   * - "normal" (default): bg-black/25
   * - "none": no scrim
   */
  scrim?: 'subtle' | 'normal' | 'none'

  /**
   * If true (default), shows a centered search icon on hover/focus.
   */
  showIcon?: boolean

  /**
   * Optional override for the icon element. Use this if you want a different icon.
   * If omitted, a Tabler IconSearch is used.
   */
  icon?: ReactNode

  /**
   * Optional icon className (size/color). Only used for the default icon.
   */
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
          'group block w-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
          zoomCursor && 'cursor-zoom-in',
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
