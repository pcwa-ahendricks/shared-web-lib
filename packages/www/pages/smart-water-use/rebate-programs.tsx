import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
// import {createStyles, makeStyles} from '@material-ui/core/styles'

// const useStyles = makeStyles(() =>
//   createStyles({
//   })
// )

const RebateProgramsPage = () => {
  // const classes = useStyles()
  return (
    <PageLayout title="Rebate Programs" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Rebate Programs" subtitle="Smart Water Use" />
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RebateProgramsPage
