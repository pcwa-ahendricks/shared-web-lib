import React, {useState, useCallback} from 'react'
import {Box} from '@mui/material'
import {useMeasure} from 'react-use'
import {Document, Page, pdfjs} from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type Props = {
  url?: string
  showLoading?: boolean
}

const ReactPdfPage = ({url}: Props) => {
  const [numPages, setNumPages] = useState(null)

  const onDocumentLoadSuccess = useCallback(({numPages}) => {
    setNumPages(numPages)
  }, [])

  const [ref, {width}] = useMeasure()

  return (
    <Box position="relative">
      {url ? (
        <Box
          ref={ref}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Box>
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(e) => console.log(e)}
            >
              {Array.from(new Array(numPages), (_el, index) => (
                <Page
                  width={width >= 900 ? 900 : width}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ))}
            </Document>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default ReactPdfPage