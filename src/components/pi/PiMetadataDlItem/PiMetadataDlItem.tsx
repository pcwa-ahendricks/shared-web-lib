// cspell:ignore infobox
import React from 'react'
import {RowBox} from '@components/boxes/FlexBox'
import {PiMetadata} from '../PiStore'
import {Typography as Type, createStyles, makeStyles} from '@material-ui/core'
import clsx from 'clsx'

type Props = {
  detailItem: PiMetadata
  isLoading?: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    detailItem: {
      margin: '2px 0px',
      lineHeight: '24px',
      '&:first-child': {
        marginTop: 0
      },
      '&:last-child': {
        marginBottom: 0
      },
      '&$isLoading': {
        color: 'transparent',
        textShadow: '0 0 4px rgba(0,0,0,0.5)'
      }
    },
    isLoading: {},
    dt: {
      flex: '0 0 50%',
      textAlign: 'right',
      fontWeight: 400
    },
    dd: {
      flex: '0 0 50%',
      textAlign: 'left',
      marginLeft: '8px', // Reset browser style which may default to 40px.
      fontWeight: 500
    }
  })
)

const PiMetadataDlItem = ({detailItem, isLoading = false}: Props) => {
  const classes = useStyles()
  return (
    <RowBox
      className={clsx(classes.detailItem, {[classes.isLoading]: isLoading})}
    >
      <Type component="dt" className={classes.dt} variant="subtitle2">
        {detailItem.name}
      </Type>
      <Type component="dd" className={classes.dd} variant="subtitle2">
        {detailItem.value}
      </Type>
    </RowBox>
  )
}

export default PiMetadataDlItem
