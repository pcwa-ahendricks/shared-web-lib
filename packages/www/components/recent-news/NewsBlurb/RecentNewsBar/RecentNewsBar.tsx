import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState
} from 'react'
import {BoxProps, Box} from '@material-ui/core'
import NewsBlurb from '../NewsBlurb'
import {
  RecentNewsContext,
  setRecentNews,
  NewsBlurbMetadata
} from '@components/recent-news/RecentNewsStore'
import {compareDesc, parseJSON, parse} from 'date-fns'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {getObjects} from '@lib/services/cosmicService'
import TextProgress from '@components/TextProgress/TextProgress'

type Props = {noOfBlurbs?: number} & BoxProps

const RecentNewsBar = ({noOfBlurbs = 4, ...rest}: Props) => {
  const recentNewsContext = useContext(RecentNewsContext)
  const recentNewsDispatch = recentNewsContext.dispatch
  const {recentNews} = recentNewsContext.state
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchRecentNews = useCallback(async () => {
    const blurbs = await getObjects<NewsBlurbMetadata>('news-blurbs', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      hide_metafields: true,
      props: '_id,metadata,status,title'
    })
    return blurbs
  }, [])

  const setAndFetchRecentNews = useCallback(async () => {
    try {
      // Only fetch from api if recent news context is empty. We will re-use recentNews state.
      if (recentNews.length <= 0) {
        setIsLoading(true)
        const recentNewsBlurbs = await fetchRecentNews()
        // Prevent any kind of cyclical updating of state (since recentNews is a hook dependency which will cause useEffect to fire below) by only dispatching setRecentNews when we have a valid non-empty response.
        if (recentNewsBlurbs && recentNewsBlurbs.length > 0) {
          const data = recentNewsBlurbs.map((blurb) => ({
            id: blurb._id,
            releaseDate: parse(
              blurb.metadata.releaseDate,
              "yyyy'-'MM'-'dd'",
              new Date()
            ),
            hide: blurb.metadata.hide,
            linkURL: blurb.metadata.linkURL,
            title: blurb.metadata.title,
            summary: blurb.metadata.summary,
            readMoreCaption: blurb.metadata.readMoreCaption
          }))
          recentNewsDispatch(setRecentNews(data))
          setIsLoading(false)
        }
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [recentNews, recentNewsDispatch, fetchRecentNews])

  useEffect(() => {
    setAndFetchRecentNews()
  }, [setAndFetchRecentNews])

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
      isLoading ? (
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
    [sortedAndFilteredNews, isLoading, rest]
  )

  return <Box minHeight={200}>{recentNewsBarEl}</Box>
}

export default RecentNewsBar
