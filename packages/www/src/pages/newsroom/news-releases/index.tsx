import React, {useState, useCallback, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
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
import {GroupedNewsReleases} from '@components/newsroom/NewsroomStore'
import {GetServerSideProps} from 'next'
import lambdaUrl from '@lib/lambdaUrl'
import {stringify} from 'querystringify'
import useSWR from 'swr'
import fetcher from '@lib/fetcher'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'

type Props = {
  initialData?: CosmicMediaResponse
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
)

const cosmicGetMediaProps = {
  props: '_id,original_name,url,imgix_url'
}
const params = {
  folder: 'news-releases',
  ...cosmicGetMediaProps
}
const qs = stringify({...params}, true)
const newsReleasesUrl = `/api/cosmic/media${qs}`

const NewsReleasesPage = ({initialData}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [newsReleaseYear, setNewsReleaseYear] = useState<number>()

  const {data: newsReleasesData} = useSWR<CosmicMediaResponse>(
    newsReleasesUrl,
    {initialData}
  )

  const newsReleases: GroupedNewsReleases = useMemo(
    () =>
      newsReleasesData && Array.isArray(newsReleasesData)
        ? [
            // Group objects by derived Year into JS Map.
            ...groupBy<CosmicMediaMeta, number>(
              newsReleasesData.map((bm) => ({
                ...bm,
                derivedFilenameAttr: fileNameUtil(
                  bm.original_name,
                  DATE_FNS_FORMAT
                )
              })),
              (mbm) => mbm.derivedFilenameAttr?.publishedYear
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
    [newsReleasesData]
  )

  const maxYear = useMemo(
    () =>
      newsReleases.reduce(
        (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
        2000
      ),
    [newsReleases]
  )

  const selectYear = newsReleaseYear ?? maxYear

  const handleChange = useCallback(
    (event: React.ChangeEvent<{value: unknown}>) => {
      setNewsReleaseYear(event.target.value as number)
    },
    []
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
            <ChildBox flex="auto">
              <RespRowBox flexSpacing={4}>
                <ChildBox flex="30%" display="flex">
                  <Box
                    mx="auto"
                    width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
                  >
                    <LazyImgix
                      src="https://cosmicjs.imgix.net/204bed80-6b1d-11e7-9554-0968c6aee140-news-releases.jpg"
                      htmlAttributes={{
                        alt: 'PCWA Canal Photo'
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
                      scroll
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

export const getServerSideProps: GetServerSideProps = async ({res, req}) => {
  try {
    const baseUrl = lambdaUrl(req)
    const initialData = await fetcher(`${baseUrl}${newsReleasesUrl}`)
    return {props: {initialData}}
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    return {props: {err: {statusCode: 400}}}
  }
}

export default NewsReleasesPage
