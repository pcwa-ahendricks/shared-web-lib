import {VercelRequest, VercelResponse} from '@vercel/node'
import {createBucketClient} from '@cosmicjs/sdk'
import {getObjectMethodDefaults} from '@lib/api/cosmic'
import paramToStr from '@lib/paramToStr'

// const isDev = process.env.NODE_ENV === 'development'

const COSMIC_BUCKET = 'pcwa-net'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const cosmic = createBucketClient({
      bucketSlug: COSMIC_BUCKET,
      readKey: COSMIC_READ_ACCESS_KEY
    })
    // res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    const {query: reqQuery} = req
    let {query, status, limit, props, sort, skip, depth} = reqQuery
    query = paramToStr(query)
    status = paramToStr(status) || getObjectMethodDefaults.status

    props = paramToStr(props) || getObjectMethodDefaults.props
    sort = paramToStr(sort) || getObjectMethodDefaults.sort
    const skipInt =
      parseInt(paramToStr(skip), 10) === 0
        ? 0
        : parseInt(paramToStr(skip), 10) || getObjectMethodDefaults.skip
    const depthInt =
      parseInt(paramToStr(depth), 10) === 0
        ? 0
        : parseInt(paramToStr(depth), 10) || getObjectMethodDefaults.depth
    const limitInt =
      parseInt(paramToStr(limit), 10) === 0
        ? 0
        : parseInt(paramToStr(limit), 10) || getObjectMethodDefaults.limit
    const queryObj = JSON.parse(query || '{}') // default to empty object

    const data = await cosmic.objects
      .find(queryObj)
      .props(props)
      // .pretty() // typescript definition may be off on this one
      // .useCache(true) // typescript definition may be off on this one, says it takes no arguments
      .status(status)
      .depth(depthInt)
      .skip(skipInt)
      .limit(limitInt)
      .sort(sort)

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
