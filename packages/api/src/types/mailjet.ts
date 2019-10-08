export interface MailJetAttachment {
  ContentType: string
  Filename: string
  Base64Content: string
}

export interface MailJetSendRequest {
  Messages: MailJetMessage[]
}

export interface MailJetMessage {
  From: {
    Name: string
    Email: string
  }
  Subject: string
  ReplyTo?: {
    Name?: string
    Email: string
  }
  TemplateLanguage?: boolean
  TemplateID?: number
  Variables?: {}
  To: {Email: string; Name: string}[]
  InlinedAttachments?: MailJetAttachment[]
  Attachments?: MailJetAttachment[]
  Headers?: {[headerKey: string]: string}
  HTMLPart?: string
  TextPart?: string
}
