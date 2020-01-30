import React, {useEffect, useCallback, useState, useMemo} from 'react'
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
import {compareDesc, parseJSON, getYear} from 'date-fns'
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
  makeStyles
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import NewsroomSidebar from '@components/NewsroomSidebar/NewsroomSidebar'
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
  const [year, setYear] = useState(getYear(new Date()))

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
      newsReleases
        .reduce(
          (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
          2000
        )
        .toString(),
    [newsReleases]
  )

  useEffect(() => {
    fetchNewsReleases()
  }, [fetchNewsReleases])

  console.log(maxYear, newsReleases)

  const handleChange = useCallback(
    (event: React.ChangeEvent<{value: unknown}>) => {
      setYear(event.target.value as number)
    },
    []
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
              <Box>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    onChange={handleChange}
                  >
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                  </Select>
                </FormControl>
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

export default NewsReleasesPage
