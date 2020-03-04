import fetch from 'node-fetch'
import {compareDesc} from 'date-fns'
import {NowRequest, NowResponse} from '@now/node'
import {stringify} from 'querystringify'
import {CosmicGetMediaResponse} from '../../types/cosmic'
import lambdaUrl from '../../lib/lambdaUrl'

const MEDIA_FOLDER = 'csv'

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const baseURL = lambdaUrl(req)
    const {filename} = req.query
    const qs = stringify(
      {
        ...req.query,
        folder: MEDIA_FOLDER
      },
      true
    )
    const mediaResponse = await fetch(`${baseURL}/api/cosmic/media${qs}`)
    const media: CosmicGetMediaResponse['media'] = await mediaResponse.json()

    const filteredMedia = media.filter((m) => m.original_name === filename)

    const sortedMedia = filteredMedia.sort((left, right) => {
      const leftCreated = new Date(left.created)
      const rightCreated = new Date(right.created)
      return compareDesc(leftCreated, rightCreated)
    })

    if (!sortedMedia || !(sortedMedia.length > 0)) {
      res.status(204).end()
      return
    }

    const csvResponse = await fetch(sortedMedia[0].url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/csv'
      }
    })
    if (!csvResponse.ok) {
      res.status(400).end()
      return
    }

    const csv = await csvResponse.text()
    res.setHeader('Content-Type', 'text/csv')
    res.status(200).send(csv)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
