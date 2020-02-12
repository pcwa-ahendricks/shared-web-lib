import {NowRequest, NowResponse} from '@now/node'
import csv from 'csvtojson'
import {stringify} from 'querystringify'
import fetch from 'node-fetch'

const LAMBDA_URL = process.env.NODE_LAMBDA_URL ?? ''

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const qs = stringify({...req.query}, true)
    const csvResponse = await fetch(`${LAMBDA_URL}/api/cosmic/csv${qs}`)
    const csvString: string = await csvResponse.text()
    const jsonArray = await csv().fromString(csvString)
    res.status(200).json(jsonArray)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
