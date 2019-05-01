import React from 'react'
import {withStyles, createStyles} from '@material-ui/core/styles'

type Props = {
  classes: any
  src: string
}

const styles = () =>
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

const ThumbOverlay = ({classes, src}: Props) => {
  return (
    <div className={classes.box}>
      <img src={src} className={classes.img} />
      <div className="overbox">
        <div className="title overtext"> Title </div>
        <div className="tagline overtext"> Tagline </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(ThumbOverlay)
