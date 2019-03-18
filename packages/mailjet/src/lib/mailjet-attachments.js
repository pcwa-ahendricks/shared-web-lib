// @flow
import {parse} from 'path'
import {stat, readFile} from 'then-fs'
import {getType} from 'mime'
import {type MailJetAttachment, type MailJetMessage} from './types'

const attach = async (reqAttachments: Array<string>) => {
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

  // Avoid flow type hell.
  const allPromises = await Promise.all(attachments)
  return await [...allPromises.filter(Boolean)]
}

const splitUpLargeMessage = (
  message: MailJetMessage,
  maxMsgSize: number = 15 * 1024 * 1024
): Array<MailJetMessage> => {
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

  console.log('overboard', totalSize / 1024 / 1024)
  let newMessages: Array<MailJetMessage> = []
  attachments.forEach((attachment, index) => {
    // $FlowFixMe
    const a = {...message.Attachments[index]}
    a.Base64Content = a.Base64Content.substr(0, 100)
    console.log(JSON.stringify(a, null, 2))
    const messagePart: MailJetMessage = {
      ...message,
      Subject: `${message.Subject} (Part ${index + 1}/${attachments.length})`,
      // $FlowFixMe
      Attachments: [{...message.Attachments[index]}]
    }

    newMessages = newMessages.concat(messagePart)
  })

  return newMessages
}

export {attach, splitUpLargeMessage}
