import {stringify} from 'querystringify'
import {VercelRequest, VercelResponse} from '@vercel/node'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    const {query: reqQuery} = req
    const {query, ...restQuery} = reqQuery
    console.log(query)
    const qs = stringify(
      {
        read_key: COSMIC_READ_ACCESS_KEY,
        ...restQuery,
        query
      },
      true
    )
    console.log(
      `${COSMIC_API_ENDPOINT}/v2/buckets/${COSMIC_BUCKET}/objects${qs}`
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v2/buckets/${COSMIC_BUCKET}/objects${qs}`
    )
    if (!response.ok) {
      res.status(400).send('Response not ok')
      return
    }
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
