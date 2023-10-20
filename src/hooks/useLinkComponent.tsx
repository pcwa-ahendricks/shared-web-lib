import Link, {LinkProps} from '@components/Link'
import {forwardRef, useMemo} from 'react'

const useLinkComponent = (props?: Partial<LinkProps>) => {
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

export default useLinkComponent
