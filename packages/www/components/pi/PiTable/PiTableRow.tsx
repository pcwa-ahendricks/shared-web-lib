// cspell:ignore frmt
import React, {useMemo, useCallback} from 'react'
import {TableRow, TableCell} from '@material-ui/core'
import {GageConfigTable} from '@lib/services/pi/gage-config'
import {format} from 'date-fns'
import round from '@lib/round'

type Props = {
  data: any
  headers: GageConfigTable['headers']
  timestampFormat: string
}

const PiTableRow = ({data, headers, timestampFormat}: Props) => {
  const headerIds = useMemo(() => headers.map((h) => h.id), [headers])

  const formatNumber = useCallback((no: number) => no.toLocaleString(), [])

  const tableRowEl = useMemo(
    () =>
      headerIds.indexOf('flow') >= 0 ? (
        <TableRow tabIndex={-1}>
          <TableCell component="th" scope="row">
            {format(data.timestamp, timestampFormat)}
          </TableCell>
          <TableCell align="right">{data.flow}</TableCell>
          <TableCell align="right">{round(data.height, 2)}</TableCell>
        </TableRow>
      ) : (
        <TableRow tabIndex={-1}>
          <TableCell component="th" scope="row">
            {format(data.timestamp, timestampFormat)}
          </TableCell>
          <TableCell align="right">
            {formatNumber(round(data.storage, 0))}
          </TableCell>
          <TableCell align="right">
            {formatNumber(round(data.elevation, 2))}
          </TableCell>
        </TableRow>
      ),
    [headerIds, data, formatNumber, timestampFormat]
  )

  return <React.Fragment>{tableRowEl}</React.Fragment>
}

export default PiTableRow
