import React from 'react'
import {Typography as Type} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'

const StewardshipPage = () => {
  return (
    <PageLayout title="Smart Water Use">
      <WideContainer>
        <MainBox>
          <Type>Smart Water Use</Type>
        </MainBox>
      </WideContainer>
    </PageLayout>
  )
}

export default StewardshipPage
