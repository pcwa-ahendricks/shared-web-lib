import {VercelRequest, VercelResponse} from '@vercel/node'
import csv from 'csvtojson'
import {stringify} from 'querystringify'
import fetch from 'node-fetch'
// Won't work with Vercel. Path mappings in tsconfig not supported. See https://vercel.com/docs/runtimes#official-runtimes/node-js/using-typescript-with-the-node-js-runtime for more info.
// import lambdaUrl from '@api-lib/lambdaUrl'
import lambdaUrl from '../../../lib/api/lambdaUrl'

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    const qs = stringify({...req.query}, true)
    const baseURL = lambdaUrl(req)
    const csvResponse = await fetch(`${baseURL}/api/cosmic/csv${qs}`)
    const csvString: string = await csvResponse.text()
    const jsonArray = await csv().fromString(csvString)
    res.status(200).json(jsonArray)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
