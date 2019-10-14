// cspell:ignore frmt
import React, {useState, useCallback} from 'react'
import {
  ButtonBase,
  Grow,
  TableRow,
  TableCell,
  Theme,
  Tooltip
} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import {SalaryScheduleData} from '@components/SalaryScheduleTable/SalaryScheduleTable'
import {createStyles, makeStyles} from '@material-ui/core/styles'
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
      fontSize: '0.95rem'
    },
    small: {
      paddingTop: 3, // 1/2 of default.
      paddingRight: 24,
      paddingBottom: 3, // 1/2 of default.
      paddingLeft: 8
    },
    detailRowCaption: {
      fontStyle: 'italic',
      whiteSpace: 'nowrap'
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

  const frmt = useCallback((value: number | null, mfd = 2) => {
    return value
      ? value.toLocaleString(undefined, {minimumFractionDigits: mfd})
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
            <Tooltip
              title={rowDetailExpanded ? 'Collapse' : 'Expand'}
              enterDelay={500}
            >
              {rowDetailExpanded ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </Tooltip>
          </ButtonBase>
        </TableCell>

        <TableCell id={labelId} component="th" scope="row" align="right">
          {data['CLASS CODE']}
        </TableCell>
        <TableCell>{data['CLASSIFICATION TITLE']}</TableCell>
        <TableCell>{data['PLAN']}</TableCell>
        <TableCell align="right">{frmt(data.range, 1)}</TableCell>
        <TableCell align="right">{frmt(data.stepA)}</TableCell>
        <TableCell align="right">{frmt(data.stepB)}</TableCell>
        <TableCell align="right">{frmt(data.stepC)}</TableCell>
        <TableCell align="right">{frmt(data.stepD)}</TableCell>
        <TableCell align="right">{frmt(data.stepE)}</TableCell>
        <TableCell align="right">{frmt(data.stepF)}</TableCell>
      </TableRow>
      <Grow in={rowDetailExpanded} unmountOnExit>
        <TableRow>
          <DetailTableCell rowSpan={2} colSpan={3} />
          <DetailTableCell colSpan={2} className={classes.detailRowCaption}>
            monthly rate
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepAMonthly)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepBMonthly)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepCMonthly)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepDMonthly)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepEMonthly)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepFMonthly)}
          </DetailTableCell>
        </TableRow>
      </Grow>
      <Grow in={rowDetailExpanded} unmountOnExit>
        <TableRow>
          {/* <DetailTableCell rowSpan={2} colSpan={3} /> */}
          <DetailTableCell colSpan={2} className={classes.detailRowCaption}>
            annual rate
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepAAnnual)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepBAnnual)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepCAnnual)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepDAnnual)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepEAnnual)}
          </DetailTableCell>
          <DetailTableCell align="right">
            {frmt(data.stepFAnnual)}
          </DetailTableCell>
        </TableRow>
      </Grow>
    </React.Fragment>
  )
}

export default SalaryScheduleRow
