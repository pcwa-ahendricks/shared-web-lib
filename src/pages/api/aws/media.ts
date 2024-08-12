import {VercelRequest, VercelResponse} from '@vercel/node'
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  HeadObjectCommand
} from '@aws-sdk/client-s3'
import path from 'path'
import {type AwsObjectExt} from '@lib/types/aws'
import {parse} from 'date-fns'
import {fromZonedTime} from 'date-fns-tz'
import isImgixInputMimeType from '@lib/imgixInputMimeType'
import startsWithAnyPrefix from '@lib/startsWithAnyPrefix'
import paramToStr from '@lib/paramToStr'
import {fileExtension} from '@lib/fileExtension'
import {TZ, localDate} from '@lib/localDate'

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
      parsePubDatePrfx: parsePubDatePrfxParam,
      parsePubDatePrfxSep: parsePubDateSepPrfxParam,
      filterRootPath: filterRootPathParam,
      metadata: metadataParam,
      omitHidden: omitHiddenParam
    } = query // using request query

    const folderPath = paramToStr(folderPathParam)
    const parsePubDatePrfx = paramToStr(parsePubDatePrfxParam)
    const parsePubDatePrfxSep = paramToStr(parsePubDateSepPrfxParam) || '_' // default to underscore
    const filterRootPath =
      paramToStr(filterRootPathParam)?.toLowerCase() === 'false' ? false : true // default to true
    const metadata =
      paramToStr(metadataParam)?.toLowerCase() === 'false' ? false : true // default to true
    const omitHidden =
      paramToStr(omitHiddenParam)?.toLowerCase() === 'true' ? true : false // default to false

    const shouldParsePubDatePrfx = !!parsePubDatePrfx

    const validPrefixPath = startsWithAnyPrefix(folderPath, [
      'pcwa-net/newsroom/news-releases/',
      'pcwa-net/newsroom/newsletters/'
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
        }).filter((item) => {
          // don't return an object for the folder we requested if filterRootPath is truthy (default)
          if (filterRootPath && item?.Key) {
            return item.Key.toLowerCase() !== folderPath.toLowerCase()
          }
          return true
        }) || []

      if (metadata) {
        const metadataPromises = files.map(async (object) => {
          const headCommand = new HeadObjectCommand({
            Bucket: bucketName,
            Key: object.Key
          })

          const headResponse = await s3Client.send(headCommand)
          // console.log(`Metadata for ${object.Key}:`, headResponse.Metadata)
          return {...object, metadata: headResponse.Metadata}
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

    const fileList: AwsObjectExt[] = await listAllFiles(bucketName)

    res.status(200).json(fileList)
    return
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
