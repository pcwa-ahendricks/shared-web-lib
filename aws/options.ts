const awsRegion = process.env.AWS_REGION || ''
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ''
const bucketName = process.env.AWS_BUCKET || ''
const endpoint = `https://${awsRegion}.digitaloceanspaces.com`
const originEndpoint = `https://${bucketName}.${awsRegion}.digitaloceanspaces.com`
const cdnEndpoint = `https://${bucketName}.${awsRegion}.cdn.digitaloceanspaces.com`
const imgixEndpoint = `https://${bucketName}.imgix.net`

const options = {
  awsRegion,
  accessKeyId,
  secretAccessKey,
  bucketName,
  endpoint,
  originEndpoint,
  cdnEndpoint,
  imgixEndpoint
}

export default options
export {
  awsRegion,
  accessKeyId,
  secretAccessKey,
  bucketName,
  endpoint,
  originEndpoint,
  cdnEndpoint,
  imgixEndpoint
}
