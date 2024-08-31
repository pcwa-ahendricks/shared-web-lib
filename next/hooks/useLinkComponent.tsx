import Link, {LinkProps} from '../components/Link'
import {forwardRef, useMemo} from 'react'

/**
 * A custom hook that returns a memoized `Link` component with default and custom props.
 *
 * This hook creates a `Link` component with the `noLinkStyle` prop defaulting to `true`,
 * while allowing the rest of the `LinkProps` to be customized or overridden.
 * The resulting `LinkComponent` is memoized to avoid unnecessary re-renders.
 *
 * @param {Partial<LinkProps>} [props] - Optional custom props to pass to the `Link` component.
 * @returns {React.ComponentType<LinkProps>} The memoized `LinkComponent` with the specified props.
 *
 * @example
 * const LinkComponent = useLinkComponent({ noLinkStyle: false });
 *
 * return (
 *   <Button LinkComponent={LinkComponent} href="/some/route/or/ext/link">
 * );
 */
export default function useLinkComponent(props?: Partial<LinkProps>) {
  // default noLinkStyle prop to true
  const {noLinkStyle = true, ...rest} = props || {}
  const LinkComponent = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, LinkProps>(function LinkComponent(
        forwardRefProps: LinkProps,
        ref
      ) {
        return (
          <Link
            noLinkStyle={noLinkStyle}
            ref={ref}
            {...rest}
            {...forwardRefProps}
          />
        )
      }),
    [rest, noLinkStyle]
  )

  return LinkComponent
}
