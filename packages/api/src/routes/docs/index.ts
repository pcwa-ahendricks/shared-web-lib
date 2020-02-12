import {NowRequest, NowResponse} from '@now/node'
import fetch from 'node-fetch'

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {id, ...rest} = req.query
    console.log(id)
    console.log(rest)
    switch (id) {
      case 'foobar':
        // res.status(200).send('you are awesome')
        res
          .writeHead(302, {
            Location:
              'https://cdn.cosmicjs.com/f4d68990-f520-11e9-ae6a-3f483301f6c2-10-22-2019PCWABoardAdopts2020Budget.pdf'
          })
          .end()
        break
      case 'baz':
        {
          const response = await fetch(
            'https://cdn.cosmicjs.com/f4d68990-f520-11e9-ae6a-3f483301f6c2-10-22-2019PCWABoardAdopts2020Budget.pdf'
          )
          response.body?.pipe(res)
        }

        break
      default:
        res.status(404).end()
        break
    }
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
