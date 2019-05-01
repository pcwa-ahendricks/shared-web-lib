function fileExtension(filename: string, lowercase: boolean = true) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  const ext = filename
    .split('.')
    .pop()
    .trim()
  if (lowercase) {
    return ext.toLowerCase()
  } else {
    return ext
  }
}

export default fileExtension
