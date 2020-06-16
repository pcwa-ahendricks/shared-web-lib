import {SortDirection} from '@material-ui/core/TableCell'

const desc = <T extends {[index: string]: any}>(
  a: T,
  b: T,
  orderBy: string
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const stableSort = <T extends any>(array: T[], cmp: any): T[] => {
  const sorted = array
    .map((el, index) => [el, index])
    .sort((a: any, b: any) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    .map((el) => el[0]) as T[]
  return [...sorted]
}

const getSorting = <T extends any>(order: SortDirection, orderBy: string) =>
  order === 'desc'
    ? (a: T, b: T) => desc<T>(a, b, orderBy)
    : (a: T, b: T) => -desc<T>(a, b, orderBy)

export {getSorting, stableSort}
