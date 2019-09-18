// cspell:ignore frmt
import React, {useState, useCallback} from 'react'
import {ButtonBase, TableRow, TableCell, Theme} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import {SalaryScheduleData} from '../../pages/career/salary-schedule'
import {createStyles, makeStyles} from '@material-ui/styles'
import {TableCellProps} from '@material-ui/core/TableCell'

type Props = {
  data: SalaryScheduleData
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableRow: {
      cursor: 'pointer'
    },
    body: {
      color: theme.palette.text.secondary
    },
    root: {
      fontSize: '0.9rem'
    },
    small: {
      paddingTop: 3, // 1/2 of default.
      paddingRight: 24,
      paddingBottom: 3, // 1/2 of default.
      paddingLeft: 8
    }
  })
)

const SalaryScheduleRow = ({data}: Props) => {
  const classes = useStyles()

  const [rowDetailExpanded, setRowDetailExpanded] = useState<boolean>(true)

  const clickHandler = useCallback(() => {
    setRowDetailExpanded((isExpanded) => !isExpanded)
  }, [])

  const labelId = `table-row-detail-toggle-${data.id}`

  const DetailTableCell = ({children, ...rest}: TableCellProps) => {
    return (
      <TableCell
        classes={{
          root: classes.root,
          body: classes.body,
          sizeSmall: classes.small
        }}
        {...rest}
      >
        {children}
      </TableCell>
    )
  }

  const frmt = useCallback((value: number | null) => {
    return value
      ? value.toLocaleString(undefined, {minimumFractionDigits: 2})
      : ''
  }, [])

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={clickHandler}
        role="button"
        aria-expanded={rowDetailExpanded}
        aria-label={labelId}
        tabIndex={-1}
        className={classes.tableRow}
      >
        <TableCell padding="checkbox">
          <ButtonBase aria-label={labelId}>
            {rowDetailExpanded ? (
              <KeyboardArrowDownIcon fontSize="small" />
            ) : (
              <KeyboardArrowRightIcon fontSize="small" />
            )}
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

        <TableCell id={labelId} component="th" scope="row" align="right">
          {data['CLASS CODE']}
        </TableCell>
        <TableCell>{data['CLASSIFICATION TITLE']}</TableCell>
        <TableCell>{data['PLAN']}</TableCell>
        <TableCell align="right">{frmt(data.range)}</TableCell>
        <TableCell align="right">{frmt(data.stepA)}</TableCell>
        <TableCell align="right">{frmt(data.stepB)}</TableCell>
        <TableCell align="right">{frmt(data.stepC)}</TableCell>
        <TableCell align="right">{frmt(data.stepD)}</TableCell>
        <TableCell align="right">{frmt(data.stepE)}</TableCell>
        <TableCell align="right">{frmt(data.stepF)}</TableCell>
      </TableRow>
      {rowDetailExpanded ? (
        <React.Fragment>
          <TableRow>
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell align="right">
              {frmt(data.stepAMonthly)}
            </DetailTableCell>
            <DetailTableCell align="right">
              {frmt(data.stepBMonthly)}
            </DetailTableCell>
          </TableRow>
          <TableRow>
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell />
            <DetailTableCell align="right">
              {frmt(data.stepAAnnual)}
            </DetailTableCell>
            <DetailTableCell align="right">
              {frmt(data.stepBAnnual)}
            </DetailTableCell>
          </TableRow>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  )
}

export default SalaryScheduleRow
