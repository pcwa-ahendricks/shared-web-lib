import React, {useState, useCallback} from 'react'
import Sticky from 'react-sticky-el'
import {withStyles, createStyles} from '@material-ui/core/styles'
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'
import {Hidden} from '@material-ui/core'

type Props = {
  classes: any
}

const styles = createStyles({
  sticky: {
    zIndex: 1
  }
})

const HeaderContainer = ({classes}: Props) => {
  const [parentFixed, setParentFixed] = useState(null)

  const fixedToggleHandler = useCallback((wasFixed: boolean) => {
    if (wasFixed) {
      setParentFixed(false)
    } else {
      setParentFixed(true)
    }
  }, [])

  return (
    <React.Fragment>
      <Hidden only="xs" implementation="css">
        <SecondaryHeader />
      </Hidden>
      <Sticky onFixedToggle={fixedToggleHandler} className={classes.sticky}>
        <PrimaryHeader parentFixed={parentFixed} />
      </Sticky>
    </React.Fragment>
  )
}

export default withStyles(styles)(HeaderContainer)
