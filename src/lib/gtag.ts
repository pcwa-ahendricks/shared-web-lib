export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
const isDev = process.env.NODE_ENV === 'development'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  isDev && console.log('gtag config', url)
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}: any) => {
  isDev && console.log('gtag event', label)
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
