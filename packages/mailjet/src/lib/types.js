// @flow

export type MailJetAttachment = {
  ContentType: string,
  Filename: string,
  Base64Content: string
}

export type MailJetSendRequest = {
  Messages: Array<MailJetMessage>
}

export type MailJetMessage = {|
  From: {
    Name: string,
    Email: string
  },
  Subject: string,
  ReplyTo?: {
    Name?: string,
    Email: string
  },
  TemplateLanguage?: boolean,
  TemplateID?: number,
  Variables?: {},
  To: Array<{Email: string, Name: string}>,
  InlinedAttachments?: Array<MailJetAttachment>,
  Attachments?: Array<MailJetAttachment>,
  Headers?: {[headerKey: string]: string},
  HTMLPart?: string,
  TextPart?: string
|}
