import {useState, useCallback} from 'react'

const storageKey = (key: string) => `aoi:${key}`

/**
 * useAnimateOnce
 *
 * Tracks whether an animation has already been played, persisting the state in
 * sessionStorage so it survives Next.js client-side navigation within the same
 * browser session. When no `animateKey` is provided the hook is effectively a no-op
 * and `alreadySeen` is always `false`.
 *
 * @param animateKey - A stable, page-unique string key. Must be consistent across
 *   renders and navigations — do not generate dynamically (e.g. with nanoid).
 *
 * @returns
 * - `alreadySeen` — `true` if the animation has been marked as seen this session.
 *   Read once at mount; does not update reactively.
 * - `markSeen` — Call when the animation plays to write to sessionStorage.
 *
 * @example
 * const {alreadySeen, markSeen} = useAnimateOnce('hero-section')
 */
export function useAnimateOnce(animateKey?: string) {
  const [alreadySeen] = useState(() => {
    if (!animateKey) return false
    try {
      return sessionStorage.getItem(storageKey(animateKey)) === '1'
    } catch {
      return false
    }
  })

  const markSeen = useCallback(() => {
    if (!animateKey) return
    try {
      sessionStorage.setItem(storageKey(animateKey), '1')
    } catch {}
  }, [animateKey])

  return {alreadySeen, markSeen}
}
