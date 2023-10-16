import React, {useState} from 'react'
import {Box, BoxProps, ButtonBase, Collapse, Tooltip} from '@mui/material'
import CloseIcon from '@mui/icons-material/CloseRounded'

const CloseableInfoBox = ({children, ...rest}: BoxProps) => {
  const [showBox, setShowBox] = useState<boolean>(true)

  return (
    <Collapse in={showBox}>
      <Box>
        <Box p={1} zIndex={2} style={{float: 'right'}}>
          <Tooltip title="Close" enterDelay={400} placement="top-end">
            <ButtonBase aria-label="delete" onClick={() => setShowBox(false)}>
              <CloseIcon />
            </ButtonBase>
          </Tooltip>
        </Box>
        <Box {...rest} zIndex={1}>
          {children}
        </Box>
      </Box>
    </Collapse>
  )
}

export default CloseableInfoBox
