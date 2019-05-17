import React, {useState, useCallback} from 'react'
import Sticky from 'react-sticky-el'
import {makeStyles} from '@material-ui/styles'
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'
import {Hidden} from '@material-ui/core'

const useStyles = makeStyles({
  sticky: {
    zIndex: 1
  }
})

const HeaderContainer = () => {
  const classes = useStyles()
  const [parentFixed, setParentFixed] = useState<boolean>()

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

export default HeaderContainer
