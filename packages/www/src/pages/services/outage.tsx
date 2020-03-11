import React, {useMemo, useCallback} from 'react'
import {
  Box,
  Theme,
  Link as MuiLink,
  Typography as Type,
  Divider,
  CircularProgress
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {useTheme} from '@material-ui/core/styles'
import MainPhone from '@components/links/MainPhone'
import Link from '@components/NextLink/NextLink'
import EventIcon from '@material-ui/icons/Event'

import FlexBox, {
  RespRowBox,
  ChildBox,
  RowBox,
  ColumnBox
} from '@components/boxes/FlexBox'
import {CosmicObjectResponse} from '@lib/services/cosmicService'
import Parser, {domToReact, HTMLReactParserOptions} from 'html-react-parser'
import ShowMore from '@components/ShowMore/ShowMore'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import fetch from 'isomorphic-unfetch'
import {GetServerSideProps} from 'next'
import lambdaUrl from '@lib/lambdaUrl'

type Props = {
  initialData?: CosmicObjectResponse<OutageMetadata>
}

interface OutageMetadata {
  hide_on_website: boolean
  last_updated: string
  type: string
}

const fetcher = (apiUrl: RequestInfo, type: string, props: string) => {
  const params = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    hide_metafields: true,
    props,
    type
  }
  const qs = stringify({...params}, true)
  const url = `${apiUrl}${qs}`
  return fetch(url).then((r) => r.json())
}

