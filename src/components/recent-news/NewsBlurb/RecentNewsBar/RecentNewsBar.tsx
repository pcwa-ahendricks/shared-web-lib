import React, {useMemo} from 'react'
import {BoxProps, Box} from '@material-ui/core'
import NewsBlurb from '../NewsBlurb'
import {compareDesc, parseJSON, parse} from 'date-fns'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import TextProgress from '@components/TextProgress/TextProgress'
import {isWebUri} from 'valid-url'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {CosmicObjectResponse} from '@lib/services/cosmicService'
import {NewsBlurbMetadata} from '@components/recent-news/RecentNews'

export type RecentNewsBarProps = {
  noOfBlurbs?: number
  initialData?: CosmicObjectResponse<NewsBlurbMetadata>
} & BoxProps

const params = {
  hide_metafields: true,
  props: '_id,metadata,status,title',
  type: 'news-blurbs'
}
const qs = stringify({...params}, true)
const recentNewsBlurbsUrl = `/api/cosmic/objects${qs}`

const RecentNewsBar = ({
  initialData,
  noOfBlurbs = 4,
  ...rest
}: RecentNewsBarProps) => {
  const {data: recentNewsBlurbs} = useSWR<
    CosmicObjectResponse<NewsBlurbMetadata>
  >(recentNewsBlurbsUrl, {initialData})

  const recentNews = useMemo(
    () =>
      recentNewsBlurbs && Array.isArray(recentNewsBlurbs.objects)
        ? recentNewsBlurbs.objects.map((blurb) => ({
            id: blurb._id,
            releaseDate: parse(
              blurb.metadata.releaseDate,
              "yyyy'-'MM'-'dd'",
              new Date()
            ),
            hide: blurb.metadata.hide,
            linkURL: isWebUri(blurb.metadata.linkURL ?? '') ?? '', // isWebUri returns undefined on failure.
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
      !recentNewsBlurbs ? (
        <TextProgress caption="Loading Recent News..." />
      ) : (
        <RowBox
          responsive
          justifyContent="space-between"
          flexSpacing={4}
          {...rest}
        >
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
        </RowBox>
      ),
    [sortedAndFilteredNews, recentNewsBlurbs, rest]
  )

  return <Box minHeight={200}>{recentNewsBarEl}</Box>
}

export default RecentNewsBar
