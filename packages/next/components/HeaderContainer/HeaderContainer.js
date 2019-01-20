// @flow
import React, {useState} from 'react'
import Sticky from 'react-sticky-el'
import {withStyles} from '@material-ui/core/styles'
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'
import {Hidden} from '@material-ui/core'

type Props = {
  classes: any
}

const styles = {
  sticky: {
    zIndex: 1
  }
}

const HeaderContainer = ({classes}: Props) => {
  const [parentFixed, setParentFixed] = useState(null)

  const fixedToggleHandler = (wasFixed: boolean) => {
    if (wasFixed) {
      setParentFixed(false)
    } else {
      setParentFixed(true)
    }
  }

  // Don't use CSS implementation of hide cause it will allow and trigger Forecast timers and fetch requests on mobile devices that won't display Forecast.
  return (
    <React.Fragment>
      <Hidden only="xs">
        <SecondaryHeader />
      </Hidden>
      <Sticky onFixedToggle={fixedToggleHandler} className={classes.sticky}>
        <PrimaryHeader parentFixed={parentFixed} />
      </Sticky>
    </React.Fragment>
  )
}

export default withStyles(styles)(HeaderContainer)
