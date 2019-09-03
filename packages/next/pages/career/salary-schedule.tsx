import React, {useState, useEffect, useCallback, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {getSalarySchedule} from '@lib/services/cosmicService'
import {
  Box,
  ButtonBase,
  Typography as Type,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Theme,
  Toolbar,
  useTheme
} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/styles'
import {getSorting, stableSort} from '@lib/table-utils'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

interface SalaryScheduleResponse {
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
type HeadRowId = keyof SalaryScheduleResponse

interface SalaryScheduleData extends SalaryScheduleResponse {
  id: number
}

const useStyles = makeStyles(() =>
  createStyles({
    tableWrapper: {
      overflowX: 'scroll'
    },
    tableRow: {
      cursor: 'pointer'
    },
    headerTableCell: {
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
    }
  })
)

const SalarySchedulePage = () => {
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const [salaryData, setSalaryData] = useState<SalaryScheduleData[]>([])
  const [order, setOrder] = useState<'asc' | 'desc'>('asc') // SortDirection doesn't work here due to possible false value.
  const [orderBy, setOrderBy] = useState<HeadRowId>('CLASS CODE')

  const setSalaryScheduleData = useCallback(async () => {
    const ssData: SalaryScheduleResponse[] = await getSalarySchedule()
    const ssDataWithId = ssData.map((row, idx) => ({id: idx, ...row}))
    setSalaryData(ssDataWithId)
  }, [])

  const [rowDetailExpanded, setRowDetailExpanded] = useState<boolean>(true)
  if (!setRowDetailExpanded) {
    console.log('foo')
  }

  useEffect(() => {
    setSalaryScheduleData()
  }, [setSalaryScheduleData])

  const headRows: {
    id: HeadRowId
    numeric: boolean
    disablePadding: boolean
    label: string
  }[] = useMemo(
    () => [
      {
        id: 'CLASS CODE',
        numeric: false,
        disablePadding: true,
        label: 'Class Code'
      },
      {
        id: 'CLASSIFICATION TITLE',
        numeric: false,
        disablePadding: false,
        label: 'Class Title'
      },
      {
        id: 'MAX MONTH SALARY',
        numeric: true,
        disablePadding: false,
        label: 'Max Month Salary'
      },
      {
        id: 'MIN MONTH SALARY',
        numeric: true,
        disablePadding: false,
        label: 'Min Month Salary'
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

  if (salaryData.length > 0) {
    console.log(salaryData)
  }
  return (
    <PageLayout title="Employee Salary Schedule">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle title="Employee Salary Schedule" subtitle="Careers" />
          <Type paragraph>
            To view the monthly and annual salary ranges click on the arrow on
            the left side of each row. To view steps A through F use the scroll
            bar at the bottom of the table.
          </Type>
          <Type paragraph>
            Longevity Pay - 2.5% added to employees’ regular hourly rate upon
            completion of 10 years of service. An additional 2.5% is added to
            employees’ pay upon completion of 15 years of service.
          </Type>
          <Type paragraph>
            Confidential Pay - 6% added to employees’ regular hourly rate for
            those positions which have been designated as confidential.
          </Type>
        </WideContainer>

        <Box mt={6}>
          <Box bgcolor={theme.palette.common.white} boxShadow={1}>
            <Toolbar>
              <Type variant="h5" id="tableTitle">
                Current Salary Schedule Table
              </Type>
            </Toolbar>
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
                  {stableSort<SalaryScheduleData>(
                    salaryData,
                    getSorting<HeadRowId>(order, orderBy)
                  ).map((row, idx) => {
                    // const isItemSelected = isSelected(row.name)
                    // const labelId = `enhanced-table-checkbox-${index}`
                    const labelId = `table-row-detail-toggle-${idx}`

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="button"
                        aria-expanded={rowDetailExpanded}
                        aria-label={labelId}
                        tabIndex={-1}
                        key={row.id}
                        className={classes.tableRow}
                      >
                        <TableCell padding="checkbox">
                          <ButtonBase aria-label={labelId}>
                            <KeyboardArrowDownIcon fontSize="small" />
                          </ButtonBase>
                        </TableCell>
                        {/* <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell> */}

                        <TableCell component="th" scope="row" id={labelId}>
                          {row['CLASS CODE']}
                        </TableCell>
                        <TableCell>{row['CLASSIFICATION TITLE']}</TableCell>
                      </TableRow>
                    )
                  })}
                  {/* {emptyRows > 0 && (
                  <TableRow style={{height: 49 * emptyRows}}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
      </MainBox>
    </PageLayout>
  )
}

export default SalarySchedulePage

// function toTitleCase(str: string) {
//   return str.replace(
//     /\w\S*/g,
//     (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
//   )
// }
