import {useState, useCallback} from 'react'

// Module-level set: resets on page reload, persists across Next.js client navigations.
// Never modified during SSR (markSeen only fires on client), so the server always
// starts empty — no hydration mismatch possible.
const seenKeys = new Set<string>()

/**
 * useAnimateOnce
 *
 * Tracks whether an animation has already played within the current JS session.
 * State resets on a full page reload (good — animations feel fresh) but survives
 * Next.js client-side navigations (good — no re-animation when the user navigates
 * away and back).
 *
 * When no `animateKey` is provided the hook is a no-op and `alreadySeen` is always `false`.
 *
 * @param animateKey - A stable, page-unique string key. Must be consistent across
 *   renders and navigations — do not generate dynamically (e.g. with nanoid).
 *
 * @returns
 * - `alreadySeen` — `true` if the animation has already played this session.
 * - `markSeen` — Call when the animation plays to record it.
 *
 * @example
 * const {alreadySeen, markSeen} = useAnimateOnce('hero-section')
 */
export function useAnimateOnce(animateKey?: string) {
  const [alreadySeen] = useState(() =>
    animateKey ? seenKeys.has(animateKey) : false
  )

  const markSeen = useCallback(() => {
    if (animateKey) seenKeys.add(animateKey)
  }, [animateKey])

  return {alreadySeen, markSeen}
}
