// @flow

import Jimp from 'jimp'
import {parse} from 'path'
import {existsSync} from 'fs'
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

    function pushAttachment(filename: string, mimeType: string, b64: string) {
      const attachment = {
        Filename: parse(filename).base,
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
      err: Error,
      buffer: Buffer,
      val: string,
      mimeType: string
    ) {
      if (err) {
        console.log(err)
        handleError('Problem during resize/file -> buffer operation: ')
        return // return from this function (ie. don"t call toString() on invalid buffer and so on) on error.
      }
      const b64 = buffer.toString('base64')
      pushAttachment(val, mimeType, b64)
      checkResolve()
    }

    reqAttachments.forEach(async (localFilePath: string) => {
      // We are supplying full path in attachments. So this isn't needed.
      // const localFilePath = join(UPLOADS_DIR, ATTACHMENT_DIR, filename)
      if (!existsSync(localFilePath)) {
        handleError(
          `Can't find specified file attachment at "${localFilePath}".`
        )
        return
      }

      const mimeType = getType(localFilePath)

      // Jimp works with Now. GM and Sharp didn't.
      try {
        const image = await Jimp.read(localFilePath)
        image.resize(800, Jimp.AUTO).getBuffer(mimeType, (err, buffer) => {
          bufferToBase64(err, buffer, parse(localFilePath).base, mimeType)
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) // forEach
  })
}

export {attach}
