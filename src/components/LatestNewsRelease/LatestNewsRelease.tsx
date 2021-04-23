import React, {useMemo} from 'react'
import CoverTile, {CoverTileProps} from '@components/CoverTile/CoverTile'
import {fileNameUtil, CosmicMediaMeta} from '@lib/services/cosmicService'
import {compareDesc, parseJSON} from 'date-fns'
import {
  Box,
  CircularProgress,
  makeStyles,
  createStyles
} from '@material-ui/core'
import useSWR from 'swr'
import {stringify} from 'querystringify'

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr'
>
type PickedMediaResponses = PickedMediaResponse[]

type Props = Partial<CoverTileProps>

const DATE_FNS_FORMAT = 'MM-dd-yyyy'

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'news-releases'}, true)
const latestNewsReleaseUrl = `/api/cosmic/media${qs}`

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

const LatestNewsRelease = ({width, ...rest}: Props) => {
  const classes = useStyles()

  const {
    data: latestNewsReleaseData,
    isValidating
  } = useSWR<PickedMediaResponses>(latestNewsReleaseUrl)

  const latestNewsRelease = useMemo(
    () =>
      latestNewsReleaseData && Array.isArray(latestNewsReleaseData)
        ? latestNewsReleaseData
            .map((media) => ({
              ...media,
              derivedFilenameAttr: fileNameUtil(
                media.original_name,
                DATE_FNS_FORMAT
              )
            }))
            .map((media) => ({
              ...media,
              publishedDate: parseJSON(
                media.derivedFilenameAttr?.publishedDate ?? ''
              )
            }))
            .sort((a, b) => compareDesc(a.publishedDate, b.publishedDate))
            .filter((lnr) => lnr.derivedFilenameAttr.date) // Don't show a news release that we won't be able to navigate to. getStaticPaths in [release-date] will filter these so prevent the UI from showing these bogus routes.
            .shift()
        : null,
    [latestNewsReleaseData]
  )

  return (
    <Box position="relative" width={width}>
      <CoverTile
        width={width}
        typeProps={{variant: 'subtitle2'}}
        title={latestNewsRelease?.derivedFilenameAttr?.title ?? ''}
        imgixURL="https://imgix.cosmicjs.com/e242ac30-7594-11e8-ac9f-85d733f58489-news_release.png"
        linkHref="/newsroom/news-releases/[release-date]"
        flexLinkProps={{
          as: `/newsroom/news-releases/${
            latestNewsRelease?.derivedFilenameAttr?.date ?? 'not-found'
          }`
        }}
        alt="Thumbnail and link for latest PCWA News Release"
        {...rest}
      />

      {isValidating ? (
        <CircularProgress classes={{root: classes.progress}} />
      ) : null}
    </Box>
  )
}

export default LatestNewsRelease
