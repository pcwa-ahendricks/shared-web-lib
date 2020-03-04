const groupBy = <T, U>(list: T[], keyGetter: (param: T) => any) => {
  const map = new Map<U, T[]>()
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

export default groupBy
