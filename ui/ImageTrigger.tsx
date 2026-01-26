'use client'

import {type ComponentPropsWithoutRef, type ReactNode} from 'react'
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

/**
 * ImageTrigger
 *
 * A reusable “fancy image trigger” wrapper that provides the same UX pattern you used
 * on the Home page map thumbnail:
 *
 * - clickable button wrapper
 * - `group` hover/focus-visible affordances
 * - subtle shadow on hover/focus
 * - optional dark scrim overlay
 * - optional centered icon overlay
 *
 * Designed to wrap a Next.js <Image /> (or any media) as `children`.
 *
 * Accessibility:
 * This component renders a <button>. You should provide either:
 * - aria-label, or
 * - visible text within `children`
 *
 * Example:
 * ```tsx
 * <ImageTrigger aria-label="Open Middle Fork American River Recreation Map" onClick={openDialog}>
 *   <Image
 *     loader={imgixUrlLoader}
 *     width={2016}
 *     height={1296}
 *     alt="Middle Fork American River Recreation Map"
 *     src="https://…"
 *     sizes={`(max-width: ${bp.sm}px) 100vw, 65vw`}
 *     className="block h-auto w-full"
 *   />
 * </ImageTrigger>
 * ```
 */
export default function ImageTrigger({
  children,
  className,
  thumbClassName,
  zoomCursor = true,
  scrim = 'normal',
  showIcon = true,
  icon,
  iconClassName = 'h-12 w-12 text-white/95',
  ...rest
}: ImageTriggerProps) {
  const scrimClass =
    scrim === 'none'
      ? ''
      : scrim === 'subtle'
        ? 'group-hover:bg-black/15 group-focus-visible:bg-black/15'
        : 'group-hover:bg-black/25 group-focus-visible:bg-black/25'

  return (
    <button
      type="button"
      className={cn(
        'group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
