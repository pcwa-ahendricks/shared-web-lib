import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'

export type bodAgendaMediaResponse = Pick<
  CosmicMediaMeta,
  'original_name' | 'imgix_url' | 'derivedFilenameAttr' | 'size' | 'url'
>
export type bodAgendaMediaResponses = bodAgendaMediaResponse[]

export const bodAgendaDateFrmt = 'MM-dd-yyyy'
const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,url'
}
const qs = stringify({...cosmicGetMediaProps, folder: 'mfpfa-agendas'}, true)
export const boardAgendaUrl = `/api/cosmic/media${qs}`
