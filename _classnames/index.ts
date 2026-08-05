import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

/**
 * Tailwind-aware class merger.
 *
 * This is its own tier rather than part of `_core` because `tailwind-merge`
 * couples it to Tailwind, and `_core` is meant to be safe in any app. It is also
 * not part of `tw` so that `ui` and `slate` can use it without inheriting
 * `tw`'s Base UI dependency.
 *
 * Intentionally identical to shadcn's `cn` in a consuming app's `@/lib/utils`.
 * The duplication is deliberate, for two reasons. Pointing this at the app's
 * copy would make every tier that merges classes shadcn-only, breaking `tw` for
 * plain-Tailwind apps. And that file is generated — the shadcn CLI rewrites it
 * with `add -o` — so it can neither be the shared source of truth nor carry a
 * note like this one.
 *
 * shadcn's `cn` is a scaffolded snippet, not a versioned dependency, so there is
 * no upstream to track. The only real drift risk is local: if an app ever needs
 * `extendTailwindMerge` — custom class groups for a non-default spacing or color
 * scale — mirror it here too, or shared components will merge classes
 * differently than app components.
 */
// eslint-disable-next-line tailwindcss/no-custom-classname -- false positive: the plugin inspects clsx() args and misreads the `inputs` identifier as a classname
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
