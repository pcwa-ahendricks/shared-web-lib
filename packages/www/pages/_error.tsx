import React, {useMemo} from 'react'
import {NextPageContext} from 'next'
import {ColumnBox, RowBox} from '@components/boxes/FlexBox'
import Head from 'next/head'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import {Box, Typography as Type} from '@material-ui/core'
import WebmasterEmail from '@components/links/WebmasterEmail'

/*
  Custom error page adapted from https://github.com/zeit/next.js/blob/master/packages/next/pages/_error.tsx. See https://nextjs.org/docs#custom-error-handling for more info.
*/

const statusCodes: {[code: number]: string} = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error'
}

type Props = {
  statusCode: number
  title?: string
}

const ErrorPage = ({statusCode, title: titleProp}: Props) => {
  const title =
    titleProp || statusCodes[statusCode] || 'An unexpected error has occurred'

  const contactWebmasterEl = useMemo(
    () =>
      statusCode === 404 ? (
        <Box width={600} m={6} textAlign="center">
          <Type>
            Can't find the web page you are looking for? Let us know at{' '}
            <WebmasterEmail />.
          </Type>
        </Box>
      ) : null,
    [statusCode]
  )

  return (
    <>
      <Head>
        <title>{`${statusCode} - ${title} | pcwa.net`}</title>
        <meta
          name="description"
          content="PCWA is a water and energy provider for Placer County, CA."
        />
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
              style={{paddingRight: 5}}
              color="secondary"
            >
              {statusCode}
            </Type>
            <Type
              component="span"
              variant="h2"
              color="textSecondary"
              style={{paddingRight: 5}}
            >
              |
            </Type>
            <Type component="span" variant="h3" color="primary">
              {title}
            </Type>
          </RowBox>
          {contactWebmasterEl}
        </ColumnBox>
      </ColumnBox>
    </>
  )
}

ErrorPage.getInitialProps = ({res, err}: NextPageContext) => {
  const statusCode =
    res && res.statusCode
      ? res.statusCode
      : err && err.statusCode
      ? err.statusCode
      : 404
  return {statusCode}
}

export default ErrorPage
