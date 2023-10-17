import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {
  Box,
  Typography as Type,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  TextField,
  Toolbar,
  LinearProgress
} from '@mui/material'

import {getSorting, stableSort} from '@lib/table-utils'
import {generate} from 'shortid'
import round from '@lib/round'
import noNaN from '@lib/noNaN'
import SalaryScheduleRow from '@components/SalaryScheduleTable/SalaryScheduleRow'
import DlSalaryScheduleCsvButton from '@components/SalaryScheduleTable/DlSalaryScheduleCsvButton'
import {useDebounce} from 'use-debounce'
import useTheme from '@hooks/useTheme'

export interface SalaryScheduleResponse {
  'CLASS CODE': string
  'CLASSIFICATION TITLE': string
  PLAN: string
  RANGE: string
  'STEP A': string
  'STEP B': string
  'STEP C': string
  'STEP D': string
  'STEP E': string
  'STEP F': string
  'MIN MONTH SALARY': string
  'MAX MONTH SALARY': string
  'STEP A ANNUAL': string
  'STEP B ANNUAL': string
  'STEP C ANNUAL': string
  'STEP D ANNUAL': string
  'STEP E ANNUAL': string
  'STEP F ANNUAL': string
  'STEP A MONTHLY': string
  'STEP B MONTHLY': string
  'STEP C MONTHLY': string
  'STEP D MONTHLY': string
  'STEP E MONTHLY': string
  'STEP F MONTHLY': string
}

export interface SalaryScheduleData extends SalaryScheduleResponse {
  id: string
  range: number | null
  stepA: number | null
  stepB: number | null
  stepC: number | null
  stepD: number | null
  stepE: number | null
  stepF: number | null
  stepAAnnual: number | null
  stepBAnnual: number | null
  stepCAnnual: number | null
  stepDAnnual: number | null
  stepEAnnual: number | null
  stepFAnnual: number | null
  stepAMonthly: number | null
  stepBMonthly: number | null
  stepCMonthly: number | null
  stepDMonthly: number | null
  stepEMonthly: number | null
  stepFMonthly: number | null
}

type HeadRowId = keyof SalaryScheduleData

type Props = {
  salaryCsv?: string
  salaryCsvData?: SalaryScheduleResponse[]
  isValidating: boolean
}

