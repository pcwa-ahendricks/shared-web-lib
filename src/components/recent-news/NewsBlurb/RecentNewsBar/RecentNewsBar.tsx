import React, {useMemo} from 'react'
import {BoxProps, Box, Unstable_Grid2 as Grid} from '@mui/material'
import NewsBlurb from '../NewsBlurb'
import {compareDesc, parse} from 'date-fns'
import TextProgress from '@components/TextProgress/TextProgress'
import {isWebUri} from 'valid-url'
import {Descendant, Node} from 'slate'
import useSWR from 'swr'
import type {NewsBlurbResultRow} from 'src/@types/pg'

function slateValueToPlainText(value: Descendant[]): string {
  return value.map((node) => Node.string(node)).join('\n')
}

export type NewsBlurbRow = Omit<
  NewsBlurbResultRow,
  | 'modified_at'
  | 'created_at'
  | 'published_at'
  | 'visible'
  | 'env_production'
  | 'env_preview'
  | 'env_development'
> & {published_at: string}

export type RecentNewsBarProps = {
  noOfBlurbs?: number
  newsBlurbsData?: NewsBlurbRow[]
} & BoxProps

const RecentNewsBar = ({
  newsBlurbsData,
  noOfBlurbs = 4,
  ...rest
}: RecentNewsBarProps) => {
  // const {data: recentNewsBlurbs} = useSWR<
  //   CosmicObjectResponse<NewsBlurbMetadata>
  // >(recentNewsBlurbsUrl, {fallbackData})

  const {data: recentNewsBlurbs} = useSWR<NewsBlurbRow[]>(
    '/api/db/news-blurbs',
    {
      fallbackData: newsBlurbsData
    }
  )

  const recentNews = useMemo(
    () =>
      recentNewsBlurbs && Array.isArray(recentNewsBlurbs)
        ? recentNewsBlurbs.map((blurb) => ({
            id: blurb.id,
            releaseDate: parse(
              blurb.published_at,
              "yyyy'-'MM'-'dd'",
              new Date()
            ),
            linkURL: isWebUri(blurb.link_url ?? '') ?? '', // isWebUri returns undefined on failure.
            title: slateValueToPlainText(blurb.title),
            summary: slateValueToPlainText(blurb.body),
            readMoreCaption: blurb.cta_caption
          }))
        : [],
    [recentNewsBlurbs]
  )

  const sortedAndFilteredNews = useMemo(() => {
    const sortedAndFiltered = recentNews.sort((a, b) =>
      compareDesc(a.releaseDate, b.releaseDate)
    )
    // Just return a set number of news blurbs.
    return sortedAndFiltered.slice(0, noOfBlurbs)
  }, [recentNews, noOfBlurbs])

  if (!newsBlurbsData) {
    return <TextProgress caption="Loading Recent News..." />
  }

  return (
    <Box minHeight={200} {...rest}>
      <Grid container spacing={4}>
        {sortedAndFilteredNews.map((blurb) => (
          <Grid key={blurb.id} xs={12} sm={6} lg={3}>
            <NewsBlurb
              title={blurb.title}
              readMoreCaption={blurb.readMoreCaption}
              summary={blurb.summary}
              linkURL={blurb.linkURL}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RecentNewsBar
