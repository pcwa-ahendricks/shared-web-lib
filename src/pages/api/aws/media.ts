import {VercelRequest, VercelResponse} from '@vercel/node'
import {
  getFileExtension,
  isImgixInputMimeType,
  paramToStr,
  startsWithAnyPrefix
} from '@lib/api/shared'
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput
} from '@aws-sdk/client-s3'
import path from 'path'
import {type AwsObjectExt} from '@lib/types/aws'
import {parse} from 'date-fns'

const awsRegion = process.env.NODE_AWS_REGION || ''
const accessKeyId = process.env.NODE_AWS_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.NODE_AWS_SECRET_ACCESS_KEY || ''
const bucketName = process.env.NODE_AWS_BUCKET || ''
const endpoint = `https://${awsRegion}.digitaloceanspaces.com`
const originEndpoint = `https://${bucketName}.${awsRegion}.digitaloceanspaces.com`
const cdnEndpoint = `https://${bucketName}.${awsRegion}.cdn.digitaloceanspaces.com`
const imgixEndpoint = `https://${bucketName}.imgix.net`

const mainHandler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Configure the AWS SDK
    const s3Client = new S3Client({
      region: awsRegion,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    })

    // res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    const {query} = req
    let {
      folderPath: folderPathParam,
      parsePubDate: parsePubDateParam,
      parsePubDateSep: parsePubDateSepParam
    } = query // using request query

    const folderPath = paramToStr(folderPathParam)
    const parsePubDate = paramToStr(parsePubDateParam)
    const parsePubDateSep = paramToStr(parsePubDateSepParam) || '_' // default to underscore

    const shouldParsePubDate = Boolean(parsePubDate)

    const validPrefixPath = startsWithAnyPrefix(folderPath, [
      'pcwa-net/newsroom/news-releases/'
    ])

    if (!validPrefixPath) {
      res.status(400).end()
    }

    // Function to list all objects in a space
    const listAllFiles = async (bucketName: string) => {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: folderPath
      })
      const data: ListObjectsV2CommandOutput = await s3Client.send(command)
      const files =
        data.Contents?.map((item) => {
          const filename = path.basename(item.Key)
          let pubDate: string
          if (shouldParsePubDate) {
            const pubDateStr = filename.substring(
              0,
              filename.indexOf(parsePubDateSep)
            )
            pubDate = parse(pubDateStr, parsePubDate, new Date()).toJSON()
          }
          const ext = getFileExtension(item.Key)
          const shouldAddImgixUrl = isImgixInputMimeType(ext)
          const imgixUrl = new URL(`${imgixEndpoint}/${item.Key}`).toString()
          const url = new URL(`${originEndpoint}/${item.Key}`).toString()
          const cdnUrl = new URL(`${cdnEndpoint}/${item.Key}`).toString()
          return {
            ...item,
            filename,
            // Boolean check will prevent null values from being added when using null date strings (ie. bad parsePubDateSep)
            ...(shouldParsePubDate && Boolean(pubDate) && {pubDate}),
            url,
            cdnUrl,
            ...(shouldAddImgixUrl && {imgixUrl})
          }
        }) || []

      return files
    }

    const fileList: AwsObjectExt[] = await listAllFiles(bucketName)

    res.status(200).json(fileList)
    return
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
