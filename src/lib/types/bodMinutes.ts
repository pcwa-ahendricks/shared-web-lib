import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'

export type bodMinutesMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size' | 'url'
>
export type bodMinutesMediaResponses = bodMinutesMediaResponse[]

export const bodMinutesDateFrmt = 'MM-dd-yyyy'
const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'board-minutes'}, true)
export const boardMinutesUrl = `/api/cosmic/media${qs}`
