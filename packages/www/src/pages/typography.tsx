import React from 'react'
import {Box, Typography as Type} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {ColumnBox} from '@components/boxes/FlexBox'
import {NextPageContext} from 'next'
import ErrorPage from './_error'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  err?: {statusCode: number}
}

const TypographyPage = ({err}: Props) => {
  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }
  return (
    <PageLayout title="Typography Test">
      <NarrowContainer>
        <MainBox>
          <ColumnBox p="10vmin">
            <Box m={1}>
              <Type variant="caption">Caption</Type>
            </Box>
            <Box m={1}>
              <Type variant="button">Button</Type>
            </Box>
            <Box m={1}>
              <Type variant="overline">Overline</Type>
            </Box>
            <Box m={1}>
              <Type variant="body1">Body1</Type>
            </Box>
            <Box m={1}>
              <Type variant="body2">Body2</Type>
            </Box>
            <Box m={1}>
              <Type variant="subtitle1">Subtitle1</Type>
            </Box>
            <Box m={1}>
              <Type variant="subtitle2">Subtitle2</Type>
            </Box>
            <Box m={1}>
              <Type variant="h1">H1 Primary Header</Type>
            </Box>
            <Box m={1}>
              <Type variant="h2">H2 Secondary Header</Type>
            </Box>
            <Box m={1}>
              <Type variant="h3">H3 Tertiary Header</Type>
            </Box>
            <Box m={1}>
              <Type variant="h4">H4 Fourth Header</Type>
            </Box>
            <Box m={1}>
              <Type variant="h5">H5 Fifth Header</Type>
            </Box>
            <Box m={1}>
              <Type variant="h6">H6 Sixth Header</Type>
            </Box>
          </ColumnBox>
        </MainBox>
      </NarrowContainer>
    </PageLayout>
  )
}

TypographyPage.getInitialProps = ({res}: NextPageContext) => {
  if (!isDev) {
    if (res) {
      res.statusCode = 404
    }
    return {err: {statusCode: 404}}
  } else {
    return {}
  }
}

export default TypographyPage