const OutageInformationPage = ({initialData}: Props) => {
  const theme = useTheme<Theme>()

  const {data: outages, isValidating} = useSWR<
    CosmicObjectResponse<OutageMetadata>
  >(
    [
      '/api/cosmic/objects',
      'outages',
      '_id,content,metadata,slug,status,title'
    ],
    fetcher,
    {
      initialData
    }
  )

  const outageContent = useCallback(
    (outageType: string) => {
      const re = new RegExp(outageType, 'gi')
      const f =
        outages?.objects
          .filter(
            (outage) =>
              outage?.metadata.hide_on_website === false &&
              re.test(outage?.metadata.type)
          )
          .map((outage) => outage?.content)?.[0] ?? ''
      return f
    },
    [outages]
  )

  const treatedWaterOutagesHTML = useMemo(() => outageContent('treated'), [
    outageContent
  ])

  const rawWaterOutagesHTML = useMemo(() => outageContent('irrigation'), [
    outageContent
  ])

  const options: HTMLReactParserOptions = useMemo(
    () => ({
      replace: ({children, attribs, name}) => {
        // if (!attribs) return

        // Strip ALL Style properties from HTML.
        if (attribs?.style) {
          attribs.style = ''
        }

        if (name === 'em') {
          return (
            <Type
              style={{fontStyle: 'italic'}}
              variant="body1"
              component="span"
            >
              {domToReact(children, options)}
            </Type>
          )
        }

        if (name === 'u') {
          return (
            <Type variant="h3" component="span">
              {domToReact(children, options)}
            </Type>
          )
        }

        if (name === 'strong') {
          return (
            <Type variant="h6" component="span">
              {domToReact(children, options)}
            </Type>
          )
        }

        /* Lastly */
        if (name === 'p') {
          return (
            <Type variant="body1" paragraph>
              {domToReact(children, options)}
            </Type>
          )
        }
      }
    }),
    []
  )

  // console.log(hexToRgb(theme.palette.grey['100']))

  const parsedTreatedWaterOutagesContent = useMemo(() => {
    if (!treatedWaterOutagesHTML) {
      return (
        <Type variant="body2" paragraph>
          No outages at this time.
        </Type>
      )
    }
    return Parser(treatedWaterOutagesHTML, options)
  }, [treatedWaterOutagesHTML, options])

  const parsedRawWaterOutagesContent = useMemo(() => {
    if (!rawWaterOutagesHTML) {
      return (
        <Type variant="body2" paragraph>
          No outages at this time.
        </Type>
      )
    }
    return Parser(rawWaterOutagesHTML, options)
  }, [rawWaterOutagesHTML, options])

  const progressEl = useMemo(
    () =>
      isValidating ? (
        <ColumnBox
          position="absolute"
          width="100%"
          height="100%"
          justifyContent="center"
        >
          <RowBox justifyContent="center">
            <CircularProgress color="primary" />
          </RowBox>
        </ColumnBox>
      ) : null,
    [isValidating]
  )

  return (
    <PageLayout title="Outage Information" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Outage Information" subtitle="Services" />

          <RespRowBox flexSpacing={4}>
            <ChildBox flex="65%" display="flex" flexDirection="column">
              <Box mt={0}>
                <Type paragraph>
                  From time-to-time, water outages will occur. A water outage
                  could be planned or the result of infrastructure failure. The
                  outage may impact treated water and/or canal water customers.
                  For planned or scheduled water outages, PCWA does its best to
                  inform customers in advance. For additional information about
                  your canal, see{' '}
                  <Link href="/services/irrigation-canal">
                    Irrigation Canal Information
                  </Link>
                  .
                </Type>
                <Type paragraph>
                  To report an emergency water outage, please call PCWA Customer
                  Services at <MainPhone /> 24-hours a day. Our after hours
                  phone service and standby service crews are available to
                  assist you.
                </Type>
                <Type variant="h3" gutterBottom color="primary">
                  If there is an on-going water outage, up-to-date information
                  will be posted below:
                </Type>
              </Box>
              <Box position="relative" minHeight={250}>
                {progressEl}
                {!isValidating ? (
                  <>
                    <Box
                      bgcolor={theme.palette.common.white}
                      boxShadow={3}
                      mt={6}
                      p={3}
                    >
                      <Type variant="h2" gutterBottom>
                        {' '}
                        Treated Water Outages:
                      </Type>
                      {parsedTreatedWaterOutagesContent}
                    </Box>
                    <Box
                      bgcolor={theme.palette.common.white}
                      boxShadow={3}
                      mt={6}
                      p={3}
                    >
                      <Type variant="h2" gutterBottom>
                        {' '}
                        Raw Water Outages:
                      </Type>
                      {parsedRawWaterOutagesContent}
                    </Box>
                  </>
                ) : null}
              </Box>

              <FlexBox flex="1 1 auto" />
              <Spacing size="large" />
              <Box flex="0 1 auto">
                <Type variant="h4" gutterBottom>
                  Need More Assistance?
                </Type>
                <Type paragraph>
                  If you have specific concerns or questions, please call our
                  Customer Services Department at <MainPhone />.
                </Type>
              </Box>
            </ChildBox>
            <ChildBox flex="35%">
              <Box
                bgcolor={theme.palette.grey['100']}
                p={2}
                boxShadow={2}
                color={theme.palette.grey['800']}
              >
                <RowBox alignItems="center">
                  <EventIcon
                    color="inherit"
                    style={{
                      marginRight: theme.spacing(1),
                      alignSelf: 'stretch'
                    }}
                  />
                  <Type gutterBottom variant="subtitle2" color="textPrimary">
                    2019 Canal Cleaning Schedule
                  </Type>
                </RowBox>
                <Type paragraph variant="body2" color="inherit">
                  Every year canals are cleaned and are to be out of water
                  during cleaning. Outage times listed are approximate. Recovery
                  time for water service is approximately 12 hours. To see start
                  and end dates and to find out more information about these
                  outages{' '}
                  <MuiLink
                    href="https://cdn.cosmicjs.com/8ce089a0-07a3-11e9-9aa5-0dcd9afcf348-2019-Canal-Cleaning-Schedule-Z1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2019 Zone 1 Cleaning Schedule"
                  >
                    <ClickOrTap /> here for Zone 1
                  </MuiLink>{' '}
                  and{' '}
                  <MuiLink
                    href="https://cdn.cosmicjs.com/844fd980-07a3-11e9-90d0-7de5bd32aecd-2019-Canal-Cleaning-Schedule-Z3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2019 Zone 3 Cleaning Schedule"
                  >
                    <ClickOrTap /> here for Zone 3
                  </MuiLink>
                  .
                </Type>
              </Box>

              <Box
                mt={8}
                boxShadow={2}
                p={2}
                bgcolor={theme.palette.grey['100']}
                color={theme.palette.grey['800']}
              >
                <ShowMore
                  inMaxHeight={400}
                  outMaxHeight={7000}
                  inShowMoreTitle="Click to read more"
                  outShowMoreTitle="Click to read less"
                  backgroundImageRGB="245,245,245"
                >
                  <article>
                    <Type variant="subtitle2" gutterBottom color="textPrimary">
                      Consumer Guidance During Water Outages Or Periods Of Low
                      Pressure
                    </Type>
                    <Box my={1}>
                      <Divider />
                    </Box>
                    <ol style={{paddingInlineStart: theme.spacing(3)}}>
                      <Type component="li" variant="body2" paragraph>
                        If you are experiencing water outages or low water
                        pressure, immediately discontinue any non-essential
                        water use. This includes all outdoor irrigation and car
                        washing. Minimizing use will reduce the potential for
                        the water system to lose pressure or run out of water.
                      </Type>
                      <Type component="li" variant="body2" paragraph>
                        If the water looks cloudy or dirty, you should not drink
                        it. Upon return of normal water service, you should
                        flush the hot and cold water lines until the water
                        appears clear and the water quality returns to normal.
                      </Type>
                      <Type component="li" variant="body2" paragraph>
                        If you are concerned about the water quality or are
                        uncertain of its safety, you may add eight drops of
                        household bleach to one gallon of water and let it sit
                        for 30 minutes or alternatively, if you are able, water
                        can be boiled for one minute at a rolling boil to ensure
                        it is safe for consumption.
                      </Type>
                      <Type component="li" variant="body2" paragraph>
                        Use of home treatment devices does not guarantee the
                        water supply is safe after low pressure situations.
                      </Type>
                      <Type component="li" variant="body2" paragraph>
                        Do not be alarmed if you experience higher than normal
                        chlorine concentrations in your water supply since the
                        State Water Resources Control Board is advising public
                        water utilities to increase chlorine residuals in areas
                        subject to low pressure or outages.
                      </Type>
                      <Type component="li" variant="body2" paragraph>
                        The State Water Resources Control Board has also advised
                        public water systems to increase the bacteriological
                        water quality monitoring of the distribution system in
                        areas subject to low pressure. This may include
                        collecting samples in your area to confirm that the
                        water remains safe for consumption. You will be promptly
                        advised if the sampling reveals a water quality problem.
                      </Type>
                      <Type component="li" variant="body2" paragraph>
                        Placer County Water Agency is committed to ensuring that
                        an adequate quantity of clean, wholesome, and potable
                        water is delivered to you. We recommend that you discuss
                        the information in this notice with members of your
                        family to assure that all family members are prepared
                        should water outages or low water pressure occur.
                      </Type>
                    </ol>
                    <Box my={3}>
                      <Divider />
                    </Box>
                    <Type variant="body2" paragraph>
                      If you, at any time, experience an outage or low pressure
                      at your home or place of business please call Placer
                      County Water Agency at <MainPhone />. A customer service
                      representative will be more than happy to assist you with
                      any questions or concerns you may have.
                    </Type>
                  </article>
                </ShowMore>
              </Box>

              <RowBox mt={{xs: 6, sm: 6}} justifyContent="center">
                <LazyImgix
                  src="https://cosmic-s3.imgix.net/9a973a70-fc31-11e9-bead-495f6403df62-outage-img1.jpg"
                  htmlAttributes={{
                    alt: 'Photo of PCWA Flume',
                    style: {width: '100%', maxWidth: 275}
                  }}
                />
              </RowBox>
            </ChildBox>
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  try {
    const urlBase = lambdaUrl(req)
    const initialData = await fetcher(
      `${urlBase}/api/cosmic/objects`,
      'outages',
      '_id,content,metadata,slug,status,title'
    )
    return {props: {initialData}}
  } catch (error) {
    console.log('There was an error fetching outages.', error)
    return {props: {}}
  }
}

export default OutageInformationPage
