// See https://github.com/zeit/next.js/blob/master/examples/with-data-prefetch/components/link.js for original component.
import Link, {LinkProps} from 'next/link'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {format, resolve, parse} from 'url'

export type PrefetchDataLinkProps = {
  withData?: boolean
} & LinkProps

export const componentPrefetch = async (href: string) => {
  // if  we're running server side do nothing
  if (typeof window === 'undefined') {
    return
  }

  const url = typeof href !== 'string' ? format(href) : href

  const parsedHref = resolve(window.location.pathname, url)

  const {query, pathname} = typeof href !== 'string' ? href : parse(url, true)

  const Component: any = await Router.prefetch(parsedHref)

  // if Component exists and has getInitialProps
  // fetch the component props (the component should save it in cache)
  if (Component && Component.getInitialProps) {
    const ctx = {pathname, query, isVirtualCall: true}
    await Component.getInitialProps(ctx)
  }
}

// extend default next/link to customize the prefetch behavior
export default class PrefetchDataLink extends Link {
  // re defined Link propTypes to add `withData`
  static propTypes = {
    ...Link.propTypes,
    withData: PropTypes.bool // our custom prop
  }

  // our custom prefetch method
  async prefetch() {
    const {withData, href, prefetch} = this.props as PrefetchDataLinkProps // [HACK] I don't know how to append custom props to this class during declaration.

    // if the prefetch prop is not defined do nothing
    if (!prefetch) {
      return
    }

    // if withData prop is defined
    // prefetch with data
    // otherwise just prefetch the page
    let url: string
    if (typeof href === 'string') {
      url = href
    } else {
      url = href.href ?? ''
    }
    if (withData) {
      componentPrefetch(url)
    } else {
      super.prefetch()
    }
  }
}
