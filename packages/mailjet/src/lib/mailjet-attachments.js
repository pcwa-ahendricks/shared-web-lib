// @flow
import {parse} from 'path'
import {existsSync, readFileSync} from 'fs'
import {getType} from 'mime'
import {type MailJetAttachment} from './types'

const attach = (reqAttachments: Array<string>) => {
  const attachments: Array<MailJetAttachment> = []
  return new Promise<Array<MailJetAttachment>>((resolve) => {
    // end immediately if attachments were not provided in body
    if (!reqAttachments || reqAttachments.length === 0) {
      resolve(attachments)
    }
    let resolveAtLength = reqAttachments.length

    function pushAttachment(basePath: string, mimeType: string, b64: string) {
      const attachment = {
        Filename: basePath,
        ContentType: mimeType,
        Base64Content: b64
      }
      // console.log('pushing attachment...', attachment)
      attachments.push(attachment)
      return true
    }
    function checkResolve() {
      // console.log("comparing attachment length to supplied request attachments length: ", attachments.length, resolveAtLength)
      if (attachments.length === resolveAtLength) {
        resolve(attachments)
      }
    }
    function handleError(err: string) {
      /* We work around bad/not-found images by proceeding w/out instead of ending the response. */
      // res.status(403).send("Specified file attachment(s) not found.")
      // res.status(500).send("Problem encountered during image processing.")
      console.warn(err)
      resolveAtLength--
      checkResolve()
    }
    function bufferToBase64(
      buffer: Buffer,
      localFilePath: string,
      mimeType: string
    ) {
      //encode contents into base64
      const b64 = buffer.toString('base64')
      const basePath = parse(localFilePath).base
      pushAttachment(basePath, mimeType, b64)
      checkResolve()
    }

    reqAttachments.forEach((localFilePath: string) => {
      // We are supplying full path in attachments. So this isn't needed.
      // const localFilePath = join(UPLOADS_DIR, ATTACHMENT_DIR, filename)
      if (!existsSync(localFilePath)) {
        handleError(
          `Can't find specified file attachment at "${localFilePath}".`
        )
        return
      }

      const mimeType = getType(localFilePath)

      //read the file
      const buffer = readFileSync(localFilePath)
      bufferToBase64(buffer, localFilePath, mimeType)
    }) // forEach
  })
}

export {attach}
