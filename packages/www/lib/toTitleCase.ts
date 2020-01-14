const toTitleCase = (str: string, ignore?: RegExp) =>
  str.replace(/\w\S*/g, (txt) =>
    ignore && ignore.test(txt)
      ? txt
      : `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`
  )

export default toTitleCase
