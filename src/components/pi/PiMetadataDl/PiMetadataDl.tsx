// cspell:ignore infobox
import React, {useContext, useMemo} from 'react'
import {Box, Theme} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {blueGrey} from '@material-ui/core/colors'
import colorAlpha from 'color-alpha'
import PiMetadataDlItem from '../PiMetadataDlItem/PiMetadataDlItem'
import {PiContext, PiMetadata} from '../PiStore'
import isNumber from 'is-number'

type Props = {
  isLoading?: boolean
  streamSetMeta?: PiMetadata[]
}

type UseStylesProps = {
  hasItems: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoboxPanel: ({hasItems}: UseStylesProps) => ({
      display: hasItems ? 'block' : 'none',
      pointerEvents: 'none',
      backgroundColor: colorAlpha(blueGrey[50], 0.4),
      color: blueGrey[800],
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: 4
    }),
    detailList: {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    }
  })
)

const PiMetadataDl = ({isLoading = false, streamSetMeta = []}: Props) => {
  const {state} = useContext(PiContext)
  const {activeGageItem} = state

  const detailItems = useMemo(
    () =>
      streamSetMeta
        .filter((item) =>
          item.name.match(
            /usgs id|river basin|county|nearby city|longitude|latitude|hydro(logic)? area|map elevation/i
          )
        )
        .sort((a, b) => {
          const textA = a.name.toUpperCase()
          const textB = b.name.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
        // Particular formatting for Map Elevation (ex. 1024 -> 1,024" )
        .map((item) => {
          if (item.name.match(/map elevation/i) && isNumber(item.value)) {
            return {
              name: 'Map Elev.',
              value:
                typeof item.value === 'string'
                  ? `${parseFloat(item.value).toLocaleString()}"`
                  : `${item.value.toLocaleString()}'`
            }
          }
          return {
            ...item
          }
        })
        .map((item) =>
          item.name.match(/map elev\./i) && item.value.toString().match(/0'/i)
            ? {...item, value: 'N/A'}
            : {...item}
        )
        // Particular formatting for Hydrologic Area caption.
        .map((item) => {
          if (item.name.match(/hydro(logic)? area/i)) {
            return {
              name: 'Hydro. Area',
              value: item.value
            }
          }
          return {
            ...item
          }
        }),
    [streamSetMeta]
  )

  const classes = useStyles({hasItems: detailItems.length > 0})

  const pcwaIdEl = useMemo(
    () =>
      activeGageItem && activeGageItem.id ? (
        <PiMetadataDlItem
          detailItem={{
            name: 'PCWA ID',
            value: activeGageItem.id
          }}
          isLoading={isLoading}
        />
      ) : null,
    [activeGageItem, isLoading]
  )

  return (
    <Box className={classes.infoboxPanel}>
      <dl className={classes.detailList}>
        {pcwaIdEl}
        {detailItems.map((item) => (
          <PiMetadataDlItem
            key={item.name}
            detailItem={item}
            isLoading={isLoading}
          />
        ))}
      </dl>
    </Box>
  )
}

export default PiMetadataDl
