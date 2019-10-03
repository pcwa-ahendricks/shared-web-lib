function fileExtension(filename: string, lowercase: boolean = true) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  const fileName = filename.split('.')
  const ext = fileName.pop() || ''
  const extTrimmed = ext.trim()
  if (lowercase) {
    return extTrimmed.toLowerCase()
  } else {
    return extTrimmed
  }
}

export default fileExtension
