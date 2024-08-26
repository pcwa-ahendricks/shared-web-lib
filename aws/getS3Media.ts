'use server'

import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  HeadObjectCommand
} from '@aws-sdk/client-s3'
import {parse} from 'date-fns'
import {fromZonedTime} from 'date-fns-tz'
import {TZ, localDate} from '../date-fns'
import path from 'path'
import {
  endpoint,
  awsRegion,
  accessKeyId,
  secretAccessKey,
  bucketName,
  imgixEndpoint,
  originEndpoint,
  cdnEndpoint
} from './options'
import type {AwsObjectExt} from './types/aws'
import isImgixInputMimeType  from '../_core/isImgixInputMimeType'
import fileExtension from '../_core/fileExtension'


export interface getS3MediaParams {
  folderPath?: string
  parsePubDatePrfx?: string
  parsePubDatePrfxSep?: string
  filterRootPath?: boolean
  metadata?: boolean
  omitHidden?: boolean
}

/**
 * Retrieves media objects from an S3 bucket, with optional filtering and metadata retrieval.
 *
 * @param {getS3MediaParams} params - The parameters for retrieving media from S3.
 * @returns {Promise<AwsObjectExt[]>} A list of S3 objects with optional metadata.
 * @throws Will throw an error if the media retrieval fails.
 */
export default async function getS3Media({
  folderPath = '',
  parsePubDatePrfx = '',
  parsePubDatePrfxSep = '_',
  filterRootPath = true,
  metadata = true,
  omitHidden = false
}: getS3MediaParams) {
  // Configure the AWS SDK
  const s3Client = new S3Client({
    region: awsRegion,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  })
  try {
    // dLog('endpoint: ', endpoint)
    // dLog('originEndpoint: ', originEndpoint)
    // dLog('cdnEndpoint: ', cdnEndpoint)

    const shouldParsePubDatePrfx = !!parsePubDatePrfx

    // Function to list all objects in a space
    const listAllFiles = async () => {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: folderPath
      })
      const data: ListObjectsV2CommandOutput = await s3Client.send(command)
      // We are just doing this to appease typescript. Filter out missing Key objects, then assert object with Key exists.
      const filteredData =
        data.Contents?.filter((item) => !!item.Key).map((item) => ({
          ...item,
          Key: item.Key as string
        })) ?? []

      const files =
        filteredData
          .map((item) => {
            const filename = path.basename(item.Key)
            const basePath = path.dirname(item.Key)
            let pubDatePrfx: Date | null = null
            if (shouldParsePubDatePrfx) {
              const pubDatePrfxStr = filename.substring(
                0,
                filename.indexOf(parsePubDatePrfxSep)
              )
              pubDatePrfx = fromZonedTime(
                parse(pubDatePrfxStr, parsePubDatePrfx, localDate()),
                TZ
              )
            }
            const ext = fileExtension(item.Key)
            const shouldAddImgixUrl = isImgixInputMimeType(ext)
            const imgixUrl = new URL(`${imgixEndpoint}/${item.Key}`).toString()
            const url = new URL(`${originEndpoint}/${item.Key}`).toString()
            const cdnUrl = new URL(`${cdnEndpoint}/${item.Key}`).toString()
            return {
              ...item,
              filename,
              basePath,
              // Boolean check will prevent null values from being added when using null date strings (ie. bad parsePubDateSep)
              ...(shouldParsePubDatePrfx && !!pubDatePrfx && {pubDatePrfx}),
              url,
              cdnUrl,
              ...(shouldAddImgixUrl && {imgixUrl})
            }
          })
          .filter((item) => {
            // don't return an object for the folder we requested if filterRootPath is truthy (default)
            if (filterRootPath && item?.Key) {
              return item.Key.toLowerCase() !== folderPath.toLowerCase()
            }
            return true
          }) || []

      if (metadata) {
        const metadataPromises = files.map(async (object) => {
          try {
            const headCommand = new HeadObjectCommand({
              Bucket: bucketName,
              Key: object.Key
            })

            const headResponse = await s3Client.send(headCommand)
            // console.log(`Metadata for ${object.Key}:`, headResponse.Metadata)
            return {...object, metadata: headResponse.Metadata}
          } catch (error) {
            console.error(`Failed to fetch metadata for: ${object.Key}`)
            // Return the object without any metadata
            return {...object, metadata: {}}
          }
        })

        const filesWithMetadata = await Promise.all(metadataPromises)
        // dLog('filesWithMetadata: ', filesWithMetadata[0].metadata)
        return filesWithMetadata.filter((item) => {
          // don't return hidden objects if omitHidden is truthy (default: false)
          if (omitHidden) {
            return item.metadata?.['hidden'] !== 'true'
          }
          return true
        })
      }
      return files
    }

    const fileList: AwsObjectExt[] = await listAllFiles()

    return fileList
  } catch (error) {
    console.log(error)
    return []
  }
}
