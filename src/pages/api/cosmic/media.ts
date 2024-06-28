import {CosmicGetMediaResponse} from '../../../lib/api/cosmic'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {createBucketClient} from '@cosmicjs/sdk'
import paramToStr from '@lib/paramToStr'

const COSMIC_BUCKET = 'pcwa-net'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const cosmic = createBucketClient({
      bucketSlug: COSMIC_BUCKET,
      readKey: COSMIC_READ_ACCESS_KEY
    })

    // res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    const {query} = req
    let {folder, name, original_name, id} = query // using request query

    folder = paramToStr(folder)
    original_name = paramToStr(original_name)
    name = paramToStr(name)
    id = paramToStr(id)

    if (name || id) {
      const data: CosmicGetMediaResponse = await cosmic.media.findOne({
        ...(id && {id}),
        ...(name && {name})
      })
      res.status(200).json(data)
      return
    } else if (folder || original_name) {
      const data: CosmicGetMediaResponse = await cosmic.media.find({
        ...(folder && {folder}),
        ...(original_name && {original_name})
      })
      res.status(200).json(data.media)
      return
    }

    res.status(400).end()
    return
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
