// cspell:ignore frmt
import React, {useCallback} from 'react'
import {TableRow, TableCell} from '@material-ui/core'
import {format} from 'date-fns'
import {UnclaimedProperty} from './UnclaimedPropertyTable'

type Props = {
  data: UnclaimedProperty
}

const UnclaimedPropertyTableRow = ({data}: Props) => {
  const frmt = useCallback((value: number | null) => {
    return value
      ? value.toLocaleString(undefined, {style: 'currency', currency: 'USD'})
      : ''
  }, [])

  return (
    <>
      <TableRow tabIndex={-1}>
        <TableCell component="th" scope="row">
          {data.owner}
        </TableCell>
        <TableCell align="right">{frmt(data.amount)}</TableCell>
        <TableCell>{format(data.date, 'M/dd/yyyy')}</TableCell>
      </TableRow>
    </>
  )
}

export default UnclaimedPropertyTableRow