const SalaryScheduleTable = ({
  salaryCsvData,
  isValidating,
  salaryCsv
}: Props) => {
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
      margin: '-1px',
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
  const [sortFilterSalaryData, setSortFilterSalaryData] = useState<
    SalaryScheduleData[]
  >([])
  const [order, setOrder] = useState<'asc' | 'desc'>('asc') // SortDirection doesn't work here due to possible false value.
  const [orderBy, setOrderBy] = useState<HeadRowId>('CLASSIFICATION TITLE')

  const salaryData = useMemo(
    () =>
      salaryCsvData && Array.isArray(salaryCsvData)
        ? salaryCsvData.map((row) => ({
            id: generate(),
            ...row,
            range: noNaN(round(parseFloat(row.RANGE), 2)),
            stepA: noNaN(round(parseFloat(row['STEP A']), 4)),
            stepB: noNaN(round(parseFloat(row['STEP B']), 4)),
            stepC: noNaN(round(parseFloat(row['STEP C']), 4)),
            stepD: noNaN(round(parseFloat(row['STEP D']), 4)),
            stepE: noNaN(round(parseFloat(row['STEP E']), 4)),
            stepF: noNaN(round(parseFloat(row['STEP F']), 4)),
            stepAAnnual: noNaN(round(parseFloat(row['STEP A ANNUAL']), 2)),
            stepBAnnual: noNaN(round(parseFloat(row['STEP B ANNUAL']), 2)),
            stepCAnnual: noNaN(round(parseFloat(row['STEP C ANNUAL']), 2)),
            stepDAnnual: noNaN(round(parseFloat(row['STEP D ANNUAL']), 2)),
            stepEAnnual: noNaN(round(parseFloat(row['STEP E ANNUAL']), 2)),
            stepFAnnual: noNaN(round(parseFloat(row['STEP F ANNUAL']), 2)),
            stepAMonthly: noNaN(round(parseFloat(row['STEP A MONTHLY']), 2)),
            stepBMonthly: noNaN(round(parseFloat(row['STEP B MONTHLY']), 2)),
            stepCMonthly: noNaN(round(parseFloat(row['STEP C MONTHLY']), 2)),
            stepDMonthly: noNaN(round(parseFloat(row['STEP D MONTHLY']), 2)),
            stepEMonthly: noNaN(round(parseFloat(row['STEP E MONTHLY']), 2)),
            stepFMonthly: noNaN(round(parseFloat(row['STEP F MONTHLY']), 2))
          }))
        : [],
    [salaryCsvData]
  )

  const headRows: {
    id: HeadRowId
    numeric: boolean
    disablePadding: boolean
    label: string
  }[] = useMemo(
    () => [
      {
        id: 'CLASS CODE',
        numeric: true,
        disablePadding: false,
        label: 'Class Code'
      },
      {
        id: 'CLASSIFICATION TITLE',
        numeric: false,
        disablePadding: false,
        label: 'Class Title'
      },
      {
        id: 'PLAN',
        numeric: false,
        disablePadding: false,
        label: 'Plan'
      },
      {
        id: 'range',
        numeric: true,
        disablePadding: false,
        label: 'Range'
      },
      {
        id: 'stepA',
        numeric: true,
        disablePadding: false,
        label: 'Step A'
      },
      {
        id: 'stepB',
        numeric: true,
        disablePadding: false,
        label: 'Step B'
      },
      {
        id: 'stepC',
        numeric: true,
        disablePadding: false,
        label: 'Step C'
      },
      {
        id: 'stepD',
        numeric: true,
        disablePadding: false,
        label: 'Step D'
      },
      {
        id: 'stepE',
        numeric: true,
        disablePadding: false,
        label: 'Step E'
      },
      {
        id: 'stepF',
        numeric: true,
        disablePadding: false,
        label: 'Step F'
      }
      // {
      //   id: 'MAX MONTH SALARY',
      //   numeric: true,
      //   disablePadding: false,
      //   label: 'Max Month Salary'
      // },
      // {
      //   id: 'MIN MONTH SALARY',
      //   numeric: true,
      //   disablePadding: false,
      //   label: 'Min Month Salary'
      // }
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
  const [rowsPerPage, setRowsPerPage] = useState(10) // 10, 15, or 25.
  const [filteredRowCount, setFilteredRowCount] = useState(salaryData.length)
  const [classTitleFilter, setClassTitleFilter] = useState('')
  const [debFilteredRowCount] = useDebounce(filteredRowCount, 200)
  const [debClassTitleFilter] = useDebounce(classTitleFilter, 200)

  useEffect(() => {
    const f = salaryData.filter((row) => {
      // const re = new RegExp(debClassTitleFilter, 'i')
      // return re.test(row['CLASSIFICATION TITLE'])
      const t = (row['CLASSIFICATION TITLE'] || '').toLowerCase()
      const i = (debClassTitleFilter || '').toLowerCase()
      return t.indexOf(i) >= 0
    })
    const s = stableSort<SalaryScheduleData>(
      f,
      getSorting<HeadRowId>(order, orderBy)
    )
    setSortFilterSalaryData(s)
    setFilteredRowCount(s.length)
  }, [salaryData, debClassTitleFilter, order, orderBy])

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
      setClassTitleFilter(event.target.value)
      setPage(0)
    },
    []
  )

  const linearProgressEl = useMemo(
    () =>
      isValidating ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isValidating]
  )

  return (
    <Box mt={6} ml={2} mr={2}>
      <Box
        bgcolor={theme.palette.common.white}
        boxShadow={1}
        position="relative"
      >
        {linearProgressEl}
        <Toolbar>
          <Type variant="h5" id="tableTitle">
            Current Salary Schedule Table
          </Type>
        </Toolbar>
        <Box ml={3} mb={3}>
          <TextField
            variant="standard"
            id="table-filter-by-job-class-title"
            // placeholder="Filter"
            label="Filter by Class Title (eg. Account)"
            sx={{...style.textField}}
            value={classTitleFilter}
            onChange={handleInputChange}
            margin="normal"
          />
        </Box>
        <Box sx={{...style.tableWrapper}}>
          <Table size="small" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="none" />
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
              {sortFilterSalaryData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <SalaryScheduleRow key={row.id} data={row} />
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Box m={3}>
        <DlSalaryScheduleCsvButton variant="contained" data={salaryCsv}>
          Download CSV
        </DlSalaryScheduleCsvButton>
      </Box>
    </Box>
  )
}

export default SalaryScheduleTable
