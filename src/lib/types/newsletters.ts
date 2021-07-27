import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'
export const newsletterDateFrmt = 'yyyy-MM-dd'

export type NewsletterMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size' | 'url'
>
export type NewsletterMediaResponses = NewsletterMediaResponse[]

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'newsletters'}, true)
export const newslettersUrl = `/api/cosmic/media${qs}`
