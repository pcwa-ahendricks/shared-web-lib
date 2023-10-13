import {VercelRequest, VercelResponse} from '@vercel/node'
import {createBucketClient} from '@cosmicjs/sdk'

const COSMIC_BUCKET = 'pcwa-net'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

const mainHandler = async (_req: VercelRequest, res: VercelResponse) => {
  try {
    const cosmic = createBucketClient({
      bucketSlug: COSMIC_BUCKET,
      readKey: COSMIC_READ_ACCESS_KEY
    })

    // res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')

    const data = await cosmic.objectTypes.find()
    res.status(200).json(data.object_types)
  } catch (error) {
    console.log(error)
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
