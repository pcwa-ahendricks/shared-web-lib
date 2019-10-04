import React, {
  useMemo,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Theme,
  Toolbar,
  Typography as Type,
  useTheme,
  LinearProgress
} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/styles'
import {PiContext} from '../PiStore'
import {GageConfigTable} from '@lib/services/pi/gage-config'
import {ZippedTableDataItem} from '../../../pages/recreation/flows/gages/[pid]'
import toTitleCase from '@lib/toTitleCase'
import useFriendlyNameMeta from '../hooks/useFriendlyNameMeta'
import useIsRiverGage from '../hooks/useIsRiverGage'
import useIsReservoirGage from '../hooks/useIsReservoirGage'
import {isToday, isThisMonth, isValid} from 'date-fns'
import {stableSort} from '@lib/table-utils'
import PiTableRow from './PiTableRow'
import DlCsvButton from '@components/DlCsvButton/DlCsvButton'
import disclaimer from '../disclaimer'
import {SortDirection} from '@material-ui/core/TableCell'

type Props = {
  data?: ZippedTableDataItem[]
  metric: GageConfigTable['metric']
  headers: GageConfigTable['headers']
}

export interface TableDataItem extends ZippedTableDataItem {
  id: string
}

// Need to use a custom descending comparator with this table.
const desc = (
  a: ZippedTableDataItem,
  b: ZippedTableDataItem,
  orderBy: string
) => {
  const valueAIndex = a.values.findIndex(
    (v) => v.attribute.toLowerCase() === orderBy
  )
  const valueBIndex = b.values.findIndex(
    (v) => v.attribute.toLowerCase() === orderBy
  )
  const valueA =
    orderBy === 'timestamp'
      ? a.timestamp
      : a.values[valueAIndex]
      ? a.values[valueAIndex].value
      : 0
  const valueB =
    orderBy === 'timestamp'
      ? b.timestamp
      : b.values[valueBIndex]
      ? b.values[valueBIndex].value
      : 0
  if (valueB < valueA) {
    return -1
  }
  if (valueB > valueA) {
    return 1
  }
  return 0
}

const getSorting = (order: SortDirection, orderBy: string) =>
  order === 'desc'
    ? (a: ZippedTableDataItem, b: ZippedTableDataItem) => desc(a, b, orderBy)
    : (a: ZippedTableDataItem, b: ZippedTableDataItem) => -desc(a, b, orderBy)

const useStyles = makeStyles(() =>
  createStyles({
    tableWrapper: {
      overflowX: 'scroll'
    },
    tableHeaderCell: {
      whiteSpace: 'nowrap'
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    },
    textField: {
      width: 300
    }
  })
)

const PiTable = ({data: dataProp, metric, headers}: Props) => {
  const {state} = useContext(PiContext)
  const {isLoadingTableData: isLoading, activeGageItem, streamSetMeta} = state
  const friendlyName = useFriendlyNameMeta()
  const isRiver = useIsRiverGage()
  const isReservoir = useIsReservoirGage()
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const [order, setOrder] = useState<'asc' | 'desc'>('desc') // SortDirection Type doesn't work here due to possible false value.
  const [orderBy, setOrderBy] = useState<string>('timestamp')
  const [data, setData] = useState<ZippedTableDataItem[]>([])
  const [sortedData, setSortedData] = useState<ZippedTableDataItem[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5) // 5, 10, or 20.

  useEffect(() => {
    if (dataProp && metric === 'daily') {
      const dailyData = dataProp.filter((item) =>
        isValid(item.timestamp) ? isToday(item.timestamp) : false
      )
      setData(dailyData)
    } else if (dataProp && metric === 'monthly') {
      const monthlyData = dataProp.filter((item) =>
        isValid(item.timestamp) ? isThisMonth(item.timestamp) : false
      )
      setData(monthlyData)
    }
  }, [dataProp, metric, headers])

  useEffect(() => {
    const s = stableSort(data, getSorting(order, orderBy))
    setSortedData(s)
    setRowCount(s.length)
  }, [data, order, orderBy])

  // console.log('TBL metric', metric)
  // console.log('TBL headers', headers)
  // console.log('TBL Mapped data', data)
  // console.log('dataProp', dataProp)

  const tableTitle = useMemo(() => {
    if (!data || !streamSetMeta || !activeGageItem) {
      return ' '
    }
    const firstPart = isReservoir
      ? `${friendlyName}`
      : isRiver
      ? `Gaging Station ${activeGageItem.id.toUpperCase()}`
      : ''

    // const secondPart = data.units ? ` - ${attributeLabel} in ${data.units}` : ''
    const secondPart = metric ? ` - ${toTitleCase(metric)} Data` : ''
    return `${firstPart}${secondPart}`
  }, [
    activeGageItem,
    friendlyName,
    data,
    streamSetMeta,
    isRiver,
    isReservoir,
    metric
  ])

  const linearProgressEl = useMemo(
    () =>
      isLoading ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isLoading]
  )

  const handleRequestSort = useCallback(
    (property: string) => () => {
      const isDesc = orderBy === property && order === 'desc'
      setOrder(isDesc ? 'asc' : 'desc')
      setOrderBy(property)
    },
    [order, orderBy]
  )

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    },
    []
  )

  const emptyRows = useMemo(
    () =>
      rowsPerPage -
      Math.min(rowsPerPage, sortedData.length - page * rowsPerPage),
    [sortedData, rowsPerPage, page]
  )

  // 4:00 pm - Wed
  // 10/02/19 4:00 pm
  const timestampFormat = useMemo(
    () =>
      metric === 'monthly' ? "M/dd/yy h':'mm aaaa" : "h':'mm aaaa '-' EEE",
    [metric]
  )

  const buttonCaption = useMemo(
    () => `Download ${activeGageItem ? activeGageItem.id : ''} ${metric} CSV`,
    [activeGageItem, metric]
  )

  const csvFileName = useMemo(
    () => `${activeGageItem ? activeGageItem.id : ''}-${metric}.csv`,
    [activeGageItem, metric]
  )

  const csvData = useMemo(
    () =>
      data &&
      data.map((item) => {
        const timestamp = isValid(item.timestamp)
          ? item.timestamp.toISOString()
          : ''
        return {
          timestamp
          // value: item.Value
        }
      }),
    [data]
  )

  const csvHeader = useMemo(
    () => `"DISCLAIMER - ${disclaimer.p1}\n${disclaimer.p2}"`,
    []
  )

  return (
    <Box
      boxShadow={2}
      bgcolor={theme.palette.common.white}
      m={3}
      p={3}
      position="relative"
    >
      {linearProgressEl}
      <Toolbar>
        <Type variant="h3" id="tableTitle">
          {tableTitle}
        </Type>
      </Toolbar>
      <Box className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headers.map((c) => (
                <TableCell
                  key={c.id}
                  align={c.numeric ? 'right' : 'left'}
                  padding={c.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === c.id ? order : false}
                  classes={{root: classes.tableHeaderCell}}
                >
                  <TableSortLabel
                    active={orderBy === c.id}
                    direction={order}
                    onClick={handleRequestSort(c.id)}
                  >
                    {c.label}
                    {orderBy === c.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <PiTableRow
                  key={row.id}
                  data={row}
                  timestampFormat={timestampFormat}
                />
              ))}
            {/* Row should be 53px high, or 33px if table size="small" prop set. */}
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rowCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Box>
        <DlCsvButton data={csvData} header={csvHeader} fileName={csvFileName}>
          {buttonCaption}
        </DlCsvButton>
      </Box>
    </Box>
  )
}

export default PiTable
