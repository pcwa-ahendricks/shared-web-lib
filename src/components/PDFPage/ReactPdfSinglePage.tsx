import React from 'react'
import {Box} from '@mui/material'
import {useMeasure} from 'react-use'
import {Document, DocumentProps, Page, PageProps, pdfjs} from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type Props = {
  url?: string
  showLoading?: boolean
  slotProps?: {
    DocumentProps?: Partial<DocumentProps>
    PageProps?: Partial<PageProps>
  }
}

const ReactPdfSinglePage = ({url, slotProps = {}}: Props) => {
  const [ref, {width}] = useMeasure()

  const {DocumentProps = {}, PageProps = {}} = slotProps

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
              onLoadError={(e) => console.log(e)}
              {...DocumentProps}
            >
              <Page
                width={width >= 900 ? 900 : width}
                key={`page_1`}
                {...PageProps}
              />
            </Document>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default ReactPdfSinglePage
