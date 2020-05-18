import {NowRequest, NowResponse} from '@vercel/node'
import csv from 'csvtojson'
import {stringify} from 'querystringify'
import fetch from 'node-fetch'
import lambdaUrl from '@api-lib/lambdaUrl'

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
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
