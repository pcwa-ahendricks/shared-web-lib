import React, {useMemo, useCallback} from 'react'
import {
  Box,
  Theme,
  Link as MuiLink,
  Typography as Type,
  // lighten,
  // darken,
  Divider,
  CircularProgress,
  useTheme
} from '@material-ui/core'
// import {blueGrey} from '@material-ui/core/colors'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import MainPhone from '@components/links/MainPhone'
import Link from '@components/NextLink/NextLink'
import EventIcon from '@material-ui/icons/Event'
// import WavesIcon from '@material-ui/icons/Waves'
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
import {GetStaticProps} from 'next'
import fetcher from '@lib/fetcher'

type Props = {
  initialData?: CosmicObjectResponse<OutageMetadata>
}

interface OutageMetadata {
  hide_on_website: boolean
  last_updated: string
  type: string
}

const params = {
  hide_metafields: true,
  props: '_id,content,metadata,slug,status,title',
  type: 'outages'
}
const qs = stringify({...params}, true)
const outagesUrl = `/api/cosmic/objects${qs}`

const refreshInterval = 1000 * 60 * 2 // Two minute interval.

const options: HTMLReactParserOptions = {
  replace: ({children = [], attribs, name}) => {
    // if (!attribs) return

    // Strip ALL Style properties from HTML.
    if (attribs?.style) {
      attribs.style = ''
    }

    if (name === 'em') {
      return (
        <Type style={{fontStyle: 'italic'}} variant="body1" component="span">
          {domToReact(children, options)}
        </Type>
      )
    } else if (name === 'u') {
      return (
        <Type variant="h3" component="span">
          {domToReact(children, options)}
        </Type>
      )
    } else if (name === 'strong') {
      return (
        <Type variant="h6" component="span">
          {domToReact(children, options)}
        </Type>
      )
    } else if (name === 'p') {
      return (
        <Type variant="body1" paragraph>
          {domToReact(children, options)}
        </Type>
      )
    }
  }
}

const OutageInformationPage = ({initialData}: Props) => {
  const theme = useTheme<Theme>()
  // const paletteType = theme.palette.type === 'light' ? lighten : darken

  const {data: outages} = useSWR<CosmicObjectResponse<OutageMetadata>>(
    outagesUrl,
    {
      initialData,
      refreshInterval
    }
  )

  const outageContent = useCallback(
    (outageType: string) => {
      const re = new RegExp(outageType, 'gi')
      const f =
        outages && Array.isArray(outages.objects)
          ? outages.objects
              .filter(
                (outage) =>
                  outage?.metadata.hide_on_website === false &&
                  re.test(outage?.metadata.type)
              )
              .map((outage) => outage?.content)
              .shift() // [0]
          : ''
      return f ?? ''
    },
    [outages]
  )

  const parsedTreatedWaterOutagesContent = useMemo(() => {
    const treatedWaterOutagesHTML = outageContent('treated')
    if (!treatedWaterOutagesHTML) {
      return (
        <Type variant="body2" paragraph>
          No outages at this time.
        </Type>
      )
    }
    return <>{Parser(treatedWaterOutagesHTML ?? '', options)}</>
  }, [outageContent])

  const parsedRawWaterOutagesContent = useMemo(() => {
    const rawWaterOutagesHTML = outageContent('irrigation')
    if (!rawWaterOutagesHTML) {
      return (
        <Type variant="body2" paragraph>
          No outages at this time.
        </Type>
      )
    }
    return <>{Parser(rawWaterOutagesHTML ?? '', options)}</>
  }, [outageContent])

  const progressEl = useMemo(
    () =>
      !outages ? (
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
    [outages]
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
                {outages ? (
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
                // bgcolor={paletteType(theme.palette.warning.main, 0.92)}
                bgcolor={theme.palette.common.white}
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
                      // color: blueGrey[400]
                    }}
                  />
                  <Type gutterBottom variant="subtitle2" color="textPrimary">
                    2020 Annual PG&E Fall Canal Outage Schedule
                  </Type>
                </RowBox>
                <Type paragraph variant="body2" color="inherit">
                  Every year PG&E conducts it's Fall Canal Water Outage in order
                  to perform maintenance and inspection of it's canals. To see
                  start and end dates and to find out more information about
                  these outages{' '}
                  <MuiLink
                    href="https://cdn.cosmicjs.com/0d155d70-0e3d-11eb-9f4c-e15314e49fa9-2020-Annual-PGE-Fall-Canal-Outage.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2020 Annual PG&E Fall Canal Outage Schedule"
                    underline="always"
                  >
                    <ClickOrTap /> here for the current Schedule
                  </MuiLink>
                  .
                </Type>
              </Box>
              {/* <Spacing />
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
                    2020 Canal Cleaning Schedule
                  </Type>
                </RowBox>
                <Type paragraph variant="body2" color="inherit">
                  Every year canals are cleaned and are to be out of water
                  during cleaning. Outage times listed are approximate. Recovery
                  time for water service is approximately 12 hours. To see start
                  and end dates and to find out more information about these
                  outages{' '}
                  <MuiLink
                    href="https://cdn.cosmicjs.com/82f51820-4f50-11ea-b34a-6902eaea712b-2020-canal-cleaning.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Link to 2020 Canal Cleaning Schedule"
                    underline="always"
                  >
                    <ClickOrTap /> here for Zone 1 and Zone 3
                  </MuiLink>
                  .
                </Type>
              </Box> */}
              <Spacing size="large" />
              <Box
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

// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//   try {
//     const urlBase = lambdaUrl(req)
//     const initialData = await fetcher(`${urlBase}${outagesUrl}`)
//     return {props: {initialData}}
//   } catch (error) {
//     console.log('There was an error fetching outages.', error)
//     return {props: {}}
//   }
// }

// Called at build time.
export const getStaticProps: GetStaticProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const initialData = await fetcher(`${baseUrl}${outagesUrl}`)
    return {
      props: {initialData},
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching outages.', error)
    return {props: {}}
  }
}

export default OutageInformationPage
