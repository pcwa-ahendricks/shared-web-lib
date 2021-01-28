import React, {useState} from 'react'
import {Box, ButtonBase, Collapse, Tooltip} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/CloseRounded'
import {BoxProps} from '@material-ui/core/Box'

type Props = {children?: React.ReactNode} & BoxProps

const CloseableInfoBox = ({children, ...rest}: Props) => {
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
