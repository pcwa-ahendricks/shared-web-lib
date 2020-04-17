// cspell:ignore mailchimp scrollable
import React, {
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useState
} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta,
  CosmicMediaResponse,
  CosmicObjectResponse
} from '@lib/services/cosmicService'
import {compareDesc, parseJSON, format, parseISO, parse} from 'date-fns'
import NextLink, {LinkProps} from 'next/link'
import groupBy from '@lib/groupBy'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography as Type,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TabProps,
  Button,
  useMediaQuery
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import {GetServerSideProps} from 'next'
import queryParamToStr from '@lib/services/queryParamToStr'
import ErrorPage from '@pages/_error'
import {
  RespRowBox,
  ChildBox,
  RowBox,
  ColumnBox
} from '@components/boxes/FlexBox'
import NewsroomSidebar from '@components/newsroom/NewsroomSidebar/NewsroomSidebar'
import Spacing from '@components/boxes/Spacing'
import {
  NewsroomContext,
  GroupedNewsletters,
  setNewsletterYear,
  setNewsletters,
  setEnewsDialogOpen
} from '@components/newsroom/NewsroomStore'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {isWebUri} from 'valid-url'
import PublicationCard, {
  PublicationCardProps
} from '@components/newsroom/PublicationCard/PublicationCard'
import lambdaUrl from '@lib/lambdaUrl'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import fetch from 'isomorphic-unfetch'

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

interface EnewsBlastMetadata {
  mailchimpURL?: string
  distributionDate: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type Props = {
  newsletters?: GroupedNewsletters
  tabIndex: number
  initialEnewsBlasts?: CosmicObjectResponse<EnewsBlastMetadata>
  err?: {statusCode: number}
}

const cosmicGetMediaProps = {
  props: '_id,original_name,imgix_url'
}

export const cosmicFetcher = (
  apiUrl: RequestInfo,
  type: string,
  props: string
) => {
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: 1, // Defaults to a higher level appearing over mega menu.
      margin: 'auto', // [HACK] Center maxWidth appBar.
      maxWidth: 'calc(100% - 6px)' // [HACK] Don't cutoff box shadow from left and right edge.
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    listItem: {
      alignItems: 'flex-start'
    }
  })
)

