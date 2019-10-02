import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {getUnclaimedProperty} from '@lib/services/cosmicService'
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
  Theme,
  Toolbar,
  Typography as Type,
  useTheme
} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/styles'
import {getSorting, stableSort} from '@lib/table-utils'
import {generate} from 'shortid'
import useDebounce from '@hooks/useDebounce'
import UnclaimedPropertyTableRow from './UnclaimedPropertyTableRow'
const isDev = process.env.NODE_ENV === 'development'

interface UnclaimedPropertyResponse {
  owner: string
  date: Date
  amount: number | null
}

export interface UnclaimedPropertyData extends UnclaimedPropertyResponse {
  id: string
}

type HeadRowId = keyof UnclaimedPropertyData

const useStyles = makeStyles(() =>
  createStyles({
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
  })
)

const UnclaimedPropertyTable = () => {
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const [unclaimedPropertyData, setUnclaimedPropertyData] = useState<
    UnclaimedPropertyData[]
  >([])
  const [sortFilterData, setSortFilterData] = useState<UnclaimedPropertyData[]>(
    unclaimedPropertyData
  )
  const [order, setOrder] = useState<'asc' | 'desc'>('asc') // SortDirection doesn't work here due to possible false value.
  const [orderBy, setOrderBy] = useState<HeadRowId>('owner')

  const logAmountTotal = useCallback(() => {
    if (isDev) {
      const total = unclaimedPropertyData.reduce(
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
  }, [unclaimedPropertyData])

  const setData = useCallback(async () => {
    const data: UnclaimedPropertyResponse[] = await getUnclaimedProperty()
    const dataWithId = data.map((row) => ({
      id: generate(),
      ...row
    }))
    setUnclaimedPropertyData(dataWithId)
  }, [])

  useEffect(() => {
    logAmountTotal()
  }, [logAmountTotal, unclaimedPropertyData])

  useEffect(() => {
    setData()
  }, [setData])

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
    unclaimedPropertyData.length
  )
  const [inputFilter, setInputFilter] = useState('')
  const debFilteredRowCount = useDebounce(filteredRowCount, 200)
  const debInputFilter = useDebounce(inputFilter, 200)

  useEffect(() => {
    const f = unclaimedPropertyData.filter((row) => {
      // const re = new RegExp(debClassTitleFilter, 'i')
      // return re.test(row['owner'])
      const t = (row['owner'] || '').toLowerCase()
      const i = (debInputFilter || '').toLowerCase()
      return t.indexOf(i) >= 0
    })
    const s = stableSort<UnclaimedPropertyData>(
      f,
      getSorting<HeadRowId>(order, orderBy)
    )
    setSortFilterData(s)
    setFilteredRowCount(s.length)
  }, [unclaimedPropertyData, debInputFilter, order, orderBy])

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
    () => (unclaimedPropertyData.length === 0 ? 800 : 0),
    [unclaimedPropertyData]
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
            id="table-filter-by-owner"
            label="Filter by Owner"
            classes={{root: classes.textField}}
            value={inputFilter}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box className={classes.tableWrapper}>
          <Table size="small" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headRows.map((c) => (
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
              {sortFilterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UnclaimedPropertyTableRow key={row.id} data={row} />
                ))}
              {/* {emptyRows > 0 && (
                  <TableRow style={{height: 49 * emptyRows}}>
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export default UnclaimedPropertyTable
