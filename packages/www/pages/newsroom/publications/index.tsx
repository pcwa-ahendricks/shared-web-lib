import React, {useEffect, useCallback, useState, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta,
  CosmicMediaResponse
} from '@lib/services/cosmicService'
import {compareDesc, parseISO} from 'date-fns'
import groupBy from '@lib/groupBy'
const DATE_FNS_FORMAT = 'yyyy-MM-dd'

type GroupedNewsletters = Array<{
  year: number
  values: CosmicMediaMeta[]
}>

const cosmicGetMediaProps = {
  props: '_id,original_name,imgix_url'
}

const PublicationsPage = () => {
  const [newsletters, setNewsletters] = useState<GroupedNewsletters>([])

  const fetchNewsletters = useCallback(async () => {
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
    // Group News Releases by derived Year into JS Map.
    const grouped = groupBy<CosmicMediaMeta, number>(
      bmaEx,
      (mbm) => mbm.derivedFilenameAttr.publishedYear
    )
    // Transform JS Map into a usable Array of Objects.
    const tmpSortedGroups = [] as GroupedNewsletters
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

    setNewsletters(sortedGroups)
  }, [])

  const maxYear = useMemo(
    () =>
      newsletters
        .reduce(
          (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
          2000
        )
        .toString(),
    [newsletters]
  )

  useEffect(() => {
    fetchNewsletters()
  }, [fetchNewsletters])

  console.log(maxYear, newsletters)

  return (
    <PageLayout title="Publications">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle title="Publications" subtitle="Newsroom" />
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default PublicationsPage
