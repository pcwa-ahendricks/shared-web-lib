import React, {useEffect, useCallback, useState} from 'react'
import CoverTile, {CoverTileProps} from '@components/CoverTile/CoverTile'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta
} from '@lib/services/cosmicService'
import {compareDesc, parseJSON} from 'date-fns'

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

const LatestNewsRelease = ({...rest}: Props) => {
  const [latestNewsRelease, setLatestNewsRelease] = useState<
    PickedMediaResponse
  >()

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
      .sort((a, b) =>
        compareDesc(
          parseJSON(a.derivedFilenameAttr?.publishedDate ?? ''),
          parseJSON(b.derivedFilenameAttr?.publishedDate ?? '')
        )
      )
    return nrEx[0]
  }, [])

  const fetchAndSetLatestNewsRelease = useCallback(async () => {
    const media = await fetchLatestNewsRelease()
    setLatestNewsRelease(media)
  }, [fetchLatestNewsRelease])

  useEffect(() => {
    fetchAndSetLatestNewsRelease()
  }, [fetchAndSetLatestNewsRelease])

  return (
    <CoverTile
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
  )
}

export default LatestNewsRelease
