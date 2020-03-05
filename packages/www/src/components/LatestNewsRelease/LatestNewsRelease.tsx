import React, {useEffect, useCallback, useState} from 'react'
import CoverTile, {CoverTileProps} from '@components/CoverTile/CoverTile'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta
} from '@lib/services/cosmicService'
import {compareDesc, parseJSON} from 'date-fns'
import {
  Box,
  CircularProgress,
  makeStyles,
  createStyles
} from '@material-ui/core'

const DATE_FNS_FORMAT = 'MM-dd-yyyy'

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url'
}
type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr'
>
type PickedMediaResponses = PickedMediaResponse[]

type Props = {} & Partial<CoverTileProps>

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto'
    }
  })
)

const LatestNewsRelease = ({...rest}: Props) => {
  const [latestNewsRelease, setLatestNewsRelease] = useState<
    PickedMediaResponse
  >()
  const [isLoading, setIsLoading] = useState<boolean>()
  const classes = useStyles()

  const fetchLatestNewsRelease = useCallback(async () => {
    const nr = await getMedia<PickedMediaResponses>({
      folder: 'news-releases',
      ...cosmicGetMediaProps
    })
    if (!nr) {
      throw 'No news releases'
    }
    const nrEx = nr
      .map((media) => ({
        ...media,
        derivedFilenameAttr: fileNameUtil(media.original_name, DATE_FNS_FORMAT)
      }))
      .map((media) => ({
        ...media,
        publishedDate: parseJSON(media.derivedFilenameAttr?.publishedDate ?? '')
      }))
      .sort((a, b) => compareDesc(a.publishedDate, b.publishedDate))
    return nrEx[0]
  }, [])

  const fetchAndSetLatestNewsRelease = useCallback(async () => {
    try {
      setIsLoading(true)
      const media = await fetchLatestNewsRelease()
      setLatestNewsRelease(media)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }, [fetchLatestNewsRelease])

  useEffect(() => {
    fetchAndSetLatestNewsRelease()
  }, [fetchAndSetLatestNewsRelease])

  return (
    <Box position="relative">
      <CoverTile
        typeProps={{variant: 'subtitle2'}}
        title={latestNewsRelease?.derivedFilenameAttr?.title ?? ''}
        imgixURL="https://cosmic-s3.imgix.net/e242ac30-7594-11e8-ac9f-85d733f58489-news_release.png"
        linkHref="/newsroom/news-releases/[release-date]"
        flexLinkProps={{
          as: `/newsroom/news-releases/${latestNewsRelease?.derivedFilenameAttr?.date}`
        }}
        imgixFancyProps={{
          htmlAttributes: {
            alt: 'Thumbnail and link for latest PCWA News Release'
          }
        }}
        {...rest}
      />

      {isLoading ? (
        <CircularProgress classes={{root: classes.progress}} />
      ) : null}
    </Box>
  )
}

export default LatestNewsRelease
