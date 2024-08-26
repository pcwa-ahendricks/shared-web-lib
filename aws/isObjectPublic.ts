'use server'

import {HeadObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {
  endpoint,
  awsRegion,
  accessKeyId,
  secretAccessKey,
  bucketName
} from './options'
import type {AwsObjectExt} from './types'

/**
 * Checks whether an object in an S3 bucket is publicly accessible.
 *
 * @param {AwsObjectExt['Key']} key - The key (filename) of the S3 object to check.
 * @returns {Promise<boolean>} `true` if the object is public, `false` otherwise.
 */
export default async function isObjectPublic(
  key: AwsObjectExt['Key']
): Promise<boolean> {
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
