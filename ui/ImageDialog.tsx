import {type ReactNode} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog'
import {cn} from '../../lib/utils'

export type ImageDialogSize = 'sm' | 'base' | 'lg' | 'xl'

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

  /** If true, uses a padding-free content container (useful for edge-to-edge images). */
  flush?: boolean

  /** Control dialog open state (optional). */
  open?: boolean

  /** Handler for controlled open state (optional). */
  onOpenChange?: (open: boolean) => void

  /** Preset dialog width. Defaults to 'base'. */
  size?: ImageDialogSize
}

export const sizeClasses: Record<ImageDialogSize, string> = {
  sm: 'w-[min(92vw,720px)]',
  base: 'w-[min(92vw,900px)]',
  lg: 'w-[min(96vw,1200px)]',
  xl: 'w-[min(96vw,1600px)]'
}

/**
 * ImageDialog
 *
 * A shadcn/ui (Radix) dialog wrapper for image/lightbox-style previews.
 * - Accepts any trigger via `trigger` (uses `asChild`).
 * - Renders an accessible title (hidden if not provided).
 * - By default, constrains width but allows tall content to scroll.
 */
export default function ImageDialog({
  trigger,
  title,
  description,
  children,
  contentClassName,
  bodyClassName,
  flush = true,
  open,
  onOpenChange
  // size = 'base'
}: ImageDialogProps) {
  const resolvedTitle = title ?? 'Image preview'
  const resolvedDescription = description ?? resolvedTitle

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn(
          '!pointer-events-none border-none bg-transparent !rounded-none max-w-[100vw] sm:max-w-[96vw] [&>button]:hidden',
          // sizeClasses[size],
          flush ? 'p-0' : 'p-6',
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
        >
          <div className={cn('pointer-events-auto')}>{children}</div>
        </div>

        {/* If you ever want an explicit close control in the body, you can render one via children,
            or wrap an element with <DialogClose asChild> */}
        <DialogClose className="sr-only">Close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}
