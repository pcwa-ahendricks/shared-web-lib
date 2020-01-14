// See https://github.com/zeit/next.js/blob/master/examples/with-data-prefetch/components/link.js for original component.
import Link, {LinkProps} from 'next/link'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {format, resolve, parse} from 'url'

export type PrefetchDataLinkProps = {
  withData?: boolean
} & LinkProps

export const prefetch = async (href: string) => {
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
export default class LinkWithData extends Link {
  // re defined Link propTypes to add `withData`
  static propTypes = {
    ...Link.propTypes,
    withData: PropTypes.bool // our custom prop
  }

  // our custom prefetch method
  async prefetch() {
    // if the prefetch prop is not defined do nothing
    if (!this.props.prefetch) {
      return
    }
    const {withData} = this.props as PrefetchDataLinkProps // [HACK] I don't know how to append custom props to this class during declaration.

    // if withData prop is defined
    // prefetch with data
    // otherwise just prefetch the page
    let url: string
    if (typeof this.props.href === 'string') {
      url = this.props.href
    } else {
      url = this.props.href.href ?? ''
    }
    if (withData) {
      prefetch(url)
    } else {
      super.prefetch()
    }
  }
}
