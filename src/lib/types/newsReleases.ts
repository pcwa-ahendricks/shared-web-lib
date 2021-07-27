import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'

export const newsReleaseDateFrmt = 'MM-dd-yyyy'

export type NewsReleaseMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size' | 'url'
>

export type NewsReleaseMediaResponses = NewsReleaseMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'news-releases'}, true)
export const newsReleasesUrl = `/api/cosmic/media${qs}`
