import React, {useCallback} from 'react'
import {ColumnBox, RowBox} from '@components/MuiSleazebox'
import Head from 'next/head'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import {Box, Typography as Type} from '@mui/material'
import WebmasterEmail from '@components/links/WebmasterEmail'

/*
  Custom 404 page. See https://nextjs.org/docs/advanced-features/custom-error-page for more info.
*/

const NotFoundPage = () => {
  const statusCode = 404
  const title = 'This page could not be found'

  const ContactWebmasterEl = useCallback(
    () => (
      <Box m={6} textAlign="center" width={600} maxWidth="100%">
        <Type>
          Can't find the web page you are looking for? Let us know at{' '}
          <WebmasterEmail />.
        </Type>
      </Box>
    ),
    []
  )

  return (
    <>
      <Head>
        <title>{`${statusCode} - ${title} | pcwa.net`}</title>
        <meta
          name="description"
          content="PCWA is a water and energy provider for Placer County, CA."
        />
        <meta name="robots" content="noindex" />
      </Head>
      <ColumnBox height="100%">
        <Box m={3}>
          <PcwaLogo width={200} />
        </Box>
        <ColumnBox alignItems="center" justifyContent="center" height="100%">
          <RowBox alignItems="center">
            <Type
              component="span"
              variant="h2"
              sx={{paddingRight: '5px'}}
              color="secondary"
            >
              {statusCode}
            </Type>
            <Type
              component="span"
              variant="h2"
              color="textSecondary"
              sx={{paddingRight: '5px'}}
            >
              |
            </Type>
            <Type component="span" variant="h3" color="primary">
              {title}
            </Type>
          </RowBox>
          <ContactWebmasterEl />
        </ColumnBox>
      </ColumnBox>
    </>
  )
}

export default NotFoundPage
