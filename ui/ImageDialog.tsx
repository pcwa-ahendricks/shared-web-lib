'use client'

import {type ReactNode, useCallback, useRef, useState} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog'
import {Button} from '../../components/ui/button'
import {ButtonGroup} from '../../components/ui/button-group'
import {cn} from '../../lib/utils'
import {IconDownload, IconX} from '@tabler/icons-react'

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

  /** Close the dialog when the image is double-clicked / double-tapped. */
  closeOnDoubleTap?: boolean

  /** Show a small toolbar with icon buttons (e.g., download, close). */
  showToolbar?: boolean

  /** Optional explicit URL to use for downloading the image. */
  downloadHref?: string

  /** Optional filename to suggest when downloading the image. */
  downloadFilename?: string
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
 * - Uses `size` presets to control DialogContent width (and removes shadcn's default max-width via `max-w-none`).
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
  size = 'base',
  closeOnDoubleTap = false,
  showToolbar = false,
  downloadHref = undefined,
  downloadFilename = undefined
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

  const handleDownload = useCallback(() => {
    const source = downloadHref ?? getImgSrc()

    if (!source) return

    const u = new URL(source, window.location.href)

    // Detect Imgix URLs (e.g. *.imgix.net)
    const isImgix = u.hostname.endsWith('imgix.net')

    if (isImgix) {
      // Strip Imgix transforms
      u.search = ''

      // Suggest filename
      const filename =
        downloadFilename ??
        decodeURIComponent(u.pathname.split('/').pop() || 'image')

      // Imgix-specific download query param
      u.searchParams.set('dl', filename)

      // Navigate to trigger download (Imgix will force attachment via headers)
      window.location.href = u.toString()
      return
    }

    // Non-Imgix: fall back to opening the image in a new tab.
    // (Some browsers ignore the `download` attribute for cross-origin URLs.)
    if (downloadFilename) {
      const a = document.createElement('a')
      a.href = source
      a.download = downloadFilename
      a.rel = 'noreferrer'
      document.body.appendChild(a)
      a.click()
      a.remove()
    } else {
      window.open(source, '_blank', 'noopener,noreferrer')
    }

    function getImgSrc() {
      const img = imageContainerRef.current?.querySelector(
        'img'
      ) as HTMLImageElement | null
      return img?.currentSrc || img?.getAttribute('src') || null
    }
  }, [downloadHref, downloadFilename])

  return (
    <Dialog open={effectiveOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className={cn(
          'border-none bg-transparent shadow-none ring-0 outline-none p-0',
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

            const target = e.target as Node

            /*
            Close dialog when the user clicks anywhere in the dialog body that is NOT the image container. This can be tested by making the browser
            window short and tall clicking to the left or right of the image.
            */
            if (!imageEl.contains(target)) {
              handleOpenChange(false)
            }
          }}
        >
          <div
            ref={imageContainerRef}
            onDoubleClick={() => {
              if (closeOnDoubleTap) handleOpenChange(false)
            }}
            className={cn(
              'relative group select-none',
              '[&>img]:mx-auto [&>img]:max-h-[94dvh] [&>img]:w-auto [&>img]:max-w-full [&>img]:object-contain',
              showToolbar && 'cursor-default',
              closeOnDoubleTap && !showToolbar && 'cursor-pointer',
              size === 'fit' && '[&>img]:max-h-[100dvh]'
            )}
          >
            {showToolbar && (
              <div
                className={cn(
                  'pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 group-hover:pointer-events-auto',
                  'rounded-lg shadow-xl ring-1 ring-foreground/10', // Emphasize toolbar visibility (rounded-* should match button styles)
                  'opacity-100 motion-reduce:opacity-100', // Base state
                  // Using tw-animate-css for hover animations (I don't think this works with clear base state of opacity-0 above)
                  // 'motion-safe:group-hover:animate-in motion-safe:group-hover:fade-in motion-safe:group-hover:fill-mode-both motion-safe:group-hover:duration-200 motion-safe:group-hover:ease-out',
                  // 'motion-safe:group-[&:not(:hover)]:animate-out motion-safe:group-[&:not(:hover)]:fade-out motion-safe:group-[&:not(:hover)]:fill-mode-both motion-safe:group-[&:not(:hover)]:ease-out motion-safe:group-[&:not(:hover)]:duration-120'
                  'motion-safe:group-hover:animate-mista-fade-in motion-safe:group-[&:not(:hover)]:animate-mista-fade-out', // Use animista presets
                  'motion-safe:group-hover:duration-200 motion-safe:group-[&:not(:hover)]:duration-150' // Override animation durations using tw-animate-css utilities
                )}
              >
                <ButtonGroup aria-label="Media controls">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      aria-label="Close image dialog"
                    >
                      <IconX /> Close
                    </Button>
                  </DialogClose>
                  <Button
                    variant="outline"
                    size="lg"
                    aria-label="Download image"
                    onClick={handleDownload}
                  >
                    <IconDownload /> Download
                  </Button>
                </ButtonGroup>
              </div>
            )}

            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
