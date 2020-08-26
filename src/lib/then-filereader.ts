// Note - this/FileReader API won't work in getStaticProps
export default function readAsDataUrlAsync(inputFile: Blob): Promise<string> {
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort()
      reject(new DOMException('Problem parsing input file'))
    }

    temporaryFileReader.onload = () => {
      const result = temporaryFileReader.result ?? ''
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new DOMException('Parsed input file is not a string'))
      }
    }
    temporaryFileReader.readAsDataURL(inputFile)
  })
}
