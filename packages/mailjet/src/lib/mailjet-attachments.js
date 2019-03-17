// @flow
import {parse} from 'path'
import {existsSync, readFileSync} from 'fs'
import {getType} from 'mime'
import {type MailJetAttachment} from './types'

const attach = (reqAttachments: Array<string>) => {
  const attachments = reqAttachments.map<?MailJetAttachment>(
    (localFilePath: string) => {
      // We are supplying full path in attachments. So this isn't needed.
      // const localFilePath = join(UPLOADS_DIR, ATTACHMENT_DIR, filename)
      if (!existsSync(localFilePath)) {
        console.log(
          `Can't find specified file attachment at "${localFilePath}".`
        )
        return null
      }

      const mimeType = getType(localFilePath)

      //read the file
      const buffer = readFileSync(localFilePath)

      //encode contents into base64
      const b64 = buffer.toString('base64')
      const basePath = parse(localFilePath).base

      const attachment: MailJetAttachment = {
        Filename: basePath,
        ContentType: mimeType,
        Base64Content: b64
      }
      return attachment
    }
  )

  return attachments
}

export {attach}
