import {NowRequest, NowResponse} from '@now/node'
import csv from 'csvtojson'
import {stringify} from 'querystringify'
import fetch from 'isomorphic-unfetch'

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const qs = stringify({...req.query}, true)
    const csvResponse = await fetch(`/api/cosmic/csv${qs}`)
    const csvString: string = await csvResponse.text()
    const jsonArray = await csv().fromString(csvString)
    res.status(200).json(jsonArray)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
