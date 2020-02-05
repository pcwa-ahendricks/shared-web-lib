import fetch from 'isomorphic-unfetch'

const LAMBDA_URL = process.env.NODE_LAMBDA_URL || ''

type MailchimpSubscribeStatus =
  | 'subscribed'
  | 'pending'
  | 'unsubscribed'
  | 'cleaned'

export interface MailchimpSubscribePostBody {
  status: MailchimpSubscribeStatus
  email_address: string
}

interface MergeField {
  fNAME: string
  lNAME: string
  bIRTHDAY: string
}

interface Stat {
  avg_open_rate: number
  avg_click_rate: number
}
interface Link {
  rel: string
  href: string
  method: string
  targetSchema: string
  schema?: string
}

export interface MailchimpSubscribeResponseBody {
  id: string
  email_address: string
  unique_email_id: string
  email_type: string
  status: string | number // see note above
  merge_fields: MergeField
  stats: Stat
  ip_signup: string
  timestamp_signup: string
  ip_opt: string
  timestamp_opt: string
  member_rating: number
  last_changed: string
  language: string
  vip: boolean
  email_client: string
  location: Location
  list_id: string
  _links: Link[]
  /* Member Exists */
  type: string
  title: string
  // status: number // see note above (dynamic type)
  detail: string
  instance: string
}

// We are not using fetch-ok lib with this service since error handling is a bit more customized and we don't want the errors to be caught.
const subscribeToEnews = async (body: MailchimpSubscribePostBody) => {
  const url = `${LAMBDA_URL}/api/mailchimp/subscribe`
  try {
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    throw error
  }
}

export {subscribeToEnews}
