// cspell:ignore frmt
import React, {useCallback} from 'react'
import {TableRow, TableCell} from '@mui/material'
import {format, isValid} from 'date-fns'
import {UnclaimedProperty} from './UnclaimedPropertyTable'

type Props = {
  data: UnclaimedProperty
}

const UnclaimedPropertyTableRow = ({data}: Props) => {
  const frmt = useCallback(
    (value: number) =>
      value
        ? value.toLocaleString(undefined, {style: 'currency', currency: 'USD'})
        : '',
    []
  )

  if (!isValid(data.date) || !data.amount) {
    return null
  }

  return (
    <TableRow tabIndex={-1}>
      <TableCell component="th" scope="row">
        {data.owner}
      </TableCell>
      <TableCell align="right">{frmt(data.amount)}</TableCell>
      <TableCell>{format(data.date, 'M/dd/yyyy')}</TableCell>
    </TableRow>
  )
}

export default UnclaimedPropertyTableRow
