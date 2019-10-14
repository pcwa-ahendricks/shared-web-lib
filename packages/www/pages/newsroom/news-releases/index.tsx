import React, {useEffect, useCallback, useState, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta
} from '@lib/services/cosmicService'
import {compareDesc, parseISO} from 'date-fns'
import groupBy from '@lib/groupBy'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'

type groupedNewsReleases = Array<{
  year: number
  values: CosmicMediaMeta[]
}>

const NewsReleasesPage = () => {
  const [newsReleases, setNewsReleases] = useState<groupedNewsReleases>([])

  const fetchNewsReleases = useCallback(async () => {
    const bma = await getMedia({folder: 'news-releases'})
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
      (mbm) => mbm.derivedFilenameAttr.publishedYear
    )
    // Transform JS Map into a usable Array of Objects.
    const tmpSortedGroups = [] as groupedNewsReleases
    for (const [k, v] of grouped) {
      // Sort individual News Releases by published date property.
      tmpSortedGroups.push({
        year: k,
        values: [...v].sort((a, b) =>
          compareDesc(
            parseISO(a.derivedFilenameAttr.publishedDate),
            parseISO(b.derivedFilenameAttr.publishedDate)
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

  return (
    <PageLayout title="News Releases">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle title="News Releases" subtitle="Newsroom" />
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default NewsReleasesPage
