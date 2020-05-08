import fetch from 'node-fetch'
import {MailchimpCampaignResponse} from '../../types/mailchimp'
import {NowRequest, NowResponse} from '@vercel/node'

const MAILCHIMP_DC = process.env.NODE_MAILCHIMP_DC ?? ''
const MAILCHIMP_USERNAME = process.env.NODE_MAILCHIMP_USERNAME ?? ''
const MAILCHIMP_API_KEY = process.env.NODE_MAILCHIMP_API_KEY ?? ''
const BASE_URL = `https://${MAILCHIMP_DC}.api.mailchimp.com`
// API Version.
const MAILCHIMP_API_VERSION = '3.0'
// Use authentication with headers.
const basicAuth = Buffer.from(
  `${MAILCHIMP_USERNAME}:${MAILCHIMP_API_KEY}`
).toString('base64')

export const mainHandler = async (_req: NowRequest, res: NowResponse) => {
  try {
    const url = `${BASE_URL}/${MAILCHIMP_API_VERSION}/campaigns`
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${basicAuth}`
      }
    })
    if (!response.ok) {
      res.status(400).send('Response not ok')
      return
    }
    const data: MailchimpCampaignResponse = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
