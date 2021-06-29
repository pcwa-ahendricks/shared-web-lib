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
  LinearProgress,
  createStyles,
  makeStyles,
  SortDirection
} from '@material-ui/core'
import {PiContext, PiMetadata} from '../PiStore'
import {GageConfigTable} from '@lib/services/pi/gage-config'
import {
  ZippedTableDataItem,
  piApiUrl
} from '@pages/recreation/flows/gages/[pid]'
import toTitleCase from '@lib/toTitleCase'
import useFriendlyNameMeta from '../hooks/useFriendlyNameMeta'
import useIsRiverGage from '../hooks/useIsRiverGage'
import useIsReservoirGage from '../hooks/useIsReservoirGage'
import {
  // format,
  startOfMonth,
  isToday,
  isThisMonth,
  isValid,
  parseJSON
} from 'date-fns'
import {stableSort} from '@lib/table-utils'
import PiTableRow from './PiTableRow'
import DlCsvButton from '@components/DlCsvButton/DlCsvButton'
import disclaimer from '../disclaimer'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {
  PiWebElementAttributeStream,
  PiWebElementStreamSetResponse
} from '@lib/services/pi/pi-web-api-types'
import {generate} from 'shortid'
import round from '@lib/round'
// const isDev = process.env.NODE_ENV === 'development'
const TABLE_TIME_INTERVAL = '15m'

