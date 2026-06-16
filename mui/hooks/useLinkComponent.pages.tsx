import Link, {LinkProps} from '../components/Link.pages'
import {forwardRef, useMemo, useRef} from 'react'

export default function useLinkComponent(
  props?: Partial<Omit<LinkProps, 'ref'>>
) {
  const {noLinkStyle = true, ...rest} = props || {}

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
