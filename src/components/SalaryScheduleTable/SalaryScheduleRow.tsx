// cspell:ignore frmt
import React, {useState, useCallback} from 'react'
import {
  ButtonBase,
  Grow,
  TableRow,
  TableCell,
  TableCellProps,
  Tooltip
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {SalaryScheduleData} from '@components/SalaryScheduleTable/SalaryScheduleTable'
import useTheme from '@hooks/useTheme'

type Props = {
  data: SalaryScheduleData
}

const SalaryScheduleRow = ({data}: Props) => {
  const theme = useTheme()
  const style = {
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
      paddingTop: '3px',
      paddingBottom: '3px',
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(1)
    },
    detailRowCaption: {
      fontStyle: 'italic',
      whiteSpace: 'nowrap'
    }
  }

  const [rowDetailExpanded, setRowDetailExpanded] = useState<boolean>(true)

  const clickHandler = useCallback(() => {
    setRowDetailExpanded((isExpanded) => !isExpanded)
  }, [])

  const labelId = `table-row-detail-toggle-${data.id}`

  const DetailTableCell = ({children, ...rest}: TableCellProps) => {
    return (
      <TableCell
        sx={{
          ...style.root,
          '.MuiTableCell-body': {
            ...style.body
          },
          '.MuiTableCell-sizeSmall': {
            ...style.small
          }
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
    <>
      <TableRow
        hover
        onClick={clickHandler}
        role="button"
        aria-expanded={rowDetailExpanded}
        aria-label={labelId}
        tabIndex={-1}
        sx={{...style.tableRow}}
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
          <DetailTableCell colSpan={2} sx={{...style.detailRowCaption}}>
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
          <DetailTableCell colSpan={2} sx={{...style.detailRowCaption}}>
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
    </>
  )
}

export default SalaryScheduleRow
