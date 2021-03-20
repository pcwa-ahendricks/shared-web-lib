import fetch from 'node-fetch'
import {compareDesc} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {stringify} from 'querystringify'
// Won't work with Vercel. Path mappings in tsconfig not supported. See https://vercel.com/docs/runtimes#official-runtimes/node-js/using-typescript-with-the-node-js-runtime for more info.
// import {CosmicGetMediaResponse} from '@api-lib/cosmic'
// import lambdaUrl from '@api-lib/lambdaUrl'
import lambdaUrl from '../../../lib/api/lambdaUrl'
import {CosmicGetMediaResponse} from '../../../lib/api/cosmic'
import {TZ} from '@lib/api/shared'

const MEDIA_FOLDER = 'csv'

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
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
      const leftCreated = utcToZonedTime(new Date(left.created), TZ)
      const rightCreated = utcToZonedTime(new Date(right.created), TZ)
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
