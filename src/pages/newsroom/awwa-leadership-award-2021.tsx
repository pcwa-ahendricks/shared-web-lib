import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import {Box} from '@material-ui/core'

export default function AcwaLeadershipAward2021Page() {
  return (
    <PageLayout title="ACWA Leadership Award 2021" waterSurface={false}>
      <MainBox>
        <WideContainer width="100%">
          <Box mb={{xs: -12, sm: -18, md: -24}}>
            <Image
              priority
              alt="ACWA Leadership Award Announcement"
              loader={imgixLoader}
              layout="responsive"
              quality={100}
              width={3840}
              height={4969}
              src="ded434c0-b429-11eb-8878-ff4aabf18769-21xx-EWL-Winners-Release.pdf"
            />
          </Box>
          <ResponsiveYouTubePlayer
            controls
            url="https://www.youtube.com/watch?v=hWG5qiD8OyY"
            config={{
              youtube: {
                playerVars: {showinfo: 1}
              }
            }}
          />
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
