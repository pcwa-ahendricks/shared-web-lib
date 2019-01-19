// @flow

export async function sequenceArray(array: Array<any>, fn: Function) {
  let results = []
  for (let i = 0; i < array.length; i++) {
    let r = await fn(array[i])
    // Nulls are stripped out using gjv()
    results.push(r)
  }
  return results // will be resolved value of promise
}

export const maxInt = (array: Array<any>, prop: string) => {
  return array.reduce((p: number, v) => {
    return p > v[prop] ? p : v[prop]
  }, NaN)
}

export const minInt = (array: Array<any>, prop: string) => {
  return array.reduce((p: number, v) => {
    return p < v[prop] ? p : v[prop]
  }, NaN)
}

export const openInNewTab = (url: string): void => {
  if (!window || !window.open) {
    return
  }
  // var win = window.open(url, '_blank', 'noopener').focus()
  window.open(url, '_blank').focus()
}
