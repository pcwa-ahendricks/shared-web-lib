// cspell:ignore mfpfa novus
import React, {useMemo, useState, useCallback, useEffect} from 'react'
import Image from 'next/image'
import {
  fileNameUtil,
  CosmicMediaMeta,
  CosmicMediaResponse
} from '@lib/services/cosmicService'
import {compareDesc, parseJSON} from 'date-fns'
import groupBy from '@lib/groupBy'
import NextLink from 'next/link'
import {
  Typography as Type,
  Link,
  Box,
  CircularProgress
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import NovusIframe from '@components/NovusIframe/NovusIframe'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import {stringify} from 'querystringify'
import useSWR from 'swr'
import fetcher from '@lib/fetcher'
import imgixLoader from '@lib/imageLoader'
import {GetStaticProps} from 'next'
import BoardAgendaAccordion from '@components/BoardAgendaAccordion/BoardAgendaAccordion'

type GroupedBoardAgendas = Array<{
  year: number
  values: Pick<
    CosmicMediaMeta,
    'id' | 'original_name' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
}>

type Props = {
  fallbackData?: CosmicMediaResponse
}

const DATE_FNS_FORMAT = 'MM-dd-yyyy'

const cosmicGetMediaProps = {
  props: 'id,original_name,imgix_url'
}
const params = {
  folder: 'mfpfa-agendas',
  ...cosmicGetMediaProps
}
const qs = stringify({...params}, true)
const boardAgendasUrl = `/api/cosmic/media${qs}`

export default function MfpfaMeetingAgendaPage({fallbackData}: Props) {
  const [expanded, setExpanded] = useState<boolean | string>(false)
  const [wasExpandedMap, setWasExpandedMap] = useState<{
    [year: string]: boolean
  }>({})

  const {data: boardAgendasData, isValidating} = useSWR<CosmicMediaResponse>(
    boardAgendasUrl,
    {fallbackData}
  )

  const boardAgendas: GroupedBoardAgendas = useMemo(
    () =>
      boardAgendasData && Array.isArray(boardAgendasData)
        ? [
            // Group Board Agendas by derived Year into JS Map.
            ...groupBy<CosmicMediaMeta, number>(
              boardAgendasData
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
            // Sort individual Board Agendas by published date property.
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
    [boardAgendasData]
  )

  const maxYear = useMemo(
    () =>
      boardAgendas
        .reduce(
          (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
          2000
        )
        .toString(),
    [boardAgendas]
  )

  useEffect(() => {
    setExpanded(maxYear)
    setWasExpandedMap((currExpYrs) => ({...currExpYrs, [maxYear]: true}))
  }, [maxYear])

  const handleChange = useCallback(
    (panel: string) =>
      (
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
    <PageLayout title="MFPFA Meetings" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Middle Fork Project Finance Authority Meetings"
            subtitle="Board of Directors"
          />
          <Spacing />
          <section>
            <RowBox responsive flexSpacing={2}>
              <ChildBox flex="60%">
                <Type paragraph>
                  View current agendas for all Middle Fork Project Finance
                  Authority Meetings. Agendas can be viewed online or downloaded
                  in PDF format. Previous years' agendas can be found online in
                  our{' '}
                  <NextLink
                    href="/board-of-directors/mfpfa-meeting-agendas-dev#archive"
                    passHref
                  >
                    {/* <Link
                      href="https://www.placer.ca.gov/AgendaCenter/Search/?term=&CIDs=4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.placer.ca.gov
                    </Link> */}
                    <Link>archive below</Link>
                  </NextLink>
                  .
                </Type>
              </ChildBox>
              <ChildBox
                flex="40%"
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="80a6e6f0-7273-11ec-ad57-f92dc76de18c-mfpfa-logo-trans.png"
                  alt="Middle Fork Project Finance Authority logo"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={1080}
                  height={314}
                />
              </ChildBox>
            </RowBox>
            <Spacing size="large" />
            <Type gutterBottom variant="h2" color="primary">
              Board Meeting Agendas
            </Type>
            <NovusIframe mfpfa />
          </section>
          <Spacing factor={2} />
          <Box>
            <Type gutterBottom variant="h3" color="primary" id="archive">
              Previous Years' Agendas
            </Type>
            <ChildBox flex="70%" position="relative" minHeight={300}>
              {progressEl}
              {boardAgendas.map((v) => {
                const year = v.year.toString()
                return (
                  <BoardAgendaAccordion
                    key={year}
                    year={year}
                    agendas={v.values}
                    expanded={expanded}
                    onChange={handleChange}
                    wasExpanded={wasExpandedMap[year] === true}
                  />
                )
              })}
            </ChildBox>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

// Called at build time.
export const getStaticProps: GetStaticProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fallbackData = await fetcher(`${baseUrl}${boardAgendasUrl}`)
    return {
      props: {fallbackData},
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching News Releases.', error)
    return {props: {}}
  }
}
