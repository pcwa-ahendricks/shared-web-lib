import fetch from 'node-fetch'
import {MailJetSendRequest} from '../types/mailjet'

const API_VER = 'v3.1'
const MAILJET_KEY = process.env.NODE_MAILJET_KEY ?? ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET ?? ''

const getBasicAuth = () =>
  Buffer.from(`${MAILJET_KEY}:${MAILJET_SECRET}`).toString('base64')

async function postMailJetRequest(requestBody: MailJetSendRequest) {
  const basicAuth = getBasicAuth()
  const response = await fetch(`https://api.mailjet.com/${API_VER}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuth}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    // console.log('Bad response: ', response)
    const text = await response.text()
    console.log('Message Text: ', text)
    if (response.status) {
      // throw createError(response.status, response.statusText)
      console.log(response.statusText)
      throw response.status
    } else {
      // throw createError(500, 'Mailjet send request failed.')
      throw 'Mailjet send request failed.'
    }
  }
  const data = await response.json()

  return data
}

export {postMailJetRequest}
