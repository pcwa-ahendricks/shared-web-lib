import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  TextField,
  Toolbar,
  Typography as Type
} from '@mui/material'
import {getSorting, stableSort} from '@lib/table-utils'
import {generate} from 'shortid'
import {useDebounce} from 'use-debounce'
import UnclaimedPropertyTableRow from './UnclaimedPropertyTableRow'
import {UnclaimedPropertyResponse} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'
import useSWR from 'swr'
import isNumber from 'is-number'
import round from '@lib/round'
import noNaN from '@lib/noNaN'
import {parse} from 'date-fns'
import useTheme from '@hooks/useTheme'
const isDev = process.env.NODE_ENV === 'development'

export interface UnclaimedProperty
  extends Omit<UnclaimedPropertyResponse, 'date' | 'amount'> {
  id: string
  date: Date
  amount: number | null
}

type Props = {
  fallbackData?: UnclaimedPropertyResponse[]
}

type HeadRowId = keyof UnclaimedProperty

const qs = stringify({filename: 'unclaimed-property.csv'}, true)
export const csvDataUrl = `/api/cosmic/csv-data${qs}`

const UnclaimedPropertyTable = ({fallbackData}: Props) => {
  const theme = useTheme()
  const style = {
    tableWrapper: {
      overflowX: 'scroll'
    },
    tableHeaderCell: {
      whiteSpace: 'nowrap'
      // textTransform: 'capitalize' // Doesn't work ??
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
  }
  const [sortFilterData, setSortFilterData] = useState<UnclaimedProperty[]>([])
  const [order, setOrder] = useState<'asc' | 'desc'>('asc') // SortDirection doesn't work here due to possible false value.
  const [orderBy, setOrderBy] = useState<HeadRowId>('owner')

  const {data: unclaimedPropertyData} = useSWR<UnclaimedPropertyResponse[]>(
    csvDataUrl,
    {fallbackData}
  )

  const unclaimedProperty: UnclaimedProperty[] = useMemo(() => {
    try {
      return unclaimedPropertyData && Array.isArray(unclaimedPropertyData)
        ? unclaimedPropertyData.map((row) => {
            const amt = row.amount.toString()
            const amountNo = isNumber(amt)
              ? noNaN(round(parseFloat(amt), 2))
              : null
            return {
              ...row,
              id: generate(),
              amount: amountNo,
              date: parse(row.date, 'MM/dd/yy', new Date())
            }
          })
        : []
    } catch (error) {
      console.error(
        'Error processing Unclaimed Property data. Check uploaded CSV file on Cosmic.'
      )
      console.log(error)
      return []
    }
  }, [unclaimedPropertyData])

  const logAmountTotal = useCallback(() => {
    if (isDev && unclaimedProperty) {
      const total = unclaimedProperty.reduce(
        (prevVal, currentVal) => prevVal + (currentVal.amount || 0),
        0
      )
      console.log(
        'amount total: ',
        total.toLocaleString(undefined, {
          currency: 'USD',
          style: 'currency'
        })
      )
    }
  }, [unclaimedProperty])

  useEffect(() => {
    logAmountTotal()
  }, [logAmountTotal])

  const headRows: {
    id: HeadRowId
    numeric: boolean
    disablePadding: boolean
    label: string
  }[] = useMemo(
    () => [
      {
        id: 'owner',
        numeric: false,
        disablePadding: false,
        label: 'Owner on Record'
      },
      {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount'
      },
      {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date'
      }
    ],
    []
  )

  const handleRequestSort = useCallback(
    (property: HeadRowId) => () =>
      // _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      {
        const isDesc = orderBy === property && order === 'desc'
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(property)
      },
    [order, orderBy]
  )

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15) // 10, 15, or 25.
  const [filteredRowCount, setFilteredRowCount] = useState(
    unclaimedProperty.length
  )
  const [inputFilter, setInputFilter] = useState('')
  const [debFilteredRowCount] = useDebounce(filteredRowCount, 200)
  const [debInputFilter] = useDebounce(inputFilter, 200)

  useEffect(() => {
    const f = unclaimedProperty.filter((row) => {
      // const re = new RegExp(debClassTitleFilter, 'i')
      // return re.test(row['owner'])
      const t = (row['owner'] || '').toLowerCase()
      const i = (debInputFilter || '').toLowerCase()
      return t.indexOf(i) >= 0
    })
    const s = stableSort<UnclaimedProperty>(
      f,
      getSorting<HeadRowId>(order, orderBy)
    )
    setSortFilterData(s)
    setFilteredRowCount(s.length)
  }, [unclaimedProperty, debInputFilter, order, orderBy])

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

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputFilter(event.target.value)
      setPage(0)
    },
    []
  )

  // Using minHeight with container allows the #unclaimedPropertyList anchor to work correctly on page load when the initial table data is not available. After the table data is loaded the 15 rows produce an element that is 800px high, so using a min-height fixes the load issue.
  const containerMinHeight = useMemo(
    () => (unclaimedProperty.length === 0 ? 800 : 0),
    [unclaimedProperty]
  )

  return (
    <Box mt={6} minHeight={containerMinHeight}>
      <Box
        bgcolor={theme.palette.common.white}
        boxShadow={1}
        id="unclaimedPropertyList"
      >
        <Toolbar>
          <Type variant="h5" id="tableTitle">
            Unclaimed Property List
          </Type>
        </Toolbar>
        <Box ml={3} mb={3}>
          <TextField
            variant="standard"
            id="table-filter-by-owner"
            label="Filter by Owner"
            sx={{...style.textField}}
            value={inputFilter}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box sx={{...style.tableWrapper}}>
          <Table size="small" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headRows.map((c) => (
                  <TableCell
                    key={c.id}
                    align={c.numeric ? 'right' : 'left'}
                    padding={c.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === c.id ? order : false}
                    sx={{...style.tableHeaderCell}}
                  >
                    <TableSortLabel
                      active={orderBy === c.id}
                      direction={order}
                      onClick={handleRequestSort(c.id)}
                    >
                      {c.label}
                      {orderBy === c.id ? (
                        <Box component="span" sx={{...style.visuallyHidden}}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortFilterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UnclaimedPropertyTableRow key={row.id} data={row} />
                ))}
              {/* {emptyRows > 0 && (
                  <TableRow sx={{height: 49 * emptyRows}}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={debFilteredRowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default UnclaimedPropertyTable