const PublicationsPage = ({
  newsletters: newslettersProp,
  tabIndex: tabIndexProp,
  err,
  initialEnewsBlasts
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [tabIndex, setTabIndex] = useState(0)
  const newsroomContext = useContext(NewsroomContext)
  const {newsletters, newsletterYear} = newsroomContext.state
  const newsroomDispatch = newsroomContext.dispatch

  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  const TabPanel = useCallback(
    ({children, value, index, ...other}: TabPanelProps) => (
      <Type
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        <Box>{children}</Box>
      </Type>
    ),
    []
  )

  const a11yProps = useCallback(
    (index: any) => ({
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`
    }),
    []
  )

  // Use shallow routing with tabs so that extra api requests are skipped. MultimediaList and Enews Blasts are saved using Context API. Shallow routing will skip getInitialProps entirely.
  const LinkTab = useCallback(
    ({href, as, ...rest}: TabProps<'a'> & LinkProps) => (
      <NextLink passHref href={href} as={as} shallow>
        <Tab component="a" {...rest} />
      </NextLink>
    ),
    []
  )

  useEffect(() => {
    if (newslettersProp && newslettersProp?.length > 0) {
      newsroomDispatch(setNewsletters(newslettersProp))
    }
  }, [newslettersProp, newsroomDispatch])

  const {data: enewsData} = useSWR<CosmicObjectResponse<EnewsBlastMetadata>>(
    ['/api/cosmic/objects', 'enews-blasts', '_id,metadata,status,title'],
    cosmicFetcher,
    {
      initialData: initialEnewsBlasts
    }
  )

  const enewsBlasts = useMemo(
    () =>
      enewsData?.objects && Array.isArray(enewsData?.objects)
        ? enewsData?.objects.map((blast) => ({
            id: blast._id,
            title: blast.title,
            mailchimpURL: isWebUri(blast.metadata?.mailchimpURL ?? '') ?? '', // isWebUri returns undefined on failure.
            distributionDate: parse(
              blast.metadata?.distributionDate,
              "yyyy'-'MM'-'dd'",
              new Date()
            )
          }))
        : [],
    [enewsData]
  )

  const maxYear = useMemo(
    () =>
      newsletters.reduce(
        (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
        2000
      ),
    [newsletters]
  )

  const selectYear = newsletterYear ?? maxYear

  const handleChange = useCallback(
    (event: React.ChangeEvent<{value: unknown}>) => {
      newsroomDispatch(setNewsletterYear(event.target.value as number))
    },
    [newsroomDispatch]
  )

  const newslettersForYear = useMemo(
    () =>
      newsletters
        .find((g) => g.year === selectYear)
        ?.values.map((n, idx) => ({...n, id: idx})) ?? [],
    [newsletters, selectYear]
  )

  const tabChangeHandler = useCallback((_, newValue) => {
    setTabIndex(newValue)
  }, [])

  useEffect(() => {
    setTabIndex(tabIndexProp)
  }, [tabIndexProp])

  const sortedEnewsBlasts = useMemo(
    () =>
      enewsBlasts.sort((a, b) =>
        compareDesc(a.distributionDate, b.distributionDate)
      ),
    [enewsBlasts]
  )

  const subscribeEnewsHandler = useCallback(() => {
    newsroomDispatch(setEnewsDialogOpen(true))
  }, [newsroomDispatch])

  const pubCardMargin = 8
  const pubCardImgWidth = isLGUp ? 300 : isMDUp ? 235 : 180
  const pubCardImgHeight = isLGUp ? 250 : isMDUp ? 187 : 133
  const PubCard = useCallback(
    ({...props}: PublicationCardProps) => {
      return (
        <PublicationCard
          mx={isXS ? 'auto' : 0}
          cardMediaHeight={pubCardImgHeight}
          cardMediaWidth={pubCardImgWidth}
          {...props}
        />
      )
    },
    [isXS, pubCardImgWidth, pubCardImgHeight]
  )

  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  return (
    <PageLayout title="Publications" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Publications" subtitle="Newsroom" hideDivider />
          <AppBar
            position="relative"
            color="default"
            classes={{root: classes.appBar}}
            elevation={2}
            square={false}
          >
            <Tabs
              value={tabIndex}
              onChange={tabChangeHandler}
              aria-label="nav tabs example"
              // variant="fullWidth"
              // variant="scrollable"
              scrollButtons="auto"
              variant={isMDUp ? 'standard' : 'scrollable'}
              centered={isMDUp ? true : false}
              // textColor="secondary"
              // indicatorColor="secondary"
            >
              <LinkTab
                label="Newsletters"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/newsletters"
                {...a11yProps(0)}
              />
              <LinkTab
                label="Fire & Water"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/fire-and-water"
                {...a11yProps(1)}
              />
              <LinkTab
                label="Year End Reports"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/year-end"
                {...a11yProps(2)}
              />
              <LinkTab
                label="E-News"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/enews"
                {...a11yProps(3)}
              />
            </Tabs>
          </AppBar>

          <Spacing size="large" />
          <RespRowBox flexSpacing={4} width="100%">
            <ChildBox flex="auto">
              <TabPanel value={tabIndex} index={0}>
                <Spacing />
                <Box>
                  <Type color="primary" variant="subtitle1">
                    Filter Newsletters by Year
                  </Type>
                  <Spacing size="x-small" />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="newsletter-year-select-label">
                      Year
                    </InputLabel>
                    <Select
                      labelId="newsletter-year-select-label"
                      id="newsletter-year-select"
                      value={selectYear}
                      onChange={handleChange}
                      MenuProps={{
                        keepMounted: true,
                        PaperProps: {
                          // This won't work. Use style directly. See https://material-ui.com/components/menus/#max-height-menus.
                          // classes: {
                          //   root: classes.selectMenu
                          // }
                          style: {
                            maxHeight: '35vh',
                            minHeight: 100,
                            overflowY: 'scroll'
                          }
                        }
                      }}
                    >
                      {newsletters.map((g) => (
                        <MenuItem key={g.year} value={g.year}>
                          {g.year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Spacing size="large" />
                <Box>
                  <List>
                    {newslettersForYear.map((n) => (
                      <Box key={n.id} mb={2}>
                        <NextLink
                          passHref
                          href="/newsroom/publications/newsletters/[publish-date]"
                          as={`/newsroom/publications/newsletters/${n.derivedFilenameAttr?.date}`}
                          scroll
                        >
                          <ListItem
                            button
                            component="a"
                            classes={{root: classes.listItem}}
                          >
                            <ListItemAvatar>
                              <ColumnBox
                                bgcolor={theme.palette.common.white}
                                borderColor={theme.palette.grey['300']}
                                border={1}
                                mr={2}
                                width={75}
                              >
                                <LazyImgix
                                  width={75}
                                  src={n.imgix_url}
                                  htmlAttributes={{
                                    alt: `Thumbnail image for ${n.derivedFilenameAttr?.date} Newsletter`
                                  }}
                                />
                              </ColumnBox>
                            </ListItemAvatar>
                            <ListItemText
                              primary={n.derivedFilenameAttr?.title}
                              secondary={format(
                                parseISO(
                                  n.derivedFilenameAttr?.publishedDate ?? ''
                                ),
                                'MMMM do'
                              )}
                            />
                          </ListItem>
                        </NextLink>
                      </Box>
                    ))}
                  </List>
                </Box>
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                {/* isXS used w/ props below (and <PubCard/>) allow for horizontal centering of wrapping flex items on mobile devices. */}
                <RowBox
                  flexWrap="wrap"
                  flexSpacing={isXS ? 0 : pubCardMargin}
                  mt={-pubCardMargin}
                >
                  <ChildBox mt={pubCardMargin} width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2019"
                      publishedDate={parse(
                        '06/01/2019',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://cosmic-s3.imgix.net/088f4270-a25f-11e9-8d2c-2b0caf998b3e-Fire-and-water-2019-Final.pdf"
                    />
                  </ChildBox>
                  <ChildBox mt={pubCardMargin} width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2018"
                      publishedDate={parse(
                        '06/01/2018',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://cosmic-s3.imgix.net/50f7b4e0-8c64-11e9-a2aa-e111fd002881-Fire-and-Water-2018.pdf"
                      thumbImgixURL="https://cosmic-s3.imgix.net/1c9bd360-4871-11ea-83cb-8f40f59ef2f9-fire-water-2018-thumbnail.png"
                      imgixCropMode="bottom"
                    />
                  </ChildBox>
                  <ChildBox mt={pubCardMargin} width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2017"
                      publishedDate={parse(
                        '06/01/2017',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://cosmic-s3.imgix.net/6c45e8a0-e681-11e7-8b87-05a286370fcd-2017_Fire Water.pdf"
                      thumbImgixURL="https://cosmic-s3.imgix.net/228a8870-4871-11ea-83cb-8f40f59ef2f9-fire-water-2017-thumbnail.png"
                      imgixCropMode="mid" // There is no "mid" mode crop, but it will pass an bogus value to the component instead of undefined or an empty string resulting in a "top" mode crop. Imgix api doesn't care if it receives a bogus value, it will default to a center image crop. See https://docs.imgix.com/apis/url/size/crop for more info.
                    />
                  </ChildBox>
                </RowBox>
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                {/* isXS used w/ props below (and <PubCard/>) allow for horizontal centering of wrapping flex items on mobile devices. */}
                <RowBox
                  flexWrap="wrap"
                  flexSpacing={isXS ? 0 : pubCardMargin}
                  mt={-pubCardMargin}
                >
                  <ChildBox mt={pubCardMargin} width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2019 Year End Report"
                      publishedDate={parse(
                        '12/30/2019',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://cosmic-s3.imgix.net/1dc4d750-2b57-11ea-bfe8-5b62c3bdf959-2019-YEAR-END-REPORT-FINAL.pdf"
                    />
                  </ChildBox>
                  <ChildBox mt={pubCardMargin} width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2018 Year End Report"
                      publishedDate={parse(
                        '12/27/2018',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://cosmic-s3.imgix.net/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf"
                    />
                  </ChildBox>
                  <ChildBox mt={pubCardMargin} width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2017 Year End Report"
                      publishedDate={parse(
                        '12/08/2017',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://cosmic-s3.imgix.net/8c7f3aa0-dc67-11e7-990e-7f57b6eb4a14-PCWA_2017_Year_End_Report.pdf"
                    />
                  </ChildBox>
                </RowBox>
              </TabPanel>
              <TabPanel value={tabIndex} index={3}>
                <RespRowBox flexSpacing={4}>
                  <ChildBox flex="50%">
                    <Type paragraph>
                      As your water provider, we’re committed to keeping you
                      informed about news that relates to you. PCWA’s E-News
                      will send you important email updates about your water
                      supply, water quality, legislative updates, construction
                      alerts and more. Please add us to your email address book.
                      This helps ensure news gets to you rather than your junk
                      box.
                    </Type>
                    <Button
                      color="secondary"
                      variant="contained"
                      size="large"
                      onClick={subscribeEnewsHandler}
                    >
                      Sign-up For E-News
                    </Button>
                  </ChildBox>
                  <ChildBox flex="50%" display="flex">
                    <Box mx="auto">
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/d8c86140-c4cd-11e7-bedc-43d6110cf0dd-e-news.png"
                        htmlAttributes={{
                          alt:
                            "Photo of Page Header to PCWA's E-News periodic email subscription"
                        }}
                      />
                    </Box>
                  </ChildBox>
                </RespRowBox>

                <Spacing size="large" />

                <List>
                  {sortedEnewsBlasts.map((blast) => {
                    const distDateFormatted = format(
                      blast.distributionDate,
                      'MM/dd/yyyy'
                    )
                    return (
                      <ListItem
                        key={blast.id}
                        component="a"
                        button
                        href={blast.mailchimpURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ListItemText
                          primary={`${distDateFormatted} - ${blast.title}`}
                        />
                      </ListItem>
                    )
                  })}
                </List>
              </TabPanel>
            </ChildBox>
            <ChildBox>
              <NewsroomSidebar />
            </ChildBox>
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

const fetchNewsletters = async (baseUrl: string) => {
  const bma = await getMedia<CosmicMediaResponse>(
    {
      folder: 'newsletters',
      ...cosmicGetMediaProps
    },
    undefined,
    baseUrl
  )
  if (!bma) {
    return
  }
  const bmaEx = bma.map((bm) => ({
    ...bm,
    derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
  }))
  // Group Newsletters by derived Year into JS Map.
  const grouped = groupBy<CosmicMediaMeta, number>(
    bmaEx,
    (mbm) => mbm.derivedFilenameAttr?.publishedYear
  )
  // Transform JS Map into a usable Array of Objects.
  const tmpSortedGroups = [] as GroupedNewsletters
  for (const [k, v] of grouped) {
    // Sort individual Newsletters by published date property.
    tmpSortedGroups.push({
      year: k,
      values: [...v].sort((a, b) =>
        compareDesc(
          parseJSON(a.derivedFilenameAttr?.publishedDate ?? ''),
          parseJSON(b.derivedFilenameAttr?.publishedDate ?? '')
        )
      )
    })
  }
  // Sort grouped database by Year.
  const sortedGroups = tmpSortedGroups.sort((a, b) => b.year - a.year)

  return sortedGroups
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
  req
}) => {
  try {
    const baseUrl = lambdaUrl(req)
    const publication = queryParamToStr(query['publication'])
    let tabIndex: number
    switch (publication.toLowerCase()) {
      case 'newsletters': {
        tabIndex = 0
        break
      }
      case 'fire-and-water': {
        tabIndex = 1
        break
      }
      case 'year-end': {
        tabIndex = 2
        break
      }
      case 'enews': {
        tabIndex = 3
        break
      }
      default: {
        tabIndex = -1
        throw new Error('Publication not found')
      }
    }

    const [newsletters, initialEnewsBlasts] = await Promise.all([
      fetchNewsletters(baseUrl),
      cosmicFetcher(
        `${baseUrl}/api/cosmic/objects`,
        'enews-blasts',
        '_id,metadata,status,title'
      )
    ])

    return {props: {newsletters, tabIndex, initialEnewsBlasts}}
  } catch (error) {
    console.log(error)
    res.statusCode = 404
    return {props: {err: {statusCode: 404}}}
  }
}

export default PublicationsPage
