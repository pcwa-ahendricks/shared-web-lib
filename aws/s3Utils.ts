'use server'

import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  HeadObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import {parse} from 'date-fns'
import {fromZonedTime} from 'date-fns-tz'
import isImgixInputMimeType from '@/share/imgixInputMimeType'
import fileExtension from '@/share/fileExtension'
import {TZ, localDate} from '@/share/date-fns/localDate'
import {AwsObjectExt} from '@/types/aws'
import {dLog} from '@/share/dLog'
import filenamify from 'filenamify'
import path from 'path'

interface getS3MediaParams {
  folderPath?: string
  parsePubDatePrfx?: string
  parsePubDatePrfxSep?: string
  filterRootPath?: boolean
  metadata?: boolean
  omitHidden?: boolean
}

const awsRegion = process.env.AWS_REGION || ''
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ''
const bucketName = process.env.AWS_BUCKET || ''
const endpoint = `https://${awsRegion}.digitaloceanspaces.com`
const originEndpoint = `https://${bucketName}.${awsRegion}.digitaloceanspaces.com`
const cdnEndpoint = `https://${bucketName}.${awsRegion}.cdn.digitaloceanspaces.com`
const imgixEndpoint = `https://${bucketName}.imgix.net`

/**
 * Creates a sanitized and safe filename for S3 by removing invalid characters and trimming to fit within S3's filename length limits.
 *
 * @param {string} input - The original filename to be sanitized.
 * @returns {string} The sanitized and safe filename.
 * @throws {Error} If the filename becomes empty after sanitization.
 */
function createSafeS3Filename(input: string): string {
  // Sanitize the input to make it a safe filename
  let safeFilename = filenamify(input, {
    replacement: '_' // Replace invalid characters with underscores
  })

  // Trim the filename to ensure it's within S3's limits
  const MAX_S3_KEY_LENGTH = 1024
  if (safeFilename.length > MAX_S3_KEY_LENGTH) {
    safeFilename = safeFilename.substring(0, MAX_S3_KEY_LENGTH)
  }

  // Ensure the filename is not empty
  if (safeFilename.length === 0) {
    throw new Error('Filename is invalid after sanitization.')
  }

  return safeFilename
}

/**
 * Updates the metadata of an existing S3 object.
 *
 * @param {AwsObjectExt['Key']} key - The key of the S3 object to update.
 * @param {AwsObjectExt['metadata']} metadata - The new metadata to apply to the S3 object.
 * @returns {Promise<void>}
 * @throws Will throw an error if the metadata update fails.
 */
const updateS3Metadata = async (
  key: AwsObjectExt['Key'],
  metadata: AwsObjectExt['metadata']
) => {
  // Configure the AWS SDK
  const s3Client = new S3Client({
    region: awsRegion,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  })
  // Retrieve current metadata
  const headCommand = new HeadObjectCommand({
    Bucket: bucketName,
    Key: key
  })

  let currentMetadata = {}
  try {
    const headResponse = await s3Client.send(headCommand)
    currentMetadata = headResponse.Metadata || {}
  } catch (error) {
    console.error(`Error retrieving current metadata for key: ${key}`, error)
    throw error
  }

  // Merge current metadata with new metadata
  const mergedMetadata = {...currentMetadata, ...metadata}

  const copyCommand = new CopyObjectCommand({
    Bucket: bucketName,
    CopySource: `${bucketName}/${key}`,
    Key: key,
    MetadataDirective: 'REPLACE', // Instruct S3 to replace metadata
    Metadata: mergedMetadata,
    ACL: 'public-read' // set the object to be publicly accessible, by default CopyObjectCommand() will set the copy to private
  })

  try {
    await s3Client.send(copyCommand)
    dLog(`Metadata updated for key: ${key}`)
  } catch (error) {
    console.error(`Error updating metadata for key: ${key}`, error)
    throw error
  }
}

