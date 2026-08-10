'use server'

import {list} from '@vercel/blob'
import {parse} from 'date-fns'
import path from 'path'
import type {BlobObjectExt} from './types'
import {LocalDate, localTz} from '../date-fns'

export interface getBlobMediaParams {
  prefix?: string
  parsePubDatePrfx?: string
  parsePubDatePrfxSep?: string
}

/**
 * Retrieves media objects from a Vercel Blob store, with optional publish-date parsing.
 *
 * Vercel Blob has no equivalent of S3's arbitrary object metadata, so a publish date
 * must instead be encoded as a prefix of the filename (eg. "2024-07-11_agenda.pdf").
 *
 * @param {getBlobMediaParams} params - The parameters for retrieving media from the Blob store.
 * @returns {Promise<BlobObjectExt[]>} A list of Blob objects, optionally with a parsed publish date.
 */
export default async function getBlobMedia({
  prefix = '',
  parsePubDatePrfx = '',
  parsePubDatePrfxSep = '_'
}: getBlobMediaParams): Promise<BlobObjectExt[]> {
  try {
    const shouldParsePubDatePrfx = !!parsePubDatePrfx
    // An explicit token takes priority over OIDC. This matters locally, where a
    // dev-scoped OIDC token may be present but unsupported by the store's connection.
    const {blobs} = await list({
      prefix,
      ...(process.env.BLOB_READ_WRITE_TOKEN && {
        token: process.env.BLOB_READ_WRITE_TOKEN
      })
    })

    return blobs.map((blob) => {
      const filename = path.basename(blob.pathname)
      const basePath = path.dirname(blob.pathname)

      let pubDatePrfx: Date | null = null
      if (shouldParsePubDatePrfx) {
        const pubDatePrfxStr = filename.substring(
          0,
          filename.indexOf(parsePubDatePrfxSep)
        )
        pubDatePrfx = parse(pubDatePrfxStr, parsePubDatePrfx, new LocalDate(), {
          in: localTz
        })
      }

      return {
        ...blob,
        filename,
        basePath,
        ...(shouldParsePubDatePrfx && pubDatePrfx && {pubDatePrfx})
      }
    })
  } catch (error) {
    console.log(error)
    return []
  }
}
