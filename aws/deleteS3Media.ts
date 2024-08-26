import {DeleteObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {
  endpoint,
  awsRegion,
  accessKeyId,
  secretAccessKey,
  bucketName
} from './options'
import type {AwsObjectExt} from './types/aws'

/**
 * Deletes an object from an S3 bucket.
 *
 * @param {AwsObjectExt['Key']} key - The key (filename) of the S3 object to delete.
 * @returns {Promise<void>} A promise that resolves once the object is deleted.
 * @throws Will throw an error if the deletion fails.
 */
export default async function deleteS3Object(key: AwsObjectExt['Key']) {
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

    // dLog(`S3 Object with key '${key}' deleted successfully.`)
    return response
  } catch (error) {
    console.error('Error deleting object from S3:', error)
    throw error
  }
}
