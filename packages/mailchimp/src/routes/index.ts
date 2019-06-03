import {MicroForkRequest} from '../index'
import fetch from 'isomorphic-unfetch'
import {MailchimpCampaignResponse} from '../lib/types'
// import {stringify} from 'querystringify'
// import HttpStat from 'http-status-codes'
// import {createError} from 'micro'
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
