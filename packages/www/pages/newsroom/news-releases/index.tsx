import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useContext
} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta,
  CosmicMediaResponse
} from '@lib/services/cosmicService'
import {compareDesc, parseJSON, format, parseISO} from 'date-fns'
import groupBy from '@lib/groupBy'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {
  Box,
  Typography as Type,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Theme,
  createStyles,
  makeStyles,
  List,
  useTheme,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import NewsroomSidebar from '@components/newsroom/NewsroomSidebar/NewsroomSidebar'
import NextLink from 'next/link'
import Spacing from '@components/boxes/Spacing'
// import {NextPageContext} from 'next'
// import isNumber from 'is-number'
import {
  NewsroomContext,
  setNewsReleaseYear
} from '@components/newsroom/NewsroomStore'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
)

type GroupedNewsReleases = Array<{
  year: number
  values: Pick<
    CosmicMediaMeta,
    '_id' | 'original_name' | 'url' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
}>

const cosmicGetMediaProps = {
  props: '_id,original_name,url,imgix_url'
}

const NewsReleasesPage = () => {
  const classes = useStyles()
  const [newsReleases, setNewsReleases] = useState<GroupedNewsReleases>([])
  const theme = useTheme()
  const newsroomContext = useContext(NewsroomContext)
  const {newsReleaseYear} = newsroomContext.state
  const newsroomDispatch = newsroomContext.dispatch

  const fetchNewsReleases = useCallback(async () => {
    const bma = await getMedia<CosmicMediaResponse>({
      folder: 'news-releases',
      ...cosmicGetMediaProps
    })
    if (!bma) {
      return
    }
    const bmaEx = bma.map((bm) => ({
      ...bm,
      derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
    }))
    // Group News Releases by derived Year into JS Map.
    const grouped = groupBy<CosmicMediaMeta, number>(
      bmaEx,
      (mbm) => mbm.derivedFilenameAttr?.publishedYear
    )
    // Transform JS Map into a usable Array of Objects.
    const tmpSortedGroups = [] as GroupedNewsReleases
    for (const [k, v] of grouped) {
      // Sort individual News Releases by published date property.
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

    setNewsReleases(sortedGroups)
  }, [])

  const maxYear = useMemo(
    () =>
      newsReleases.reduce(
        (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
        2002
      ),
    [newsReleases]
  )

  const selectYear = newsReleaseYear ?? maxYear

  useEffect(() => {
    fetchNewsReleases()
  }, [fetchNewsReleases])

  const handleChange = useCallback(
    (event: React.ChangeEvent<{value: unknown}>) => {
      newsroomDispatch(setNewsReleaseYear(event.target.value as number))
    },
    [newsroomDispatch]
  )

  const newsReleasesForYear = useMemo(
    () =>
      newsReleases
        .find((g) => g.year === selectYear)
        ?.values.map((n, idx) => ({...n, id: idx})) ?? [],
    [newsReleases, selectYear]
  )

  return (
    <PageLayout title="News Releases" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="News Releases" subtitle="Newsroom" />
          <RespRowBox flexSpacing={4}>
            <ChildBox>
              <RespRowBox flexSpacing={4}>
                <ChildBox flex="30%" display="flex">
                  <Box
                    mx="auto"
                    width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
                  >
                    <LazyImgix
                      src="https://cosmicjs.imgix.net/204bed80-6b1d-11e7-9554-0968c6aee140-news-releases.jpg"
                      htmlAttributes={{
                        alt: 'PCWA Canal Photo',
                        style: {width: '100%'}
                      }}
                    />
                  </Box>
                </ChildBox>
                <ChildBox flex="70%">
                  <Type paragraph>
                    The Placer County Water Agency conducts an ongoing program
                    of public information to keep customers, the general public,
                    other agencies and the news media up-to-date on Agency
                    programs and activities. The PCWA Board and staff believe it
                    is the responsibility of a public agency to report to the
                    people it serves. The Agency distributes news releases on
                    Board meetings, water service emergencies or interruptions,
                    various programs and projects and other items of current
                    interest.
                  </Type>
                </ChildBox>
              </RespRowBox>
              <Spacing />
              <Box>
                <Type color="primary" variant="subtitle1">
                  Filter News Releases by Year
                </Type>
                <Spacing size="x-small" />
                <FormControl className={classes.formControl}>
                  <InputLabel id="news-release-year-select-label">
                    Year
                  </InputLabel>
                  <Select
                    labelId="news-release-year-select-label"
                    id="news-release-year-select"
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
                    {newsReleases.map((g) => (
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
                  {newsReleasesForYear.map((n) => (
                    <NextLink
                      key={n.id}
                      passHref
                      href="/newsroom/news-releases/[release-date]"
                      as={`/newsroom/news-releases/${n.derivedFilenameAttr?.date}`}
                    >
                      <ListItem button component="a">
                        <ListItemAvatar>
                          <Box
                            bgcolor={theme.palette.common.white}
                            borderColor={theme.palette.grey['300']}
                            border={1}
                            mr={2}
                            width={50}
                          >
                            <LazyImgix
                              width={50}
                              src={n.imgix_url}
                              htmlAttributes={{
                                alt: `Thumbnail image for ${n.derivedFilenameAttr?.date} News Release`
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
                  ))}
                </List>
              </Box>
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

// NewsReleasesPage.getInitialProps = async ({query, res}: NextPageContext) => {
//   if (res) {
//     return {}
//   }

//   return {year}
// }

export default NewsReleasesPage
