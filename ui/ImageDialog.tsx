'use client'

import {type ReactNode, useCallback, useRef, useState} from 'react'
import {IconDownload, IconX} from '@tabler/icons-react'

import {Button} from '../../components/ui/button'
import {ButtonGroup} from '../../components/ui/button-group'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog'
import {cn} from '../../lib/utils'

export type ImageDialogSize = 'sm' | 'base' | 'lg' | 'xl' | 'fit'

export type ImageDialogProps = {
  trigger: ReactNode
  title?: string
  description?: string
  children: ReactNode
  contentClassName?: string
  bodyClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  size?: ImageDialogSize
  closeOnDoubleTap?: boolean
  showToolbar?: boolean
  downloadHref?: string
  downloadFilename?: string
}

const widthClasses: Record<ImageDialogSize, string> = {
  sm: 'max-w-none w-[min(96vw,720px)] sm:max-w-none sm:w-[min(94vw,720px)] md:w-[min(92vw,720px)]',
  base: 'max-w-none w-[min(96vw,900px)] sm:max-w-none sm:w-[min(94vw,900px)] md:w-[min(92vw,900px)]',
  lg: 'max-w-none w-[min(96vw,1200px)] sm:max-w-none sm:w-[min(94vw,1200px)] md:w-[min(92vw,1200px)]',
  xl: 'max-w-none w-[min(96vw,1600px)] sm:max-w-none sm:w-[min(94vw,1600px)] md:w-[min(92vw,1600px)]',
  fit: 'max-w-none w-[100vw] sm:max-w-none'
}

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

    const url = new URL(source, window.location.href)
    const isImgix = url.hostname.endsWith('imgix.net')

    if (isImgix) {
      url.search = ''
      const filename =
        downloadFilename ??
        decodeURIComponent(url.pathname.split('/').pop() || 'image')
      url.searchParams.set('dl', filename)
      window.location.href = url.toString()
      return
    }

    if (downloadFilename) {
      const anchor = document.createElement('a')
      anchor.href = source
      anchor.download = downloadFilename
      anchor.rel = 'noreferrer'
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
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
          'border-none bg-transparent p-0 shadow-none ring-0 outline-none',
          widthClasses[size],
          contentClassName
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">{resolvedTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            {resolvedDescription}
          </DialogDescription>
        </DialogHeader>

        {showToolbar && (
          <DialogPortal>
            <div className="pointer-events-none fixed right-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] left-0 z-50 flex justify-center bg-transparent px-4">
              <div className="border-border bg-popover/90 pointer-events-auto rounded-lg border shadow-xl backdrop-blur">
                <ButtonGroup aria-label="Media controls">
                  <DialogClose asChild>
                    <Button aria-label="Close image dialog" size="sm" variant="outline">
                      <IconX /> Close
                    </Button>
                  </DialogClose>
                  <Button
                    aria-label="Download image"
                    onClick={handleDownload}
                    size="sm"
                    variant="outline"
                  >
                    <IconDownload /> Download
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </DialogPortal>
        )}

        <div
          className={cn('flex h-full w-full justify-center overflow-auto', bodyClassName)}
          onPointerDown={(e) => {
            const imageEl = imageContainerRef.current
            if (!imageEl) return
            const target = e.target as Node
            if (!imageEl.contains(target)) {
              handleOpenChange(false)
            }
          }}
        >
          <div
            ref={imageContainerRef}
            className={cn(
              'group relative select-none [&>img]:mx-auto [&>img]:max-h-[94dvh] [&>img]:max-w-full [&>img]:w-auto [&>img]:object-contain',
              showToolbar && 'cursor-default',
              closeOnDoubleTap && !showToolbar && 'cursor-pointer',
              size === 'fit' && '[&>img]:max-h-[100dvh]'
            )}
            onDoubleClick={() => {
              if (closeOnDoubleTap) handleOpenChange(false)
            }}
          >
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
