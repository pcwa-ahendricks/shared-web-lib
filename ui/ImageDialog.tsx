'use client'

import {type ReactNode, useCallback, useRef, useState} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog'
import {cn} from '../../lib/utils'

export type ImageDialogSize = 'sm' | 'base' | 'lg' | 'xl' | 'fit'

export type ImageDialogProps = {
  /**
   * Element that opens the dialog (thumbnail, button, etc.)
   *
   * Example:
   * <ImageDialog
   *   trigger={
   *     <button type="button">
   *       <img ... />
   *     </button>
   *   }
   * >
   *   <img ... />
   * </ImageDialog>
   */
  trigger: ReactNode

  /** Dialog title for accessibility. If omitted, a visually-hidden title is rendered. */
  title?: string

  /** Optional description text below the title. */
  description?: string

  /** Dialog body content (typically a large image). */
  children: ReactNode

  /** Optional className for DialogContent container. */
  contentClassName?: string

  /** Optional className for the body wrapper around children. */
  bodyClassName?: string

  /** Control dialog open state (optional). */
  open?: boolean

  /** Handler for controlled open state (optional). */
  onOpenChange?: (open: boolean) => void

  /** Preset dialog width. Defaults to 'base'. */
  size?: ImageDialogSize
}

const widthClasses: Record<ImageDialogSize, string> = {
  // IMPORTANT: These must be *static strings* so Tailwind can generate the
  // arbitrary-value utilities. If these are built from template strings at
  // runtime, Tailwind won't see them and the dialog falls back to `w-full`.
  //
  // The upstream DialogContent includes `w-full` and `sm:max-w-md`, so we
  // override BOTH width and max-width.
  sm: 'max-w-none sm:max-w-none w-[min(96vw,720px)] sm:w-[min(94vw,720px)] md:w-[min(92vw,720px)]',
  base: 'max-w-none sm:max-w-none w-[min(96vw,900px)] sm:w-[min(94vw,900px)] md:w-[min(92vw,900px)]',
  lg: 'max-w-none sm:max-w-none w-[min(96vw,1200px)] sm:w-[min(94vw,1200px)] md:w-[min(92vw,1200px)]',
  xl: 'max-w-none sm:max-w-none w-[min(96vw,1600px)] sm:w-[min(94vw,1600px)] md:w-[min(92vw,1600px)]',
  fit: 'max-w-none sm:max-w-none w-[100vw]'
}

/**
 * ImageDialog
 *
 * A shadcn/ui (Radix) dialog wrapper for image/lightbox-style previews.
 *
 * Key behaviors:
 * - Accepts any trigger via `trigger` (uses `asChild`).
 * - Renders an accessible title/description (visually hidden if not provided).
 * - Uses `size` presets to control DialogContent width (and removes shadcn's default max-width via `!max-w-none`).
 * - Default click-outside-to-close: clicking outside the image closes the dialog.
 *   (We keep the image area pointer-interactive while allowing the rest of the content area to act like an overlay.)
 */
export default function ImageDialog({
  trigger,
  title,
  description,
  children,
  contentClassName,
  bodyClassName,
  open,
  onOpenChange,
  size = 'base'
}: ImageDialogProps) {
  const isControlled = open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const effectiveOpen = isControlled ? open : uncontrolledOpen

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const imageContainerRef = useRef<HTMLDivElement | null>(null)

  const resolvedTitle = title ?? 'Image preview'
  const resolvedDescription = description ?? resolvedTitle

  return (
    <Dialog open={effectiveOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogOverlay className="bg-black/65" />

      <DialogContent
        className={cn(
          'border-none bg-transparent [&>button]:hidden shadow-none ring-0 outline-none p-0',
          widthClasses[size],
          contentClassName
        )}
      >
        {/* Keep a title and description for screen readers even when you don’t want visible chrome */}
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">{resolvedTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            {resolvedDescription}
          </DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            'flex h-full w-full justify-center overflow-auto',
            bodyClassName
          )}
          onPointerDown={(e) => {
            const imageEl = imageContainerRef.current
            if (!imageEl) return
            // Close when the user clicks anywhere in the dialog body that is NOT the image container.
            if (!imageEl.contains(e.target as Node)) {
              handleOpenChange(false)
            }
          }}
        >
          <div
            ref={imageContainerRef}
            className={cn(
              '[&>img]:mx-auto [&>img]:max-h-[94dvh] [&>img]:w-auto [&>img]:max-w-full [&>img]:object-contain',
              size === 'fit' && '[&>img]:max-h-[100dvh]'
            )}
          >
            {children}
          </div>
        </div>

        {/* If you ever want an explicit close control in the body, you can render one via children,
            or wrap an element with <DialogClose asChild> */}
        <DialogClose className="sr-only">Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
