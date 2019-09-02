import React from 'react'
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'
import {Hidden} from '@material-ui/core'

const HeaderContainer = () => {
  return (
    <React.Fragment>
      <Hidden only="xs" implementation="css">
        <SecondaryHeader />
      </Hidden>
      <PrimaryHeader />
    </React.Fragment>
  )
}

export default HeaderContainer
