import {stringify} from 'querystringify'
import fetch from 'isomorphic-unfetch'
import {NowRequest, NowResponse} from '@now/node'

const COSMIC_BUCKET = 'pcwa'
const COSMIC_API_ENDPOINT = 'https://api.cosmicjs.com'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  const {slug, ...rest} = req.query // using request query
  try {
    const qs = stringify(
      // eslint-disable-next-line @typescript-eslint/camelcase
      {read_key: COSMIC_READ_ACCESS_KEY, ...rest},
      true
    )
    const response = await fetch(
      `${COSMIC_API_ENDPOINT}/v1/${COSMIC_BUCKET}/object-type/${slug}${qs}`
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
