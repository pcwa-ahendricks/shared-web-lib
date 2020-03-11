import React, {useMemo} from 'react'
import {BoxProps, Box} from '@material-ui/core'
import NewsBlurb from '../NewsBlurb'
import {compareDesc, parseJSON, parse} from 'date-fns'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import TextProgress from '@components/TextProgress/TextProgress'
import {isWebUri} from 'valid-url'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import fetch from 'isomorphic-unfetch'
import {CosmicObjectResponse} from '@lib/services/cosmicService'
import {NewsBlurbMetadata} from '@components/recent-news/RecentNewsStore'

type Props = {
  noOfBlurbs?: number
  initialData?: CosmicObjectResponse<NewsBlurbMetadata>
} & BoxProps

export const fetcher = (apiUrl: RequestInfo, type: string, props: string) => {
  const params = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    hide_metafields: true,
    props,
    type
  }
  const qs = stringify({...params}, true)
  const url = `${apiUrl}${qs}`
  return fetch(url).then((r) => r.json())
}

const RecentNewsBar = ({noOfBlurbs = 4, initialData, ...rest}: Props) => {
  const {data: recentNewsBlurbs, isValidating} = useSWR<
    CosmicObjectResponse<NewsBlurbMetadata>
  >(
    ['/api/cosmic/objects', 'news-blurbs', '_id,metadata,status,title'],
    fetcher,
    {
      initialData
    }
  )
  const recentNews = useMemo(
    () =>
      recentNewsBlurbs?.objects && Array.isArray(recentNewsBlurbs?.objects)
        ? recentNewsBlurbs?.objects.map((blurb) => ({
            id: blurb._id,
            releaseDate: parse(
              blurb.metadata.releaseDate,
              "yyyy'-'MM'-'dd'",
              new Date()
            ),
            hide: blurb.metadata.hide,
            linkURL: isWebUri(blurb.metadata.linkURL) ?? '', // isWebUri returns undefined on failure.
            title: blurb.metadata.title,
            summary: blurb.metadata.summary,
            readMoreCaption: blurb.metadata.readMoreCaption
          }))
        : [],
    [recentNewsBlurbs]
  )

  const sortedAndFilteredNews = useMemo(() => {
    const filtered = recentNews.filter((blurb) => !blurb.hide)
    const sortedAndFiltered = filtered.sort((a, b) =>
      compareDesc(parseJSON(a.releaseDate), parseJSON(b.releaseDate))
    )
    // Just return a set number of news blurbs.
    return sortedAndFiltered.slice(0, noOfBlurbs)
  }, [recentNews, noOfBlurbs])

  const recentNewsBarEl = useMemo(
    () =>
      isValidating ? (
        <TextProgress caption="Loading Recent News..." />
      ) : (
        <RespRowBox justifyContent="space-between" flexSpacing={4} {...rest}>
          {sortedAndFilteredNews.map((blurb) => (
            <ChildBox key={blurb.id} flex="25%">
              <NewsBlurb
                title={blurb.title}
                readMoreCaption={blurb.readMoreCaption}
                summary={blurb.summary}
                linkURL={blurb.linkURL}
              />
            </ChildBox>
          ))}
        </RespRowBox>
      ),
    [sortedAndFilteredNews, isValidating, rest]
  )

  return <Box minHeight={200}>{recentNewsBarEl}</Box>
}

export default RecentNewsBar
