import fetch from 'node-fetch'
import {MailchimpSubscribeResponse} from '../../../lib/api/mailchimp'
import {NowRequest, NowResponse} from '@vercel/node'
import {getStatus} from '../../../lib/api/mailchimp-util'

const MAILCHIMP_DC = process.env.NODE_MAILCHIMP_DC || ''
const MAILCHIMP_USERNAME = process.env.NODE_MAILCHIMP_USERNAME || ''
const MAILCHIMP_API_KEY = process.env.NODE_MAILCHIMP_API_KEY || ''
const MAILCHIMP_PRIMARY_LIST = process.env.NODE_MAILCHIMP_PRIMARY_LIST || ''
const BASE_URL = `https://${MAILCHIMP_DC}.api.mailchimp.com`
// API Version.
const MAILCHIMP_API_VERSION = '3.0'
// Use authentication with headers.
const basicAuth = Buffer.from(
  `${MAILCHIMP_USERNAME}:${MAILCHIMP_API_KEY}`
).toString('base64')

const mainHandler = async (req: NowRequest, res: NowResponse) => {
  try {
    const {body} = req
    const {userHashId} = req.query
    if (!userHashId) {
      throw new Error('No user hash id specified for put request to Mailchimp.')
    }
    const url = `${BASE_URL}/${MAILCHIMP_API_VERSION}/lists/${MAILCHIMP_PRIMARY_LIST}/members/${userHashId}`

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`
      }
    })
    // Don't inspect response.ok cause we will pass along non-ok responses to client.
    // if (!response.ok) {
    //   ...
    // }
    const data: MailchimpSubscribeResponse = await response.json()
    const status = getStatus(data)
    // Send custom status code back with data.
    res.status(status).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
