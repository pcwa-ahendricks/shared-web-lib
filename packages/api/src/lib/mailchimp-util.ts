import {MailchimpSubscribeResponse} from '../types/mailchimp'

const getStatus = (data: MailchimpSubscribeResponse): number => {
  // Status will come back as string ("'subscribed'" when subscribed successfully) or number (400 when Member Exists).
  let status: number | null = null
  if (typeof data.status === 'string' && !isNaN(parseInt(data.status, 10))) {
    status = parseInt(data.status, 10)
  } else if (
    typeof data.status === 'string' &&
    isNaN(parseInt(data.status, 10))
  ) {
    status = null
  } else if (typeof data.status === 'number') {
    status = data.status
  }
  return status || 200
}

export {getStatus}
