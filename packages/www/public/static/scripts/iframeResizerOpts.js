// See https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/iframed_page/options.md for more info.
// www.pcwa.net is the only site that should be mimicking dev-web page.
// 'bodyScroll' is the only method that worked correctly when testing.
window.iFrameResizer = {
  targetOrigin: 'https://www.pcwa.net',
  heightCalculationMethod: 'bodyScroll'
}
