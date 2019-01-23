// @flow
function debounce(fn: () => void, delay: number = 100) {
  let timeoutID: any = null
  return () => {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(() => {
      fn.apply(that, args)
    }, delay)
  }
}

export default debounce
