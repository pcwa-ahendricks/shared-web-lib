type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

export default function removeNulls<T extends object>(obj: Nullable<T>): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null)
  ) as T
}
