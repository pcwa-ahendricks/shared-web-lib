import {VercelRequest, VercelResponse} from '@vercel/node'
import csv from 'csvtojson'
import {stringify} from 'querystringify'

const baseUrl = process.env.BASE_URL

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    // res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    const qs = stringify({...req.query}, true)
    const csvResponse = await fetch(`${baseUrl}/api/cosmic/csv${qs}`)
    const csvString: string = await csvResponse.text()
    const jsonArray = await csv().fromString(csvString)
    res.status(200).json(jsonArray)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