type Props = {
  metric: GageConfigTable['metric']
  headers: GageConfigTable['headers']
  streamSetItems: PiWebElementStreamSetResponse['Items']
  streamSetMeta?: PiMetadata[]
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

const PiTable = ({metric, headers, streamSetItems, streamSetMeta}: Props) => {
  const {state} = useContext(PiContext)
  const {activeGageItem} = state
  const friendlyName = useFriendlyNameMeta(streamSetMeta)
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
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  // Important, need to be set in state or placed outside the scope of component in order to prevent infinite re-rendering/crashing/requests.
  useEffect(() => {
    const now = new Date()
    setStartDate(startOfMonth(now))
    setEndDate(now)
  }, [])

  const tableValues = useMemo(
    () =>
      activeGageItem && Array.isArray(activeGageItem.tableValues)
        ? activeGageItem.tableValues.map((attribute, index) => ({
            index,
            attribute,
            gageId: activeGageItem.id,
            webId:
              streamSetItems.find((item: any) => item.Name === attribute)
                ?.WebId ?? ''
          }))
        : [],
    [activeGageItem, streamSetItems]
  )
  const colAValues = tableValues[0]
  const colBValues = tableValues[1]
  const colCValues = tableValues[2]

  // useEffect(() => {
  //   isDev &&
  //     startDate &&
  //     endDate &&
  //     console.log(
  //       `Table data for ${colAValues?.gageId}, ${
  //         colAValues?.attribute
  //       } | ${format(startDate, 'Pp')} - ${format(
  //         endDate,
  //         'Pp'
  //       )} | ${TABLE_TIME_INTERVAL}`
  //     )
  //   isDev &&
  //     startDate &&
  //     endDate &&
  //     console.log(
  //       `Table data for ${colBValues?.gageId}, ${
  //         colBValues?.attribute
  //       } | ${format(startDate, 'Pp')} - ${format(
  //         endDate,
  //         'Pp'
  //       )} | ${TABLE_TIME_INTERVAL}`
  //     )
  // }, [])

  const qs = useMemo(
    () =>
      startDate && endDate
        ? stringify(
            {
              startTime: startDate.toJSON(),
              endTime: endDate.toJSON(),
              interval: TABLE_TIME_INTERVAL
            },
            true
          )
        : null,
    [startDate, endDate]
  )
  const webIdA = colAValues?.webId
  const webIdB = colBValues?.webId
  const webIdC = colCValues?.webId
  const colAUrl = `${piApiUrl}/streams/${webIdA}/interpolated${qs}`
  const colBUrl = `${piApiUrl}/streams/${webIdB}/interpolated${qs}`
  const colCUrl = `${piApiUrl}/streams/${webIdC}/interpolated${qs}`

  const {data: colAData, isValidating: colAIsValidating} =
    useSWR<PiWebElementAttributeStream>(webIdA && qs ? colAUrl : null)
  const {data: colBData, isValidating: colBIsValidating} =
    useSWR<PiWebElementAttributeStream>(webIdB && qs ? colBUrl : null)
  const {data: colCData, isValidating: colCIsValidating} =
    useSWR<PiWebElementAttributeStream>(webIdC && qs ? colCUrl : null)

  const isValidating = colAIsValidating || colBIsValidating || colCIsValidating

  const tableItems = useMemo(() => {
    const a = {
      ...colAValues,
      items: [...(colAData?.Items ?? [])],
      units: colAData?.UnitsAbbreviation ?? ''
    }
    const b = {
      ...colBValues,
      items: [...(colBData?.Items ?? [])],
      units: colBData?.UnitsAbbreviation ?? ''
    }
    const c = {
      ...colCValues,
      // convert celsius to fahrenheit
      items: [...(colCData?.Items ?? [])].map((i) => ({
        ...i,
        Value: round(i.Value * 1.8 + 32, 2),
        UnitsAbbreviation: '°F'
      })),
      units: colCData?.UnitsAbbreviation || '°F'
    }
    // Not all tables will have a temperature attribute
    return [a, b, c].filter((i) => i.index >= 0)
  }, [colAData, colBData, colAValues, colBValues, colCData, colCValues])

  const zippedTableData = useMemo(
    () =>
      // The following reduce fn will zip an array of arrays.
      // Specifying reduce Type allows us to set the initial value as an array w/o type casting below.
      tableItems.reduce<ZippedTableDataItem[]>((prevItems, curr) => {
        // This if check just prevents toLowerCase() below from throwing an error due to undefined method.
        if (!curr.attribute) {
          return []
        }
        const currItems = curr.items

        const newItems = currItems.map((e, i) => {
          // Assume that the timestamp will match when zipping arrays with map.
          const timestamp = parseJSON(e.Timestamp)
          const prevItemsObj = {...prevItems[i]}
          const prevItemsValues = prevItemsObj.values
            ? [...prevItemsObj.values]
            : []
          return {
            id: generate(),
            timestamp,
            values: [
              ...prevItemsValues,
              {
                attribute: curr.attribute,
                value: e.Value,
                units: curr.units,
                columnNo: curr.index + 2 // Increase by 2 since timestamp will be first column and array's are zero based.
              }
            ]
          }
        })
        return newItems
      }, []),
    [tableItems]
  )

  useEffect(() => {
    if (metric === 'daily') {
      const dailyData = zippedTableData.filter((item) =>
        isValid(item.timestamp) ? isToday(item.timestamp) : false
      )
      setData(dailyData)
    } else if (metric === 'monthly') {
      const monthlyData = zippedTableData.filter((item) =>
        isValid(item.timestamp) ? isThisMonth(item.timestamp) : false
      )
      setData(monthlyData)
    }
  }, [zippedTableData, metric, headers])

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
    if (!data || !activeGageItem) {
      return ''
    }
    const gageId = activeGageItem.id ?? ''
    const firstPart = isReservoir
      ? `${friendlyName}`
      : isRiver
      ? `Gaging Station ${gageId.toUpperCase()}`
      : ''

    // const secondPart = data.units ? ` - ${attributeLabel} in ${data.units}` : ''
    const secondPart = metric ? ` - ${toTitleCase(metric)} Data` : ''
    return `${firstPart}${secondPart}`
  }, [activeGageItem, friendlyName, data, isRiver, isReservoir, metric])

  const linearProgressEl = useMemo(
    () =>
      isValidating ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isValidating]
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

  // Used with CSV downloads.
  const formatAttrib = useCallback((attribute = '') => {
    return attribute.match(/height/i) ? 'stage' : attribute
  }, [])

  const csvData = useMemo(
    () =>
      data &&
      data.map((item) => {
        const timestamp = isValid(item.timestamp)
          ? item.timestamp.toISOString()
          : ''
        const col2Obj = item.values.find((i) => i.columnNo === 2)
        const col3Obj = item.values.find((i) => i.columnNo === 3)
        const col4Obj = item.values.find((i) => i.columnNo === 4)
        const col2Attribute = col2Obj && col2Obj.attribute.toLowerCase()
        const col3Attribute = col3Obj && col3Obj.attribute.toLowerCase()
        const col4Attribute = col4Obj && col4Obj.attribute.toLowerCase()
        const col2Value = col2Obj && col2Obj.value
        const col3Value = col3Obj && col3Obj.value
        const col4Value = col4Obj && col4Obj.value
        return {
          timestamp,
          [formatAttrib(col2Attribute)]: col2Value || '',
          [formatAttrib(col3Attribute)]: col3Value || '',
          [formatAttrib(col4Attribute)]: col4Value || ''
        }
      }),
    [data, formatAttrib]
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
