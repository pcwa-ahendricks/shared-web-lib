import React, {useContext, useCallback, useMemo} from 'react'
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
  GroupedNewsReleases,
  NewsroomContext,
  setNewsReleaseYear
} from '@components/newsroom/NewsroomStore'
import {GetStaticProps} from 'next'
import {stringify} from 'querystringify'
import useSWR from 'swr'
import fetcher from '@lib/fetcher'
import Image from 'next/legacy/image'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'
import useTheme from '@hooks/useTheme'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'

type Props = {
  fallbackData?: CosmicMediaResponse
}

const cosmicGetMediaProps = {
  props: 'id,original_name,url,imgix_url'
}
const params = {
  folder: 'news-releases',
  ...cosmicGetMediaProps
}
const qs = stringify({...params}, true)
const newsReleasesUrl = `/api/cosmic/media${qs}`

const NewsReleasesPage = ({fallbackData}: Props) => {
  const theme = useTheme()
  const newsroomContext = useContext(NewsroomContext)
  const newsroomDispatch = newsroomContext.dispatch
  const {newsReleaseYear} = newsroomContext.state

  const {data: newsReleasesData} = useSWR<CosmicMediaResponse>(
    newsReleasesUrl,
    {fallbackData}
  )

  const newsReleases: GroupedNewsReleases = useMemo(
    () =>
      newsReleasesData && Array.isArray(newsReleasesData)
        ? [
            // Group objects by derived Year into JS Map.
            ...groupBy<CosmicMediaMeta, number>(
              newsReleasesData
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
                      href={
                        n.derivedFilenameAttr?.date === '12-20-2022'
                          ? 'https://docs.pcwa.net/mosquito-fire-update-pcwa-has-filed-suit-against-pacific-gas-electric-company.pdf'
                          : n.derivedFilenameAttr?.date === '01-17-2023'
                          ? 'https://docs.pcwa.net/pcwa-files-suit-against-pge-for-breach-of-contract.pdf'
                          : '/newsroom/news-releases/[release-date]'
                      }
                      as={
                        n.derivedFilenameAttr?.date === '12-20-2022' ||
                        n.derivedFilenameAttr?.date === '01-17-2023'
                          ? undefined
                          : `/newsroom/news-releases/${n.derivedFilenameAttr?.date}`
                      }
                      target={
                        n.derivedFilenameAttr?.date === '12-20-2022' ||
                        n.derivedFilenameAttr?.date === '01-17-2023'
                          ? '_blank'
                          : undefined
                      }
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Box
                            sx={(theme) => ({
                              marginRight: 2,
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
                              src={n.imgix_url}
                              alt={`Thumbnail image for ${n.derivedFilenameAttr?.date} News Release`}
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
//     const baseUrl = lambdaUrl(req)
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fallbackData = await fetcher(`${baseUrl}${newsReleasesUrl}`)
    return {
      props: {fallbackData},
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching News Releases.', error)
    return {props: {}}
  }
}

export default NewsReleasesPage
