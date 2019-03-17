// @flow
import {parse} from 'path'
import {stat, readFile} from 'then-fs'
import {getType} from 'mime'
import {type MailJetAttachment} from './types'

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

export {attach}
