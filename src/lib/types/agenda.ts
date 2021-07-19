import {stringify} from 'querystringify'

export interface AgendaMetadata {
  agenda_pdf: {
    imgix_url: string
    url: string
  }
  date: string
  time: string
  sort_order: number
  hidden: boolean
}

const params = {
  hide_metafields: true,
  props: 'id,metadata,status,title',
  query: JSON.stringify({
    type: 'agendas'
  })
}
const qs = stringify({...params}, true)
export const agendasUrl = `/api/cosmic/objects${qs}`
