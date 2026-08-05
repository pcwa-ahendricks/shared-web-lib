# Shared Web Lib

Shared web libraries used on various websites. Consumed as a **git submodule of
source files**, not as an installed package — apps mount it at `src/share` and
their own bundler compiles it.

That has one consequence worth understanding before adding anything here: since
nothing installs this package, the `dependencies` in its `package.json` are never
resolved for a consumer. Every npm package a file here imports must be present in
the **consuming app's** `package.json`. `tiers.json` records that requirement so
it can be checked instead of remembered.

## Tiers

Each top-level directory is a tier. Apps opt into the ones they use and exclude
the rest from their `tsconfig.json`, so an MUI app never type-checks the Tailwind
tiers and vice versa. The `_` prefix is cosmetic — it sorts the foundational tiers
to the top of a file listing and carries no enforced meaning.

| Tier               | Purpose                                                       |
| ------------------ | ------------------------------------------------------------- |
| `_core`            | Framework-free utilities. No dependencies at all.             |
| `_classnames`      | Tailwind class merger (`cn`).                                 |
| `hooks`            | React hooks.                                                  |
| `next`             | Next.js helpers, chiefly imgix image loaders.                 |
| `date-fns`         | Date and timezone helpers.                                    |
| `tw`               | Tailwind / Base UI primitives and stylesheets.                |
| `ui`               | shadcn-based components. See note below.                      |
| `mui`, `mui-pages` | MUI components. App Router and Pages Router variants.         |
| `slate`            | Slate rich-text editor. Pulls MUI in via its toolbar.         |
| `aws`              | S3 helpers. Reads AWS credentials from env — server-side use. |
| `types`            | Ambient declarations.                                         |

**`tiers.json` is the source of truth** for what each tier needs — npm packages,
other tiers, and shadcn components. The lists live there rather than in this table
so there is only one place to keep current. Apps validate themselves against it
with `check-share-tiers.mjs`; see the consuming app's `check-share` script.

`ui` is the one tier that reaches _upward_ into the consuming app, importing its
`src/components/ui/*` shadcn copies. That is deliberate — shadcn components are
meant to be owned and edited per-app, so vendoring a frozen copy here would fight
the model. It does mean `ui` only works in a shadcn app, which `tiers.json`
records as that tier's `shadcn` requirement.

## Where `cn` lives

Import it from `_classnames`:

```ts
import {cn} from '../_classnames'
```

Consuming apps also have their own `cn`, installed by shadcn at
`src/lib/utils.ts`. **Both exist on purpose and neither should import the other.**

- Shared components can't use the app's copy. It would make every tier that merges
  classes shadcn-only — breaking `tw` for plain-Tailwind apps and `slate` for MUI
  apps — and that file is generated, rewritten by `shadcn add -o`.
- The app's copy can't be replaced by this one without taking ownership of a file
  the shadcn CLI expects to manage.

The duplication is three identical lines of a scaffolded snippet, not a versioned
dependency, so there is no upstream to track. The one real drift risk is local: if
an app ever needs `extendTailwindMerge` — custom class groups for a non-default
spacing or color scale — mirror it in `_classnames/index.ts` too, or shared components
will merge classes differently than app components.

## Icons

No tier imports an icon library, and none ships icons of its own. Components that
show an icon take it as a prop, so each app supplies one from whichever library it
already uses:

```tsx
import {SearchIcon, XIcon, DownloadIcon} from 'lucide-react'

<ImageDialog
  showToolbar
  closeIcon={<XIcon />}
  downloadIcon={<DownloadIcon />}
  trigger={
    <ImageTrigger icon={<SearchIcon className="h-8 w-8 text-white/92" />}>
      ...
    </ImageTrigger>
  }
>
```

Consuming apps are split between Lucide and Tabler, so importing either here would
force every app to install it, and maintaining a third set of hand-rolled defaults
would mean owning icons this library has no business owning.

`ImageTrigger`'s `icon` is **required** — pass `null` for none. It is required
rather than optional so that adopting this changes nothing silently: a call site
that used to get a default icon now fails to compile instead of quietly losing it.
Supply size and color yourself; the component only applies the hover/focus reveal.

`ImageDialog`'s `closeIcon` and `downloadIcon` are optional, because those toolbar
buttons are labelled "Close" and "Download" — omitting the icons leaves usable
text-only buttons rather than blank ones.

An app using these in more than one place should bind its icons once in a thin
wrapper and import from that, instead of repeating them at every call site.

## Adding to a tier

1. Add the npm package to `tiers.json` under that tier's `deps`, and any new
   cross-tier import under `requires`.
2. Add it to the consuming app's `package.json` — nothing installs it from here.
3. Run the app's `check-share` to confirm the contract still holds.

Don't introduce a cross-tier import that drags a UI library somewhere it doesn't
belong — `_core` and `hooks` must never reach into `mui`, `tw`, or `ui`.
