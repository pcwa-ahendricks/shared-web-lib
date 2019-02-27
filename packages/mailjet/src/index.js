// @flow
import {router, get, post} from 'micro-fork'
import {send} from 'micro'
import {hecpEmailRoute, waterWasteRoute} from './routes/index'
import noCache from './lib/micro-no-cache'
import {applyMiddleware} from 'micro-middleware'

const notfound = (req, res) => send(res, 404)
const noFavicon = (req, res) => send(res, 204)

const routeHandler = router()(
  post('/mail/form-exam-submit', hecpEmailRoute),
  post('/mail/water-waste', waterWasteRoute),
  get('/favicon.ico', noFavicon),
  get('/*', notfound)
)

const middlewareHandler = applyMiddleware(routeHandler, [noCache])

export default middlewareHandler

// "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
