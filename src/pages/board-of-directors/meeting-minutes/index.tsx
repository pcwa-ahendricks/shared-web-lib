import React, {useCallback, useState, useMemo, useEffect} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  fileNameUtil,
  CosmicMediaMeta,
  CosmicMediaResponse
} from '@lib/services/cosmicService'
import {compareDesc, parseJSON} from 'date-fns'
import groupBy from '@lib/groupBy'
import {ChildBox, ColumnBox, RowBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'
import BoardMinutesAccordion from '@components/BoardMinutesAccordion/BoardMinutesAccordion'
import {CircularProgress} from '@material-ui/core'
import {stringify} from 'querystringify'
import useSWR from 'swr'
import fetcher from '@lib/fetcher'
import {GetStaticProps} from 'next'

type GroupedBoardMinutes = Array<{
  year: number
  values: Pick<
    CosmicMediaMeta,
    '_id' | 'original_name' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
}>

type Props = {
  initialData?: CosmicMediaResponse
}

const cosmicGetMediaProps = {
  props: '_id,original_name,imgix_url'
}
const params = {
  folder: 'board-minutes',
  ...cosmicGetMediaProps
}
const qs = stringify({...params}, true)
const boardMinutesUrl = `/api/cosmic/media${qs}`

const BoardMinutesPage = ({initialData}: Props) => {
  // const thisYear = useMemo(() => getYear(new Date()).toString(), [])

  const [expanded, setExpanded] = useState<boolean | string>(false)
  const [wasExpandedMap, setWasExpandedMap] = useState<{
    [year: string]: boolean
  }>({})

  const {data: boardMinutesData, isValidating} = useSWR<CosmicMediaResponse>(
    boardMinutesUrl,
    {initialData}
  )

  const boardMinutes: GroupedBoardMinutes = useMemo(
    () =>
      boardMinutesData && Array.isArray(boardMinutesData)
        ? [
            // Group Board Minutes by derived Year into JS Map.
            ...groupBy<CosmicMediaMeta, number>(
              boardMinutesData
                .map((bm) => ({
                  ...bm,
                  derivedFilenameAttr: fileNameUtil(
                    bm.original_name,
                    DATE_FNS_FORMAT
                  )
                }))
                .filter((bm) => bm.derivedFilenameAttr.date), // Don't list links that will ultimately 404.
              (mbm) => mbm.derivedFilenameAttr?.publishedYear
            )
          ] // Spreading Map will convert Map into an Array.
            // Sort individual Board Minutes by published date property.
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
    [boardMinutesData]
  )

  const maxYear = useMemo(
    () =>
      boardMinutes
        .reduce(
          (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
          2000
        )
        .toString(),
    [boardMinutes]
  )

  useEffect(() => {
    setExpanded(maxYear)
    setWasExpandedMap((currExpYrs) => ({...currExpYrs, [maxYear]: true}))
  }, [maxYear])

  const handleChange = useCallback(
    (panel: string) => (
      _event: React.ChangeEvent<Record<string, unknown>>,
      isExpanded: boolean
    ) => {
      setExpanded(isExpanded ? panel : false)
      setWasExpandedMap((currExpYrs) => ({
        ...currExpYrs,
        [panel]: isExpanded ? true : currExpYrs[panel]
      }))
    },
    []
  )

  const progressEl = useMemo(
    () =>
      isValidating ? (
        <ColumnBox
          position="absolute"
          width="100%"
          height="100%"
          justifyContent="center"
        >
          <RowBox justifyContent="center">
            <CircularProgress color="primary" />
          </RowBox>
        </ColumnBox>
      ) : null,
    [isValidating]
  )

  return (
    <PageLayout title="Board Meeting Minutes" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Board of Directors' Meeting Minutes"
            subtitle="Board of Directors"
          />
          <RowBox responsive flexSpacing={4}>
            <ChildBox
              flex={{xs: '100%', sm: '65%'}}
              position="relative"
              minHeight={300}
            >
              {progressEl}
              {boardMinutes.map((v) => {
                const year = v.year.toString()
                return (
                  <BoardMinutesAccordion
                    key={year}
                    year={year}
                    minutes={v.values}
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
                  alt: 'Photo of past PCWA Board Members'
                }}
              />
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

// Called at build time.
export const getStaticProps: GetStaticProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const initialData = await fetcher(`${baseUrl}${boardMinutesUrl}`)
    return {
      props: {initialData},
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching News Releases.', error)
    return {props: {}}
  }
}

export default BoardMinutesPage
