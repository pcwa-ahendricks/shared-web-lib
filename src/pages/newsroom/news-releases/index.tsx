import React, {useContext, useCallback, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {compareDesc, format, getYear, parseJSON} from 'date-fns'
import groupBy from '@lib/groupBy'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import {
  Box,
  Typography as Type,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItemText,
  ListItemAvatar,
  SelectChangeEvent,
  ListItemButton
} from '@mui/material'
import NewsroomSidebar from '@components/newsroom/NewsroomSidebar/NewsroomSidebar'
import NextLink from 'next/link'
import Spacing from '@components/boxes/Spacing'
import {
  GroupedNewsReleaseVal,
  GroupedNewsReleases,
  NewsroomContext,
  setNewsReleaseYear
} from '@components/newsroom/NewsroomStore'
import {GetStaticProps} from 'next'
import Image from 'next/legacy/image'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'
import useTheme from '@hooks/useTheme'
import {sql} from '@vercel/postgres'
import {type NewsReleaseResultRow} from 'src/@types/pg'
import useSWR from 'swr'

export type NewsReleaseRow = Omit<
  NewsReleaseResultRow,
  'modified_at' | 'created_at' | 'published_at' | 'hidden'
> & {published_at: string}

type Props = {
  fallbackData?: NewsReleaseRow[]
}

const NewsReleasesPage = ({fallbackData}: Props) => {
  const theme = useTheme()
  const newsroomContext = useContext(NewsroomContext)
  const newsroomDispatch = newsroomContext.dispatch
  const {newsReleaseYear} = newsroomContext.state

  const {data: newsReleasesData} = useSWR<NewsReleaseRow[]>(
    '/api/db/news-releases',
    {
      fallbackData
    }
  )

  const newsReleases: GroupedNewsReleases = useMemo(
    () =>
      newsReleasesData && Array.isArray(newsReleasesData)
        ? [
            // Group objects by derived Year into JS Map.
            ...groupBy<GroupedNewsReleaseVal, number>(
              newsReleasesData
                .filter((item) => Boolean(item?.published_at)) // Don't list links that will ultimately 404.
                .map((item) => ({
                  ...item,
                  published_at: parseJSON(item.published_at),
                  pubYear: getYear(item.published_at),
                  nextLinkAs: `/newsroom/news-releases/${format(item.published_at, 'yyyy-MM-dd')}`,
                  title: item.title,
                  imgixUrl: `https://pcwa.imgix.net/${item.s3_key}`
                })),
              (item) => item.pubYear
            )
          ] // Spreading Map will convert Map into an Array.
            // Sort individual media objects by published date property.
            .map(([year, values]) => ({
              year,
              values: values.sort((a, b) =>
                compareDesc(a.published_at, b.published_at)
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
    (event: SelectChangeEvent) => {
      const year = parseInt(event.target.value, 10)
      newsroomDispatch(setNewsReleaseYear(year))
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

  const selectValue = selectYear.toString()

  return (
    <PageLayout title="News Releases" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="News Releases" subtitle="Newsroom" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="auto">
              <RowBox responsive flexSpacing={6}>
                <ChildBox flex="30%" display="flex">
                  <Box
                    mx="auto"
                    width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
                  >
                    <Image
                      loader={imgixLoader}
                      src="204bed80-6b1d-11e7-9554-0968c6aee140-news-releases.jpg"
                      alt="PCWA Canal Photo"
                      layout="responsive"
                      sizes="(max-width: 600px) 60vw, 30vw"
                      width={750}
                      height={891}
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
              </RowBox>
              <Spacing />
              <Box>
                <Type color="primary" variant="subtitle1">
                  Filter News Releases by Year
                </Type>
                <Spacing size="x-small" />
                <FormControl
                  variant="standard"
                  sx={{
                    margin: theme.spacing(1),
                    minWidth: 120
                  }}
                >
                  <InputLabel id="news-release-year-select-label">
                    Year
                  </InputLabel>
                  <Select
                    variant="standard"
                    labelId="news-release-year-select-label"
                    id="news-release-year-select"
                    value={selectValue}
                    onChange={handleChange}
                    MenuProps={{
                      keepMounted: true,
                      PaperProps: {
                        // This won't work. Use style directly. See https://mui.com/material-ui/react-menu/#max-height-menu.
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
                      scroll
                      key={n.id}
                      href="/newsroom/news-releases/[release-date]"
                      as={n.nextLinkAs}
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Box
                            sx={(theme) => ({
                              marginRight: theme.spacing(2),
                              width: 50,
                              bgcolor: 'common.white',
                              borderColor: theme.palette.grey[300],
                              borderWidth: 1,
                              borderStyle: 'solid',
                              borderRadius: 1
                            })}
                          >
                            <Image
                              loader={imgixUrlLoader}
                              layout="responsive"
                              sizes="(max-width: 600px) 20vw, 10vw"
                              width={850}
                              height={1100}
                              objectFit="cover"
                              src={n.imgixUrl}
                              alt={`Thumbnail image for ${format(n.published_at, 'yyyy-MM-dd')} News Release`}
                            />
                          </Box>
                        </ListItemAvatar>
                        <ListItemText
                          primary={n.title}
                          secondary={format(n.published_at, 'MMMM do')}
                        />
                      </ListItemButton>
                    </NextLink>
                  ))}
                </List>
              </Box>
            </ChildBox>
            <ChildBox>
              <NewsroomSidebar />
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({res, req}) => {
//   try {
//     const fallbackData = await fetcher(`${baseUrl}${newsReleasesUrl}`)
//     return {props: {fallbackData}}
//   } catch (error) {
//     console.log(error)
//     res.statusCode = 400
//     return {props: {err: {statusCode: 400}}}
//   }
// }

// Called at build time.
export const getStaticProps: GetStaticProps = async () => {
  try {
    // retrieve data from pg db, and pdfs only (likely isn't necessary)
    const {rows} =
      await sql<NewsReleaseRow>`SELECT s3_key, title, published_at::text as published_at, id FROM news_releases WHERE s3_key ILIKE '%.pdf' AND hidden != True`

    return {
      props: {
        fallbackData: rows
      },
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching News Releases.', error)
    return {props: {}}
  }
}

export default NewsReleasesPage
