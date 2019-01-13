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

export type ToolbarVariant = 'regular' | 'dense'
type ToolbarVariantState = [ToolbarVariant, (v: ToolbarVariant) => void]

const HeaderContainer = ({classes}: Props) => {
  const [toolbarVariant, setToolbarVariant]: ToolbarVariantState = useState(
    'regular'
  )

  const fixedToggleHandler = (wasFixed: boolean) => {
    if (wasFixed) {
      setToolbarVariant('regular')
    } else {
      setToolbarVariant('dense')
    }
  }

  return (
    <React.Fragment>
      <Hidden only="xs" implementation="css">
        <SecondaryHeader />
      </Hidden>
      <Sticky onFixedToggle={fixedToggleHandler} className={classes.sticky}>
        <PrimaryHeader toolbarVariant={toolbarVariant} />
      </Sticky>
    </React.Fragment>
  )
}

export default withStyles(styles)(HeaderContainer)
