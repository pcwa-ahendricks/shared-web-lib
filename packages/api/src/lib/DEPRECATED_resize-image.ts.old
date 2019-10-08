import Jimp from 'jimp'
import {existsSync} from 'fs'
import {getType} from 'mime'

const WIDTH_THRESHOLD = 1200

const supportedJimpTypes = [
  Jimp.MIME_BMP,
  Jimp.MIME_GIF,
  Jimp.MIME_JGD,
  Jimp.MIME_JPEG,
  Jimp.MIME_PNG,
  Jimp.MIME_TIFF,
  Jimp.MIME_X_MS_BMP
]

export default async (localFilePath: string): Promise<void> => {
  // Jimp works with Now. GM and Sharp didn't.
  if (!existsSync(localFilePath)) {
    throw new Error('File not found.')
  }

  const mimeType = getType(localFilePath)

  // Only resize images Jimp can load.
  if (
    supportedJimpTypes.findIndex(
      (supportedType) => supportedType === mimeType
    ) <= 0
  ) {
    return
  }

  const getImage = async (localFilePath: string) => {
    try {
      const image = await Jimp.read(localFilePath)
      const width = image.getWidth()
      // Don't resize image if it's already smaller than the target dimension we are resizing to.
      if (width <= WIDTH_THRESHOLD) {
        return null
      }
      return image
    } catch (error) {
      //  Don't throw read errors.
      return null
    }
  }

  const image = await getImage(localFilePath)
  // Just abort processing all-together if image can't be read. Original (un-processed) image will be used.
  if (!image) {
    return
  }
  try {
    await image.resize(WIDTH_THRESHOLD, Jimp.AUTO).writeAsync(localFilePath)
  } catch (error) {
    console.log(error)
    throw new Error('Error during JIMP processing.')
  }
}
