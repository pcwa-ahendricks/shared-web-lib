'use server'

import {
  CopyObjectCommand,
  DeleteObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import {
  accessKeyId,
  awsRegion,
  bucketName,
  endpoint,
  secretAccessKey
} from './options'
import type {AwsObjectExt} from './types'
import isObjectPublic from './isObjectPublic'
import path from 'path'
import createSafeS3Filename from './createSafeS3Filename'

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
export default async function renameS3Object(
  oldKey: AwsObjectExt['Key'],
  newKey: AwsObjectExt['Key']
) {
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

    // dLog(`File renamed from ${oldKey} to ${newSafeKey} successfully.`)
  } catch (error) {
    console.error(`Failed to rename file ${oldKey}:`, error)
    throw error // Rethrow the error after logging it
  }
}
