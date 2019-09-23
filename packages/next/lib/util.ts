export async function sequenceArray(array: any[], fn: Function) {
  const results = []
  for (let i = 0; i < array.length; i++) {
    const r = await fn(array[i])
    // Nulls are stripped out using gjv()
    results.push(r)
  }
  return results // will be resolved value of promise
}

export const maxInt = (array: any[], prop: string) => {
  return array.reduce((p: number, v) => {
    return p > v[prop] ? p : v[prop]
  }, NaN)
}

export const minInt = (array: any[], prop: string) => {
  return array.reduce((p: number, v) => {
    return p < v[prop] ? p : v[prop]
  }, NaN)
}

export const openInNewTab = (url: string): void => {
  if (!window || !window.open) {
    return
  }
  // var win = window.open(url, '_blank', 'noopener').focus()
  try {
    const opened = window.open(url, '_blank')
    if (opened) {
      opened.focus()
    }
  } catch (error) {
    console.error('Could not open window.')
  }
}
