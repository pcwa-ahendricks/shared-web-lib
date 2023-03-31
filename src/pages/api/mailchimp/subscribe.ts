import {MailchimpSubscribeResponse} from '@lib/api/mailchimp'
import {VercelRequest, VercelResponse} from '@vercel/node'
import {getStatus} from '@lib/api/mailchimp-util'

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

export const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    res.setHeader(
      'Cache-Control',
      'private, no-cache, no-store, must-revalidate'
    )
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')
    const {body} = req
    const url = `${BASE_URL}/${MAILCHIMP_API_VERSION}/lists/${MAILCHIMP_PRIMARY_LIST}/members`
    const response = await fetch(url, {
      method: 'POST',
      body, // Don't JSON.stringify() body since it's a string already. Doing so will cause an error. See https://stackoverflow.com/questions/10967105/json-stringify-escaping-without-need for more info.
      headers: {
        'Content-type': 'application/json',
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
