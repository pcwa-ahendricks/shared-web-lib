import {stringify} from 'querystringify'

const cosmicGetMediaProps = {
  props: 'original_name,imgix_url,derivedFilenameAttr,size,metadata,url'
}
const qs = stringify(
  {...cosmicGetMediaProps, folder: 'publication-library'},
  true
)

export const publicationUrl = `/api/cosmic/media${qs}`
