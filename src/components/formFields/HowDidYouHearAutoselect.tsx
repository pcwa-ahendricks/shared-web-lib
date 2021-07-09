import React, {useMemo} from 'react'
import {TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
const options = [
  {title: 'Radio'},
  {title: 'TV Commercial'},
  {title: 'Facebook/Twitter'},
  {title: 'News'},
  {title: 'Newspaper'},
  {title: 'PCWA Staff'},
  {title: 'Website'}
]

export default function HowDidYouHearAutocomplete() {
  const sortedOpt = useMemo(
    () =>
      options.sort((a, b) =>
        a.title.toUpperCase().localeCompare(b.title.toUpperCase())
      ),
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
          required
          label="How Did You Hear About this Rebate Program"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  )
}
