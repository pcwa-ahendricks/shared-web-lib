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
  fileNameUtil,
  CosmicMediaMeta,
  CosmicMediaResponse,
  CosmicObjectResponse
} from '@lib/services/cosmicService'
import {
  compareDesc,
  parseJSON,
  format,
  // parseISO,
  parse,
  addMonths
} from 'date-fns'
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
  useMediaQuery,
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core'
import {GetStaticProps, GetStaticPaths} from 'next'
import {paramToStr} from '@lib/queryParamToStr'
import ErrorPage from '@pages/_error'
import {ChildBox, RowBox, ColumnBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import {
  NewsroomContext,
  GroupedNewsletters,
  setNewsletterYear,
  setEnewsDialogOpen
} from '@components/newsroom/NewsroomStore'
import {isWebUri} from 'valid-url'
import Image from 'next/image'
import PublicationCard, {
  PublicationCardProps
} from '@components/newsroom/PublicationCard/PublicationCard'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'

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
  publicationParam?: string
  initialEnewsBlasts?: CosmicObjectResponse<EnewsBlastMetadata>
  initialNewsletters?: CosmicMediaResponse
  err?: {statusCode: number}
}

export const cosmicFetcher = (
  apiUrl: RequestInfo,
  type: string,
  props: string
) => {
  const params = {
    hide_metafields: true,
    props,
    query: JSON.stringify({
      type
    })
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

const cosmicGetMediaProps = {
  props: 'id,original_name,imgix_url'
}
const params = {
  folder: 'newsletters',
  ...cosmicGetMediaProps
}
const qs = stringify({...params}, true)
const newslettersUrl = `/api/cosmic/media${qs}`

const PublicationsPage = ({
  err,
  initialEnewsBlasts,
  initialNewsletters,
  publicationParam = ''
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [tabIndex, setTabIndex] = useState(0)
  const newsroomContext = useContext(NewsroomContext)
  const newsroomDispatch = newsroomContext.dispatch
  const {newsletterYear} = newsroomContext.state

  const isLGUp = useMediaQuery(theme.breakpoints.up('lg'))
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  const {data: newslettersData} = useSWR<CosmicMediaResponse>(newslettersUrl, {
    fallbackData: initialNewsletters
  })

  useEffect(() => {
    // console.log('publicationParam: ', publicationParam)
    switch (publicationParam.toLowerCase()) {
      case 'newsletters': {
        setTabIndex(0)
        break
      }
      case 'fire-and-water': {
        setTabIndex(1)
        break
      }
      case 'year-end': {
        setTabIndex(2)
        break
      }
      case 'strategic-plans': {
        setTabIndex(3)
        break
      }
      case 'enews': {
        setTabIndex(4)
        break
      }
      default: {
        setTabIndex(-1)
      }
    }
  }, [publicationParam])

  const newsletters: GroupedNewsletters = useMemo(
    () =>
      newslettersData && Array.isArray(newslettersData)
        ? [
            // Group objects by derived Year into JS Map.
            ...groupBy<CosmicMediaMeta, number>(
              newslettersData
                .map((nr) => ({
                  ...nr,
                  derivedFilenameAttr: fileNameUtil(
                    nr.original_name,
                    DATE_FNS_FORMAT
                  )
                }))
                .filter((nr) => nr.derivedFilenameAttr.date), // Don't list links that will ultimately 404.
              (mnr) => mnr.derivedFilenameAttr?.publishedYear
            )
          ] // Spreading Map will convert Map into an Array.
            // Sort individual media objects by published date property.
            .map(([year, values]) => ({
              year,
              values: values.sort((a, b) =>
                compareDesc(
                  parseJSON(a.derivedFilenameAttr?.publishedDate ?? ''),
                  parseJSON(b.derivedFilenameAttr?.publishedDate ?? '')
                )
              )
            }))
            .sort((a, b) => b.year - a.year) // Sort grouped database by Year.
        : [],
    [newslettersData]
  )

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

  const {data: enewsData} = useSWR<CosmicObjectResponse<EnewsBlastMetadata>>(
    ['/api/cosmic/objects', 'enews-blasts', 'id,metadata,status,title'],
    cosmicFetcher,
    {
      fallbackData: initialEnewsBlasts
    }
  )

  const enewsBlasts = useMemo(
    () =>
      enewsData && Array.isArray(enewsData.objects)
        ? enewsData?.objects.map((blast) => ({
            id: blast.id,
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
          sizes="33vw"
          {...props}
        />
      )
    },
    [isXS, pubCardImgWidth, pubCardImgHeight]
  )

  const formatNewsletterDate = useCallback((media: any) => {
    const pubMonth = media?.derivedFilenameAttr?.publishedDate
      ? parseJSON(media.derivedFilenameAttr.publishedDate)
      : null
    const nextMonth = pubMonth ? addMonths(pubMonth, 1) : null
    if (pubMonth && nextMonth) {
      return `${format(pubMonth, 'MMMM')} - ${format(nextMonth, 'MMMM')}`
    }
    return ''
  }, [])

  if (err?.statusCode) {
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
                label="Strategic Plans"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/strategic-plans"
                {...a11yProps(3)}
              />
              <LinkTab
                label="E-News"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/enews"
                {...a11yProps(4)}
              />
            </Tabs>
          </AppBar>

          <Spacing size="large" />
          <RowBox responsive flexSpacing={4} width="100%">
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
                                <Image
                                  loader={imgixUrlLoader}
                                  layout="responsive"
                                  sizes="(max-width: 600px) 20vw, 10vw"
                                  width={850}
                                  height={1100}
                                  objectFit="cover"
                                  src={n.imgix_url}
                                  alt={`Thumbnail image for ${n.derivedFilenameAttr?.date} Newsletter`}
                                />
                              </ColumnBox>
                            </ListItemAvatar>
                            <ListItemText
                              primary={n.derivedFilenameAttr?.title}
                              secondary={formatNewsletterDate(n)}
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
                  wrapSpacing={pubCardMargin}
                >
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2021"
                      publishedDate={parse(
                        '08/12/2021',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/21555930-fbc6-11eb-9a4d-af05155ef55d-FireWater8.5x11LOW2021.pdf"
                      objectPosition="top center"
                    />
                  </ChildBox>
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2020"
                      publishedDate={parse(
                        '09/09/2020',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/cced2b40-f2e1-11ea-a3de-692d5982216c-Fire--Water---2020.pdf"
                      objectPosition="center center"
                    />
                  </ChildBox>
                  {/* <ChildBox  width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2019"
                      publishedDate={parse(
                        '06/01/2019',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/088f4270-a25f-11e9-8d2c-2b0caf998b3e-Fire-and-water-2019-Final.pdf"
                    />
                  </ChildBox>
                  <ChildBox  width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2018"
                      publishedDate={parse(
                        '06/01/2018',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/50f7b4e0-8c64-11e9-a2aa-e111fd002881-Fire-and-Water-2018.pdf"
                      thumbImgixURL="https://imgix.cosmicjs.com/1c9bd360-4871-11ea-83cb-8f40f59ef2f9-fire-water-2018-thumbnail.png"
                      imgixCropMode="bottom"
                    />
                  </ChildBox>
                  <ChildBox  width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="Fire & Water - 2017"
                      publishedDate={parse(
                        '06/01/2017',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/6c45e8a0-e681-11e7-8b87-05a286370fcd-2017_Fire Water.pdf"
                      thumbImgixURL="https://imgix.cosmicjs.com/228a8870-4871-11ea-83cb-8f40f59ef2f9-fire-water-2017-thumbnail.png"
                      imgixCropMode="mid"
                    />
                  </ChildBox> */}
                </RowBox>
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                {/* isXS used w/ props below (and <PubCard/>) allow for horizontal centering of wrapping flex items on mobile devices. */}
                <RowBox
                  flexWrap="wrap"
                  flexSpacing={isXS ? 0 : pubCardMargin}
                  wrapSpacing={pubCardMargin}
                >
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2021 Year End Report"
                      publishedDate={parse(
                        '1/28/2022',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/4ab2d130-7fd4-11ec-bfce-f334865cc167-2021YearEndReport.pdf"
                    />
                  </ChildBox>
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2020 Year End Report"
                      publishedDate={parse(
                        '2/03/2021',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/492aa9a0-6658-11eb-8120-dfe8ec2b682f-Year-End-Report-2020FINAL.pdf"
                    />
                  </ChildBox>
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2019 Year End Report"
                      publishedDate={parse(
                        '12/30/2019',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/1dc4d750-2b57-11ea-bfe8-5b62c3bdf959-2019-YEAR-END-REPORT-FINAL.pdf"
                    />
                  </ChildBox>
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2018 Year End Report"
                      publishedDate={parse(
                        '12/27/2018',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/61bcf350-104d-11e9-81dd-490e145a6cb6-2018-YEAR-END-REPORT---FINAL.pdf"
                    />
                  </ChildBox>
                  {/* <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2017 Year End Report"
                      publishedDate={parse(
                        '12/08/2017',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/8c7f3aa0-dc67-11e7-990e-7f57b6eb4a14-PCWA_2017_Year_End_Report.pdf"
                    />
                  </ChildBox> */}
                </RowBox>
              </TabPanel>

              <TabPanel value={tabIndex} index={3}>
                {/* isXS used w/ props below (and <PubCard/>) allow for horizontal centering of wrapping flex items on mobile devices. */}
                <RowBox
                  flexWrap="wrap"
                  flexSpacing={isXS ? 0 : pubCardMargin}
                  wrapSpacing={pubCardMargin}
                >
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2022 Strategic Plan"
                      publishedDate={parse(
                        '3/18/2022',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/0ce1e4c0-a6cd-11ec-8a0f-d90ff9705f55-2022-Strategic-Plan.pdf"
                    />
                  </ChildBox>
                  <ChildBox width={isXS ? '100%' : 'auto'}>
                    <PubCard
                      title="2021 Strategic Plan"
                      publishedDate={parse(
                        '8/03/2021',
                        'MM/dd/yyyy',
                        new Date()
                      )}
                      imgixURL="https://imgix.cosmicjs.com/7f7c0030-f4ab-11eb-af9b-23a6e756c49c-2021-Strategic-PlanFINAL.pdf"
                    />
                  </ChildBox>
                </RowBox>
              </TabPanel>

              <TabPanel value={tabIndex} index={4}>
                <RowBox responsive flexSpacing={4}>
                  <ChildBox flex="50%">
                    <Type paragraph>
                      As your water provider, we're committed to keeping you
                      informed about news that relates to you. PCWA's E-News
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
                    <Box mx="auto" width="100%">
                      <Image
                        loader={imgixLoader}
                        src="d8c86140-c4cd-11e7-bedc-43d6110cf0dd-e-news.png"
                        alt="Photo of Page Header to PCWA's E-News periodic email subscription"
                        layout="responsive"
                        sizes="(max-width: 600px) 100vw, 40vw"
                        width={700}
                        height={475}
                      />
                    </Box>
                  </ChildBox>
                </RowBox>

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
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {publication: 'newsletters'}},
      {params: {publication: 'fire-and-water'}},
      {params: {publication: 'year-end'}},
      {params: {publication: 'strategic-plans'}},
      {params: {publication: 'enews'}}
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    const publicationParam = paramToStr(params?.publication)

    const [initialNewslettersData, initialEnewsBlasts] = await Promise.all([
      fetcher(`${baseUrl}${newslettersUrl}`),
      cosmicFetcher(
        `${baseUrl}/api/cosmic/objects`,
        'enews-blasts',
        'id,metadata,status,title'
      )
    ])

    return {
      props: {initialNewslettersData, publicationParam, initialEnewsBlasts},
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching Newsletters/E-News Blasts.', error)
    return {props: {err: {statusCode: 400}}}
  }
}

export default PublicationsPage
