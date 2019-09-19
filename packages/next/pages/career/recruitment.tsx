import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import WideContainer from '@components/containers/WideContainer'
import {Box} from '@material-ui/core'
import ReactPlayer from 'react-player'

const RecruitmentPage = () => {
  return (
    <PageLayout title="Recruitment">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle title="Recruitment" subtitle="Careers" />

          <Box mt={6}>
            <ReactPlayer
              controls
              url="https://www.youtube.com/watch?v=aQu5AtFH1N0"
              width="100%"
              height={525}
            />
            {/* <iframe
              src="https://www.youtube.com/embed/aQu5AtFH1N0?wmode=transparent"
              width="100%"
              height="525px"
              frameBorder="0"
              allowFullScreen={true}
            /> */}
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RecruitmentPage
