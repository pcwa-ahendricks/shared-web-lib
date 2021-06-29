// cspell:ignore frmt
import React, {useMemo, useCallback} from 'react'
import {TableRow, TableCell} from '@material-ui/core'
import {format} from 'date-fns'
import round from '@lib/round'
import {ZippedTableDataItem} from '@pages/recreation/flows/gages/[pid]'

type Props = {
  data: ZippedTableDataItem
  timestampFormat: string
}

const PiTableRow = ({data, timestampFormat}: Props) => {
  const formatNumber = useCallback(
    (no: number) =>
      round(no, 2).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
    []
  )

  const {values, timestamp} = data
  const colBIndex = useMemo(
    () => values.findIndex((i) => i.columnNo === 2),
    [values]
  )
  const colCIndex = useMemo(
    () => values.findIndex((i) => i.columnNo === 3),
    [values]
  )
  const colDIndex = useMemo(
    () => values.findIndex((i) => i.columnNo === 4),
    [values]
  )

  const hasColB = colBIndex >= 0
  const hasColC = colCIndex >= 0
  const hasColD = colDIndex >= 0

  const tableRowEl = useMemo(
    () =>
      values.length > 0 ? (
        <TableRow tabIndex={-1}>
          <TableCell component="th" scope="row">
            {format(timestamp, timestampFormat)}
          </TableCell>
          {hasColB ? (
            <TableCell align="right">
              {formatNumber(values[colBIndex].value)}
            </TableCell>
          ) : null}
          {hasColC ? (
            <TableCell align="right">
              {formatNumber(values[colCIndex].value)}
            </TableCell>
          ) : null}
          {hasColD ? (
            <TableCell align="right">
              {formatNumber(values[colDIndex].value)}
            </TableCell>
          ) : null}
        </TableRow>
      ) : null,
    [
      formatNumber,
      timestampFormat,
      colBIndex,
      colCIndex,
      colDIndex,
      timestamp,
      values,
      hasColB,
      hasColC,
      hasColD
    ]
  )

  return <>{tableRowEl}</>
}

export default PiTableRow
