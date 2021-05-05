// cspell:ignore modernizr respimg microtask blurup

// // Add your polyfills
// // This files runs at the very beginning (even before React and Next.js core)
// console.log('Load your polyfills')

import '../lib/modernizr'

// https://github.com/vercel/next.js/pull/24569
const matchAll = require('string.prototype.matchall')
matchAll.shim()

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      var dataURL = this.toDataURL(type, quality).split(',')[1]
      setTimeout(function () {
        var binStr = atob(dataURL),
          len = binStr.length,
          arr = new Uint8Array(len)

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i)
        }

        callback(new Blob([arr], {type: type || 'image/png'}))
      })
    }
  })
}
