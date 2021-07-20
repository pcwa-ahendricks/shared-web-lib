import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'

export const DATE_FNS_FORMAT = 'MM-dd-yyyy'

export type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size' | 'url'
>

export type PickedMediaResponses = PickedMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'news-releases'}, true)
export const newsReleasesUrl = `/api/cosmic/media${qs}`
