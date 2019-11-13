import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import FlexBox from '@components/boxes/FlexBox'
import {Box, useMediaQuery} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'

const NewDevelopmentPage = () => {
  const theme = useTheme()
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <PageLayout
      title="New Development Process"
      bannerComponent={
        <FlexBox>
          <Box
            m="auto"
            width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
            maxWidth={1400}
            height={{xs: 250, sm: 350}} // Original Photo is not very tall, so special treatment is given on smaller devices. 'objectFit' is also toggled to help with image display.
            overflow="hidden"
            position="relative"
          >
            <LazyImgix
              src="https://cosmicjs.imgix.net/5b81b990-6cdd-11e7-aa00-c3930981f23b-drafting_table.jpg"
              htmlAttributes={{
                alt: 'PCWA Water Efficiency Team',
                style: {
                  objectPosition: 'center 30%',
                  objectFit: isMDUp ? 'none' : 'cover', // Original Photo is not very tall, so special treatment is given on smaller devices. Container height is also toggled to help with image display.
                  width: '100%',
                  height: '100%'
                }
              }}
            />
          </Box>
        </FlexBox>
      }
    >
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="New Development Process"
            subtitle="Business with PCWA"
          />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default NewDevelopmentPage
