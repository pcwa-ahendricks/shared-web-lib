import React, {useEffect, useCallback, useState} from 'react'
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
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'
import BoardMinutesAccordion from '@components/BoardMinutesAccordion/BoardMinutesAccordion'

type GroupedBoardMinutes = Array<{
  year: number
  values: CosmicMediaMeta[]
}>

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url'
}

const BoardMinutesPage = () => {
  // const thisYear = useMemo(() => getYear(new Date()).toString(), [])

  const [boardMinutes, setBoardMinutes] = useState<GroupedBoardMinutes>([])
  const [expanded, setExpanded] = useState<boolean | string>(false)
  const [wasExpandedMap, setWasExpandedMap] = useState<{
    [year: string]: boolean
  }>({})

  const fetchBoardMinutes = useCallback(async () => {
    const bma = await getMedia<CosmicMediaResponse>({
      folder: 'board-minutes',
      ...cosmicGetMediaProps
    })
    if (!bma) {
      return
    }
    const bmaEx = bma.map((bm) => ({
      ...bm,
      derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
    }))
    // Group Board Minutes by derived Year into JS Map.
    const grouped = groupBy<CosmicMediaMeta, number>(
      bmaEx,
      (mbm) => mbm.derivedFilenameAttr.publishedYear
    )
    // Transform JS Map into a usable Array of Objects.
    const tmpSortedGroups = [] as GroupedBoardMinutes
    for (const [k, v] of grouped) {
      // Sort individual Board Minutes by published date property.
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

    const maxYear = sortedGroups
      .reduce(
        (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
        2000
      )
      .toString()
    setWasExpandedMap((currExpYrs) => ({...currExpYrs, [maxYear]: true}))
    setExpanded(maxYear)
    setBoardMinutes(sortedGroups)
  }, [])

  useEffect(() => {
    fetchBoardMinutes()
  }, [fetchBoardMinutes])

  const handleChange = useCallback(
    (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
      setWasExpandedMap((currExpYrs) => ({
        ...currExpYrs,
        [panel]: isExpanded ? true : currExpYrs[panel]
      }))
    },
    []
  )
  return (
    <PageLayout title="Board of Directors' Minutes">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Board of Directors' Meeting Minutes"
            subtitle="Board of Directors"
          />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex={{xs: '100%', sm: '65%'}}>
              {boardMinutes.map((v) => {
                const year = v.year.toString()
                const minutes = [...v.values]
                return (
                  <BoardMinutesAccordion
                    key={year}
                    year={year}
                    minutes={minutes}
                    expanded={expanded}
                    onChange={handleChange}
                    wasExpanded={wasExpandedMap[year] === true}
                  />
                )
              })}
            </ChildBox>
            <ChildBox
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
            >
              <LazyImgix
                src="https://cosmicjs.imgix.net/dc58efe0-6b19-11e7-9040-ddfa5350c930-board-minutes-aside.jpg"
                htmlAttributes={{
                  alt: 'Photo of past PCWA Board Members',
                  style: {width: '100%'}
                }}
              />
            </ChildBox>
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BoardMinutesPage
