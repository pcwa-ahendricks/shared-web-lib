import Link, {LinkProps} from '../components/Link'
import {forwardRef, useMemo, useRef} from 'react'

/**
 * A custom hook that returns a memoized `Link` component with default and custom props.
 *
 * This hook creates a `Link` component with the `noLinkStyle` prop defaulting to `true`,
 * while allowing the rest of the `LinkProps` to be customized or overridden.
 * The resulting `LinkComponent` is memoized to avoid unnecessary re-renders.
 *
 * @param {Partial<LinkProps>} [props] - Optional custom props to pass to the `Link` component.
 * @returns {React.ComponentType<Omit<LinkProps, 'ref'>>} The memoized `LinkComponent` with the specified props.
 *
 * @example
 * const LinkComponent = useLinkComponent({ noLinkStyle: false });
 *
 * return (
 *   <Button LinkComponent={LinkComponent} href="/some/route/or/ext/link">
 * );
 */
export default function useLinkComponent(
  props?: Partial<Omit<LinkProps, 'ref'>>
) {
  // default noLinkStyle prop to true
  const {noLinkStyle = true, ...rest} = props || {}

  // Use a ref to hold the latest `rest` so the memoized component always reads
  // the current value without needing to recreate on every render. Without this,
  // destructuring `rest` from `props` creates a new object reference each call,
  // causing useMemo to always invalidate and return a new component type — which
  // in MUI v9 Tabs triggers infinite indicator recalculation loops.
  const restRef = useRef(rest)
  restRef.current = rest

  const LinkComponent = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<LinkProps, 'ref'>>(
        function LinkComponent(forwardRefProps: Omit<LinkProps, 'ref'>, ref) {
          return (
            <Link
              noLinkStyle={noLinkStyle}
              ref={ref}
              {...restRef.current}
              {...forwardRefProps}
            />
          )
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [noLinkStyle]
  )

  return LinkComponent
}
