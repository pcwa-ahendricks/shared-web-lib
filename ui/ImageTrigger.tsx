'use client'

import {forwardRef, type ComponentPropsWithoutRef, type ReactNode} from 'react'
import {cn} from '../_classnames'

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
   * Icon revealed at center on hover/focus, typically a magnifier to suggest
   * "click to enlarge". Required: this library ships no icons of its own, so the
   * app supplies one from whichever library it uses.
   *
   * Pass `null` for no icon — the zoom cursor and scrim still signal the
   * affordance. Supply your own size and color (e.g.
   * `<SearchIcon className="h-8 w-8 text-white/92" />`); the hover/focus reveal
   * is applied by the wrapper.
   */
  icon: ReactNode
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'>

const ImageTrigger = forwardRef<HTMLButtonElement, ImageTriggerProps>(
  (
    {
      children,
      className,
      thumbClassName,
      zoomCursor = true,
      scrim = 'normal',
      icon,
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
            'transition-shadow duration-300 group-hover:shadow-lg group-focus-visible:shadow-lg',
            thumbClassName
          )}
        >
          <div className="overflow-hidden">
            <div className="relative">
            <div className="transition-transform duration-300 ease-in-out group-hover:scale-105 group-focus-visible:scale-105">
              {children}
            </div>

            {scrim !== 'none' ? (
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 z-10 bg-black/0 transition-colors duration-150',
                  scrimClass
                )}
              />
            ) : null}

            {icon ? (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                {/* The hover/focus reveal lives on this wrapper so the app's
                    icon only has to supply its own size and color. `aria-hidden`
                    is here rather than on the icon because the icon comes from
                    the app: this guarantees it stays decorative regardless of
                    whether the app's icon library sets the attribute itself. */}
                <span
                  aria-hidden="true"
                  className="opacity-0 transition-opacity duration-350 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {icon}
                </span>
              </div>
            ) : null}
            </div>
          </div>
        </div>
      </button>
    )
  }
)

ImageTrigger.displayName = 'ImageTrigger'

export default ImageTrigger
