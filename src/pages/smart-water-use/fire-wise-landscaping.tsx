import React from 'react'
import {
  Box,
  Typography as Type,
  createStyles,
  makeStyles
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'

const useStyles = makeStyles(() => createStyles({}))

const FireWiseLandscapingPage = () => {
  const classes = useStyles()

  return (
    <PageLayout title="Fire-wise Landscaping" waterSurface>
      <MainBox>
        <NarrowContainer>
          <Box>foo</Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FireWiseLandscapingPage
