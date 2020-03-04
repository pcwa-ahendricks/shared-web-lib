// cspell:ignore overbox overtext
import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import clsx from 'clsx'

type Props = {
  src: string
}

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      cursor: 'pointer',
      height: '300',
      position: 'relative',
      overflow: 'hidden',
      width: 400,
      '& $img': {
        position: 'absolute',
        left: 0,
        '-webkit-transition': 'all 300ms ease-out',
        '-moz-transition': 'all 300ms ease-out',
        '-o-transition': 'all 300ms ease-out',
        '-ms-transition': 'all 300ms ease-out',
        transition: 'all 300ms ease-out'
      }
    },
    img: {}
  })
)

const ThumbOverlay = ({src}: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.box}>
      <img src={src} className={classes.img} />
      <div className="overbox">
        <div className={clsx('title overtext')}> Title </div>
        <div className={clsx('tagline overtext')}> Tagline </div>
      </div>
    </div>
  )
}

export default ThumbOverlay
