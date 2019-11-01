import React from 'react'
import {Typography as Type} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
// import {createStyles, makeStyles} from '@material-ui/core/styles'

// const useStyles = makeStyles(() =>
//   createStyles({
//   })
// )

const SmartWaterUsePage = () => {
  // const classes = useStyles()
  return (
    <PageLayout title="Smart Water Use">
      <MainBox>
        <WideContainer>
          <Type>Smart Water Use</Type>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default SmartWaterUsePage
