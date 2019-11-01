import React from 'react'
import {Box, Typography as Type, Divider} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'

const BoardOfDirectorsPage = () => {
  return (
    <PageLayout title="Board of Directors" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="PCWA Board of Directors" />
          <Box mt={6}>
            <Type variant="h3" gutterBottom>
              Treated Water
            </Type>
          </Box>
          <Box mt={6}>
            <Type variant="h3" gutterBottom>
              Irrigation Canal Water
            </Type>
            <Type paragraph>
              For new service, please call Customer Services for details on
              water availability and rates.
            </Type>
          </Box>
          <Box mt={6}>
            <Divider />
          </Box>
          <Box mt={6}>
            <Type variant="h4" gutterBottom>
              Moving or Selling - Terminating Services
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BoardOfDirectorsPage
