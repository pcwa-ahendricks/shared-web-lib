'use client'

import {useCallback, useRef, useState} from 'react'
import {useIsomorphicLayoutEffect} from 'usehooks-ts'

/**
 * Sources that have finished loading during this page session.
 *
 * Module scope on purpose. A client-side navigation mounts a brand new <img>,
 * and the browser's cache lookup is asynchronous, so `complete` is still false
 * when a layout effect runs even for an image it has cached. Without this,
 * returning to a page replays the placeholder fade on images that are already
 * in memory. Reset naturally on full page load, which is also when `complete`
 * starts working — the two cover each other.
 *
 * Safe to read during render: it is empty when the module first evaluates, so
 * server and client agree on the initial hydration pass, and client-side
 * navigations render on the client only.
 */
const loadedSources = new Set<string>()

/**
 * Tracks whether a next/image has loaded, for driving a placeholder.
 *
 * `instant` is the point of this hook. Load state starts `false` on every
 * mount, so without help a cached image still renders its placeholder for a
 * frame and then transitions it away — a blur on an image that was never
 * missing. next/image dodges this for its own `placeholder="blur"` by swapping
 * with no transition at all; A has a fade, which makes the gap visible.
 *
 * Two mechanisms, covering the two ways a page is reached:
 * - full reload: the image is already `complete` before first paint, caught in
 *   a layout effect so the placeholder clears before anything is shown
 * - client-side navigation: `complete` is false on a fresh <img>, so the
 *   session record above is consulted during render instead
 *
 * Usage:
 *   const {ref, loaded, instant, onLoad} = useImageLoaded(src)
 *   <ImagePlaceholder src={src} loaded={loaded} instant={instant} />
 *   <Image ref={ref} onLoad={onLoad} ... />
 */
export default function useImageLoaded(src?: string) {
  const seen = typeof src === 'string' && loadedSources.has(src)
  const ref = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(seen)
  const [instant, setInstant] = useState(seen)

  useIsomorphicLayoutEffect(() => {
    if (ref.current?.complete) {
      setInstant(true)
      setLoaded(true)
    }
  }, [])

  const onLoad = useCallback(() => {
    if (typeof src === 'string') {
      loadedSources.add(src)
    }
    setLoaded(true)
  }, [src])

  return {ref, loaded, instant, onLoad}
}
