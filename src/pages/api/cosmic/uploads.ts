// import {VercelRequest, VercelResponse} from '@vercel/node'
import {createBucketClient} from '@cosmicjs/sdk'
import {dLog} from '@lib/api/shared'
import multer from 'multer'
import prettyBytes from 'pretty-bytes'

const isDev = process.env.NODE_ENV === 'development'

const COSMIC_UPLOAD_DIR = 'image-uploads'
const COSMIC_BUCKET = 'pcwa-net'
const COSMIC_READ_ACCESS_KEY = process.env.NODE_COSMIC_READ_ACCESS_KEY || ''
const COSMIC_WRITE_ACCESS_KEY = process.env.NODE_COSMIC_WRITE_ACCESS_KEY || ''

// There is currently no reasonable way to resize pdfs. So don't accept them for upload since Now will not accept anything over 4-5 MB.
// const ACCEPTING_MIME_TYPES_RE = /^image\/.*/i
const ACCEPTING_MIME_TYPES_RE =
  /^image\/.*|^application\/pdf$|^application\/msword$|^application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document$/i

const fileFilter = (_req: any, file: any, cb: any) => {
  if (ACCEPTING_MIME_TYPES_RE.test(file.mimetype)) {
    cb(null, true)
  } else {
    cb('Bad Mime Type', false)
  }
}

const storage = multer.memoryStorage()

const mainHandler = async (req: any, res: any) => {
  try {
    const cosmic = createBucketClient({
      bucketSlug: COSMIC_BUCKET,
      writeKey: COSMIC_WRITE_ACCESS_KEY,
      readKey: COSMIC_READ_ACCESS_KEY
    })

    await new Promise((resolve) => {
      const mw = multer({storage, fileFilter}).array('upload-image', 1) // The string passed to array() needs to match the fieldName specified in uploadService.ts. We are just taking the first file below so we might as well limit to 1.
      //use resolve() instead of next()
      mw(req, res, resolve)
    })

    const media = req.files?.[0]

    if (!media) {
      return res.status(500).send('No Media')
    }
    dLog(`File '${media.originalname}' got ${prettyBytes(media.size)}`) // log size in development
    const {headers, socket} = req
    const {uploadRoute} = req.query
    const ip = headers['x-forwarded-for'] || socket.remoteAddress
    const {fieldname} = media
    const metadata = {
      environment: isDev ? 'development' : 'production',
      formFieldName: fieldname,
      ip,
      uploadRoute
    }

    // const media = {originalname: fileName, buffer: buffer} // without multer example
    const response = await cosmic.media.insertOne({
      media: media,
      folder: COSMIC_UPLOAD_DIR,
      metadata: metadata
    })

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

export default mainHandler

// Don't use body parsing with Busboy. It will break upload functionality!
export const config = {
  api: {
    bodyParser: false
  }
}
