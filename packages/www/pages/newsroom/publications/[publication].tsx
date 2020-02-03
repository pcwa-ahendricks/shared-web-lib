// cspell:ignore mailchimp
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
  getObjects,
  CosmicObject
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
  TabProps
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import {NextPageContext} from 'next'
import queryParamToStr from '@lib/services/queryParamToStr'
import ErrorPage from '@pages/_error'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import NewsroomSidebar from '@components/newsroom/NewsroomSidebar/NewsroomSidebar'
import Spacing from '@components/boxes/Spacing'
import {
  NewsroomContext,
  GroupedNewsletters,
  setNewsletterYear,
  setNewsletters,
  setEnewsBlasts
} from '@components/newsroom/NewsroomStore'
import LazyImgix from '@components/LazyImgix/LazyImgix'

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

interface EnewsBlastMetadata {
  mailchimpURL: string
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
  enewsBlasts?: CosmicObject<EnewsBlastMetadata>[]
  err?: {statusCode: number}
}

const cosmicGetMediaProps = {
  props: '_id,original_name,imgix_url'
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
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
  enewsBlasts: enewsBlastsProp,
  err
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [tabIndex, setTabIndex] = useState(0)
  const newsroomContext = useContext(NewsroomContext)
  const {newsletters, newsletterYear, enewsBlasts} = newsroomContext.state
  const newsroomDispatch = newsroomContext.dispatch

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
        <Box p={3}>{children}</Box>
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

  useEffect(() => {
    if (enewsBlastsProp && enewsBlastsProp?.length > 0) {
      newsroomDispatch(
        setEnewsBlasts(
          enewsBlastsProp.map((blast) => ({
            id: blast._id,
            title: blast.title,
            mailchimpURL: blast.metadata?.mailchimpURL,
            distributionDate: parse(
              blast.metadata?.distributionDate,
              "yyyy'-'MM'-'dd'",
              new Date()
            )
          }))
        )
      )
    }
  }, [enewsBlastsProp, newsroomDispatch])

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

  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  return (
    <PageLayout title="Publications" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Publications" subtitle="Newsroom" hideDivider />
          <RespRowBox flexSpacing={4} width="100%">
            <ChildBox flex="auto">
              <AppBar
                position="static"
                color="default"
                classes={{root: classes.appBar}}
                elevation={2}
                square={false}
              >
                <Tabs
                  variant="fullWidth"
                  value={tabIndex}
                  onChange={tabChangeHandler}
                  aria-label="nav tabs example"
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
                              <Box
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
                              </Box>
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
                fire & water here...
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                year end here...
              </TabPanel>
              <TabPanel value={tabIndex} index={3}>
                <List>
                  {sortedEnewsBlasts.map((blast) => {
                    const distDateFormated = format(
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
                          primary={`${distDateFormated} - ${blast.title}`}
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

const fetchNewsletters = async () => {
  const bma = await getMedia<CosmicMediaResponse>({
    folder: 'newsletters',
    ...cosmicGetMediaProps
  })
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

PublicationsPage.getInitialProps = async ({query, res}: NextPageContext) => {
  try {
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

    const [newsletters, enewsBlasts] = await Promise.all([
      fetchNewsletters(),
      getObjects<EnewsBlastMetadata>('enews-blasts', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        hide_metafields: true,
        props: '_id,metadata,status,title'
      })
    ])

    return {newsletters, tabIndex, enewsBlasts}
  } catch (error) {
    if (res) {
      res.statusCode = 404
    }
    return {err: {statusCode: 404}}
  }
}

export default PublicationsPage
