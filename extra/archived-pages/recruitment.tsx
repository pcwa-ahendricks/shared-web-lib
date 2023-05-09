//cspell:ignore showinfo
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {Box} from '@mui/material'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'

const RecruitmentPage = () => {
  return (
    <PageLayout title="Recruitment Video" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Recruitment Video" subtitle="Careers" />

          <Box mt={6}>
            <ResponsiveYouTubePlayer
              controls
              url="https://www.youtube.com/watch?v=aQu5AtFH1N0"
              config={{
                youtube: {
                  playerVars: {showinfo: 1}
                }
              }}
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