/**
 * Retrieves media objects from an S3 bucket, with optional filtering and metadata retrieval.
 *
 * @param {getS3MediaParams} params - The parameters for retrieving media from S3.
 * @returns {Promise<AwsObjectExt[]>} A list of S3 objects with optional metadata.
 * @throws Will throw an error if the media retrieval fails.
 */
const getS3Media = async ({
  folderPath = '',
  parsePubDatePrfx = '',
  parsePubDatePrfxSep = '_',
  filterRootPath = true,
  metadata = true,
  omitHidden = false
}: getS3MediaParams) => {
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

/**
 * Renames an object in an S3 bucket.
 *
 * This function copies the object to a new key (filename), deletes the original object, and retains the original permissions.
 *
 * @param {AwsObjectExt['Key']} oldKey - The current key (filename) of the S3 object.
 * @param {AwsObjectExt['Key']} newKey - The new key (filename) for the S3 object.
 * @returns {Promise<void>}
 * @throws Will throw an error if the renaming fails.
 */
const renameS3Object = async (
  oldKey: AwsObjectExt['Key'],
  newKey: AwsObjectExt['Key']
) => {
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
    // Determine if the original object was public (permissions are set to private by default when a object is copied)
    const isPublic = await isObjectPublic(oldKey)

    // appease typescript
    if (!oldKey || !newKey) {
      throw 'No old key'
    }

    // Extract the base path from the old key
    const basePath = path.dirname(oldKey)
    // Extract the new filename
    const newFilename = path.basename(newKey)
    const newSafeFilename = createSafeS3Filename(newFilename)
    const newSafeKey = `${basePath}/${newSafeFilename}`

    // Copy the object to the new key
    const copyParams = {
      Bucket: bucketName,
      CopySource: `${bucketName}/${oldKey}`, // Source object in the format "bucket/key"
      Key: newSafeKey,
      ACL: isPublic ? ('public-read' as const) : ('private' as const) // Set the new object to public or private based on the original ACL
    }
    await s3Client.send(new CopyObjectCommand(copyParams))

    // Delete the original object
    const deleteParams = {
      Bucket: bucketName,
      Key: oldKey
    }
    await s3Client.send(new DeleteObjectCommand(deleteParams))

    dLog(`File renamed from ${oldKey} to ${newSafeKey} successfully.`)
  } catch (error) {
    console.error(`Failed to rename file ${oldKey}:`, error)
    throw error // Rethrow the error after logging it
  }
}

/**
 * Checks whether an object in an S3 bucket is publicly accessible.
 *
 * @param {AwsObjectExt['Key']} key - The key (filename) of the S3 object to check.
 * @returns {Promise<boolean>} `true` if the object is public, `false` otherwise.
 */
async function isObjectPublic(key: AwsObjectExt['Key']): Promise<boolean> {
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
    // Attempt to fetch the object's metadata without any credentials
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key
    })

    await s3Client.send(command)
    // If the request succeeds, the object is public
    return true
  } catch (error: any) {
    if (
      error?.name &&
      (error.name === 'Forbidden' || error.name === 'AccessDenied')
    ) {
      // If access is forbidden, the object is private
      return false
    }
    console.error('Error checking object public accessibility:', error)
    return false
  }
}

/**
 * Deletes an object from an S3 bucket.
 *
 * @param {AwsObjectExt['Key']} key - The key (filename) of the S3 object to delete.
 * @returns {Promise<void>} A promise that resolves once the object is deleted.
 * @throws Will throw an error if the deletion fails.
 */
async function deleteS3Object(key: AwsObjectExt['Key']) {
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
    const deleteParams = {
      Bucket: bucketName,
      Key: key
    }

    const command = new DeleteObjectCommand(deleteParams)
    const response = await s3Client.send(command)

    dLog(`S3 Object with key '${key}' deleted successfully.`)
    return response
  } catch (error) {
    console.error('Error deleting object from S3:', error)
    throw error
  }
}

export {updateS3Metadata, getS3Media, renameS3Object, deleteS3Object}
