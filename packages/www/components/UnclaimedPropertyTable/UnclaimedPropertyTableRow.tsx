// cspell:ignore frmt
import React, {useCallback} from 'react'
import {TableRow, TableCell} from '@material-ui/core'
import {UnclaimedPropertyData} from './UnclaimedPropertyTable'
import {format} from 'date-fns'

type Props = {
  data: UnclaimedPropertyData
}

const UnclaimedPropertyTableRow = ({data}: Props) => {
  const frmt = useCallback((value: number | null) => {
    return value
      ? value.toLocaleString(undefined, {style: 'currency', currency: 'USD'})
      : ''
  }, [])

  return (
    <React.Fragment>
      <TableRow tabIndex={-1}>
        <TableCell component="th" scope="row">
          {data.owner}
        </TableCell>
        <TableCell align="right">{frmt(data.amount)}</TableCell>
        <TableCell>{format(data.date, 'M/dd/yyyy')}</TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default UnclaimedPropertyTableRow
