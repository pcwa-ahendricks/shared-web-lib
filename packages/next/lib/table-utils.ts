import {SortDirection} from '@material-ui/core/TableCell'

const desc = (a: any, b: any, orderBy: any) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const stableSort = <T extends {}>(array: T[], cmp: any): T[] => {
  const sorted = array
    .map((el, index) => [el, index])
    .sort((a: any, b: any) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    .map((el) => el[0]) as T[]
  console.log(sorted)
  return [...sorted]
}

const getSorting = <T extends {}>(order: SortDirection, orderBy: T) =>
  order === 'desc'
    ? (a: any, b: any) => desc(a, b, orderBy)
    : (a: any, b: any) => -desc(a, b, orderBy)

export {getSorting, stableSort}
