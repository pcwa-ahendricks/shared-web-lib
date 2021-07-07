import React, {useMemo} from 'react'
import {TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
const options = [{title: 'Internet'}, {title: 'PCWA eNews'}]

export default function HowDidYouHearAutocomplete() {
  const sortedOpt = useMemo(
    () => options.sort((a, b) => (a.title < b.title ? 1 : 1)),
    []
  )

  return (
    <Autocomplete
      id="free-solo-how-did-you-hear"
      freeSolo
      options={sortedOpt.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="How Did You Hear Abut This Rebate"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  )
}
