import React from 'react'
import {Box, makeStyles, createStyles} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import {RowBox} from '@components/boxes/FlexBox'

type Props = {children: React.ReactNode; containerProps?: BoxProps} & BoxProps

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      // overflowX: 'scroll' // helps with debugging width issues. Added when debugging <AppBar/> for child <Tabs/> in [publication] Page, which uses <WideContainer/> and not this component. Duplicated here for consistency.
    }
  })
)

const NarrowContainer = ({children, containerProps, ...rest}: Props) => {
  const classes = useStyles()
  return (
    <RowBox justifyContent="space-around" {...containerProps}>
      <Box
        flex="auto"
        width="100%" // IE fix
        maxWidth={700} // Ported from original pcwa.net website (Semantic-UI).
        ml={2}
        mr={2}
        className={classes.box}
        {...rest}
      >
        {children}
      </Box>
    </RowBox>
  )
}

export default NarrowContainer
