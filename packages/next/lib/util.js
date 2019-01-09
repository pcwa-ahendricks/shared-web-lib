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
