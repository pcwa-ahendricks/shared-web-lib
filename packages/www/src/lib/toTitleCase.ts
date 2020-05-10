// Don't call replace() on undefined.
const toTitleCase = (str = '', ignore?: RegExp) =>
  str.replace(/\w\S*/g, (txt) =>
    ignore && ignore.test(txt)
      ? txt
      : `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`
  )

export default toTitleCase
