// cspell:ignore overbox overtext
import React from 'react'
import clsx from 'clsx'
import {Box} from '@mui/material'

type Props = {
  src: string
}

const ThumbOverlay = ({src}: Props) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        height: '300',
        position: 'relative',
        overflow: 'hidden',
        width: 400
      }}
    >
      <img
        style={{
          position: 'absolute',
          left: 0,
          transition: 'all 300ms ease-out'
        }}
        src={src}
        alt="Thumbnail for uploaded file"
      />
      <div className="overbox">
        <div className={clsx('title overtext')}> Title </div>
        <div className={clsx('tagline overtext')}> Tagline </div>
      </div>
    </Box>
  )
}

export default ThumbOverlay
