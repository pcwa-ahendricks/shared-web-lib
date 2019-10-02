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
import {GageConfigTable} from '@lib/services/pi/gage-config'
import {ZippedTableDataItem} from '../../../pages/recreation/flows/gages/[pid]'
import toTitleCase from '@lib/toTitleCase'
import useFriendlyNameMeta from '../hooks/useFriendlyNameMeta'
import useIsRiverGage from '../hooks/useIsRiverGage'
import useIsReservoirGage from '../hooks/useIsReservoirGage'

type Props = {
  data?: ZippedTableDataItem[]
  metric: GageConfigTable['metric']
  headers: GageConfigTable['headers']
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

const PiTable = ({data, metric, headers}: Props) => {
  const {state} = useContext(PiContext)
  const {isLoadingTableData: isLoading, activeGageItem, streamSetMeta} = state
  const friendlyName = useFriendlyNameMeta()
  const isRiver = useIsRiverGage()
  const isReservoir = useIsReservoirGage()
  const theme = useTheme<Theme>()
  // const classes = useStyles()
  // console.log(data)
  console.log('TBL metric', metric)
  console.log('TBL headers', headers)
  console.log('TBL data', data)

  const tableTitle = useMemo(() => {
    if (!data || !streamSetMeta || !activeGageItem) {
      return ' '
    }
    const firstPart = isReservoir
      ? `${friendlyName}`
      : isRiver
      ? `Gaging Station ${activeGageItem.id.toUpperCase()}`
      : ''

    // const secondPart = data.units ? ` - ${attributeLabel} in ${data.units}` : ''
    const secondPart = metric ? ` - ${toTitleCase(metric)} Data` : ''
    return `${firstPart}${secondPart}`
  }, [
    activeGageItem,
    friendlyName,
    data,
    streamSetMeta,
    isRiver,
    isReservoir,
    metric
  ])

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
          <Type variant="h3" id="tableTitle">
            {tableTitle}
          </Type>
        </Toolbar>
      </Box>
    </Box>
  )
}

export default PiTable
