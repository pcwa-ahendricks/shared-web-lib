import React, {useMemo, useContext} from 'react'
import {
  Box,
  // Table,
  // TableBody,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableSortLabel,
  Theme,
  Toolbar,
  Typography as Type,
  useTheme,
  LinearProgress
} from '@material-ui/core'
// import {createStyles, makeStyles} from '@material-ui/styles'
import {PiContext} from '../PiStore'

type Props = {
  data?: any
}

// export interface UnclaimedPropertyData extends UnclaimedPropertyResponse {
//   id: string
// }

// type HeadRowId = keyof UnclaimedPropertyData

// const useStyles = makeStyles(() =>
//   createStyles({
//     tableWrapper: {
//       overflowX: 'scroll'
//     },
//     tableHeaderCell: {
//       whiteSpace: 'nowrap'
//       // textTransform: 'capitalize' // Doesn't work ??
//     },
//     visuallyHidden: {
//       border: 0,
//       clip: 'rect(0 0 0 0)',
//       height: 1,
//       margin: -1,
//       overflow: 'hidden',
//       padding: 0,
//       position: 'absolute',
//       top: 20,
//       width: 1
//     },
//     textField: {
//       width: 300
//     }
//   })
// )

const PiTable = ({data}: Props) => {
  const {state} = useContext(PiContext)
  const {isLoadingAttributeStreams: isLoading, activeGageItem} = state
  const theme = useTheme<Theme>()
  // const classes = useStyles()
  console.log(data)
  console.log(activeGageItem)

  // const headRows: {
  //   id: HeadRowId
  //   numeric: boolean
  //   disablePadding: boolean
  //   label: string
  // }[] = useMemo(
  //   () => [
  //     {
  //       id: 'owner',
  //       numeric: false,
  //       disablePadding: false,
  //       label: 'Owner on Record'
  //     },
  //     {
  //       id: 'amount',
  //       numeric: true,
  //       disablePadding: false,
  //       label: 'Amount'
  //     },
  //     {
  //       id: 'date',
  //       numeric: false,
  //       disablePadding: false,
  //       label: 'Date'
  //     }
  //   ],
  //   []
  // )

  const linearProgressEl = useMemo(
    () =>
      isLoading ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isLoading]
  )

  return (
    <Box
      boxShadow={2}
      bgcolor={theme.palette.common.white}
      m={3}
      p={3}
      position="relative"
    >
      {linearProgressEl}
      <Box bgcolor={theme.palette.common.white} boxShadow={1}>
        <Toolbar>
          <Type variant="h5" id="tableTitle">
            Pi-Chart
          </Type>
        </Toolbar>
      </Box>
    </Box>
  )
}

export default PiTable
