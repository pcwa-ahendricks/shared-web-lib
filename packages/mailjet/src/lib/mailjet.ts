import fetch from 'isomorphic-unfetch'
import {createError} from 'micro'
import {MailJetSendRequest} from '../lib/types'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''

const getBasicAuth = () =>
  Buffer.from(`${MAILJET_KEY}:${MAILJET_SECRET}`).toString('base64')

async function postMailJetRequest(requestBody: MailJetSendRequest) {
  const basicAuth = getBasicAuth()
  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuth}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    // console.log('Bad response: ', response)
    try {
      const text = await response.text()
      console.log('Message Text: ', text)
    } catch (error) {
      throw error
    }
    if (response.status) {
      throw createError(response.status, response.statusText)
    } else {
      throw createError(500, 'Mailjet send request failed.')
    }
  }
  const data = await response.json()

  return data
}

export {postMailJetRequest}
