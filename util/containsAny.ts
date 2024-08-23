export default function containsAny<T>(
  array: T[] = [],
  values: T[] = []
): boolean {
  return values.some((value) => array.includes(value))
}
