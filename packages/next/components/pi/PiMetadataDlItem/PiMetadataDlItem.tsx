// cspell:ignore infobox
import React from 'react'
import {createStyles, makeStyles} from '@material-ui/styles'
import {RowBox} from '@components/boxes/FlexBox'

type Props = {
  detailItem: {
    name: string
    value: string
  }
}

const useStyles = makeStyles(() =>
  createStyles({
    detailItem: {
      margin: '2px 0px',
      lineHeight: 24,
      '&:first-child': {
        marginTop: 0
      },
      '&:last-child': {
        marginBottom: 0
      },
      '&>dt,&>dd': {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  })
)

const PiMetadataDlItem = ({detailItem}: Props) => {
  const classes = useStyles()
  return (
    <RowBox className={classes.detailItem}>
      <dt>{detailItem.name}</dt>
      <dd>{detailItem.value}</dd>
    </RowBox>
  )
}

export default PiMetadataDlItem
