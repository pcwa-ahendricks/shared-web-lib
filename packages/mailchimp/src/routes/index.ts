import {MicroForkRequest} from '../index'
import fetch from 'isomorphic-unfetch'
import {
  MailchimpCampaignResponse,
  MailchimpSubscribeResponse
} from '../lib/types'
// import {stringify} from 'querystringify'
// import HttpStat from 'http-status-codes'
import {json, send} from 'micro'
import {ServerResponse} from 'http'
// import {CseResponse} from '../lib/types'

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

export const campaignsHandler = async (_req: MicroForkRequest) => {
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
      throw new Error('Response not ok')
    }
    const data: MailchimpCampaignResponse = await response.json()
    return data
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

export const subscribeHandler = async (
  req: MicroForkRequest,
  res: ServerResponse
) => {
  try {
    const body = await json(req)
    const url = `${BASE_URL}/${MAILCHIMP_API_VERSION}/lists/${MAILCHIMP_PRIMARY_LIST}/members`
    const response = await fetch(url, {
      method: 'POST',
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
    send(res, status, data)
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

export const updateHandler = async (
  req: MicroForkRequest,
  res: ServerResponse
) => {
  try {
    const body = await json(req)
    const {userHashId} = req.params
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
    send(res, status, data)
  } catch (error) {
    console.log(error)
    throw error // Remember to throw error so response finishes.
  }
}

function getStatus(data: MailchimpSubscribeResponse) {
  // Status will come back as string ("'subscribed'" when subscribed successfully) or number ("400" when Member Exists).
  let status: number | null
  if (
    typeof data.status === 'string' &&
    parseInt(<string>data.status, 10) !== NaN
  ) {
    status = parseInt(data.status as string, 10)
  } else if (
    typeof data.status === 'string' &&
    parseInt(<string>data.status, 10) === NaN
  ) {
    status = null
  } else {
    status = data.status as number
  }
  return status || 200
}
