import {Box, Typography as Type} from '@mui/material'
import React from 'react'

export default function HoursOfOperation() {
  return (
    <Box>
      <Type id="hours-of-operation" variant="subtitle1" gutterBottom={false}>
        Hours of Operation:
      </Type>
      <Type>
        <Type
          variant="body2"
          component="span"
          style={{
            fontFamily: 'Dona',
            fontWeight: 500
          }}
        >
          Phone:{' '}
        </Type>
        Monday through Thursday: 8am-5:30pm, Friday: 8am-5:00pm
        <br />
        <Type
          variant="body2"
          component="span"
          style={{
            fontFamily: 'Dona',
            fontWeight: 500
          }}
        >
          Lobby:{' '}
        </Type>
        Monday through Thursday: 8am-5pm, Friday: Closed
        <br />
      </Type>
    </Box>
  )
}
