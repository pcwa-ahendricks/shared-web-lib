'use server'

import {
  CopyObjectCommand,
  HeadObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import {
  endpoint,
  awsRegion,
  accessKeyId,
  secretAccessKey,
  bucketName
} from './options'
import type {AwsObjectExt} from './types/aws'

/**
 * Updates the metadata of an existing S3 object.
 *
 * @param {AwsObjectExt['Key']} key - The key of the S3 object to update.
 * @param {AwsObjectExt['metadata']} metadata - The new metadata to apply to the S3 object.
 * @returns {Promise<void>}
 * @throws Will throw an error if the metadata update fails.
 */
export default async function updateS3Metadata(
  key: AwsObjectExt['Key'],
  metadata: AwsObjectExt['metadata']
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
    // dLog(`Metadata updated for key: ${key}`)
  } catch (error) {
    console.error(`Error updating metadata for key: ${key}`, error)
    throw error
  }
}
