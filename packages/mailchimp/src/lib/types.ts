interface Recipient {
  list_id: string
  list_is_active: boolean
  list_name: string
  segment_text: string
  recipient_count: number
}

interface Setting {
  subject_line: string
  title: string
  from_name: string
  reply_to: string
  use_conversation: boolean
  to_name: string
  folder_id: string
  authenticate: boolean
  auto_footer: boolean
  inline_css: boolean
  auto_tweet: boolean
  fb_comments: boolean
  timewarp: boolean
  template_id: number
  drag_and_drop: boolean
}

interface Tracking {
  opens: boolean
  html_clicks: boolean
  text_clicks: boolean
  goal_tracking: boolean
  ecomm360: boolean
  google_analytics: string
  clicktale: string
}

interface Ecommerce {
  total_orders: number
  total_spent: number
  total_revenue: number
}

interface ReportSummary {
  opens: number
  unique_opens: number
  open_rate: number
  clicks: number
  subscriber_clicks: number
  click_rate: number
  ecommerce: Ecommerce
}

interface DeliveryStatus {
  enabled: boolean
}

interface Link {
  rel: string
  href: string
  method: string
  targetSchema: string
  schema?: string
}

interface Campaign {
  id: string
  web_id: number
  type: string
  create_time: string
  archive_url: string
  long_archive_url: string
  status: string
  emails_sent: number
  send_time: string
  content_type: string
  needs_block_refresh: boolean
  recipients: Recipient
  settings: Setting
  tracking: Tracking
  report_summary: ReportSummary
  delivery_status: DeliveryStatus
  _links: Link[]
}

export interface MailchimpCampaignResponse {
  campaigns: Campaign[]
  total_items: number
  _links: Link[]
}
