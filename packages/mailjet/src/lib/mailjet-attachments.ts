import {parse} from 'path'
import {stat, readFile} from 'then-fs'
import {getType} from 'mime'
import {MailJetAttachment, MailJetMessage} from './types'

const attach = async (reqAttachments: string[]) => {
  const attachments = reqAttachments.map(async (localFilePath: string) => {
    try {
      // We are supplying full path in attachments. So this isn't needed.
      // const localFilePath = join(UPLOADS_DIR, ATTACHMENT_DIR, filename)
      if (!(await stat(localFilePath))) {
        throw new Error(
          `Can't find specified file attachment at "${localFilePath}".`
        )
      }

      const mimeType = getType(localFilePath)
      if (!mimeType) {
        throw new Error('Could not determine MIME type.')
      }

      //read the file
      const buffer = await readFile(localFilePath)

      //encode contents into base64
      const b64 = buffer.toString('base64')
      const basePath = parse(localFilePath).base

      const attachment: MailJetAttachment = {
        Filename: basePath,
        ContentType: mimeType,
        Base64Content: b64
      }
      return attachment
    } catch (error) {
      console.log(error)
      return null
    }
  })

  const allPromises = await Promise.all(attachments)
  return await [...allPromises.filter(Boolean)]
}

const splitUpLargeMessage = (
  message: MailJetMessage,
  maxMsgSize: number = 15 * 1024 * 1024
): MailJetMessage[] => {
  const attachments =
    message.Attachments && message.Attachments.length > 0
      ? message.Attachments
      : null
  if (!attachments) {
    return [{...message}]
  }

  const totalSize = attachments
    .map<number>((attachment) => {
      const buffer = Buffer.from(attachment.Base64Content, 'base64')
      return Buffer.byteLength(buffer)
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  if (totalSize < maxMsgSize) {
    return [{...message}]
  }

  console.log('File size is too large.', totalSize / 1024 / 1024)
  let newMessages: MailJetMessage[] = []
  attachments.forEach((_attachment, index) => {
    const a = {...attachments[index]}
    a.Base64Content = a.Base64Content.substr(0, 100)
    console.log(JSON.stringify(a, null, 2))
    const messagePart: MailJetMessage = {
      ...message,
      Subject: `${message.Subject} (Part ${index + 1}/${attachments.length})`,
      Attachments: [{...attachments[index]}]
    }

    newMessages = newMessages.concat(messagePart)
  })

  return newMessages
}

export {attach, splitUpLargeMessage}
