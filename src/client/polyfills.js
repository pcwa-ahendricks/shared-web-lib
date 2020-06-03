// cspell:ignore modernizr respimg microtask blurup

// // Add your polyfills
// // This files runs at the very beginning (even before React and Next.js core)
// console.log('Load your polyfills')

import '../lib/modernizr'

import lazysizes from 'lazysizes'
// respimg polyfill is needed for IE11. See https://github.com/aFarkas/lazysizes/blob/gh-pages/README.md#responsive-image-support-picture-andor-srcset for more info.
import 'lazysizes/plugins/respimg/ls.respimg'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import 'lazysizes/plugins/object-fit/ls.object-fit'
import 'lazysizes/plugins/blur-up/ls.blur-up'
import 'lazysizes/plugins/optimumx/ls.optimumx'
// See https://github.com/aFarkas/lazysizes/issues/344
lazysizes.cfg.blurupMode = 'auto' // default is 'always'

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
