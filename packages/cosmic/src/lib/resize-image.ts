import Jimp from 'jimp'

const WIDTH_THRESHOLD = 1600

const getImage = async (imageBuffer: Buffer) => {
  try {
    const image = await Jimp.read(imageBuffer)
    const width = image.getWidth()
    // Don't resize image if it's already smaller than the target dimension we are resizing to.
    if (width <= WIDTH_THRESHOLD) {
      return null
    }
    return image
  } catch (error) {
    //  Don't throw read errors.
    console.log("Couldn't read image")
    return null
  }
}

export default async (imageBuffer: Buffer): Promise<Buffer> => {
  // Jimp works with Now. GM and Sharp didn't.

  const image = await getImage(imageBuffer)
  // Just abort processing all-together if image can't be read. Original (un-processed) image will be used.
  if (!image) {
    return imageBuffer
  }
  try {
    const mimeType = image.getMIME()
    const newImageBuffer = await image
      .resize(WIDTH_THRESHOLD, Jimp.AUTO)
      .getBufferAsync(mimeType)
    return newImageBuffer
  } catch (error) {
    console.log("Couldn't resize image")
    return imageBuffer
  }
}
