function debounce(fn: () => void, delay: number = 100) {
  let timeoutID: any = null
  return () => {
    clearTimeout(timeoutID)
    const args: [] = arguments
    const that = this
    timeoutID = setTimeout(() => {
      fn.apply(that, args)
    }, delay)
  }
}

export default debounce
