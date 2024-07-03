import React, {useState, useCallback} from 'react'
import {Box, Divider} from '@mui/material'
import {useMeasure} from 'react-use'
import {Document, DocumentProps, Page, PageProps, pdfjs} from 'react-pdf'
import {OnDocumentLoadSuccess} from 'react-pdf/dist/cjs/shared/types'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

type Props = {
  url?: string
  showLoading?: boolean
  slotProps?: {
    DocumentProps?: Partial<DocumentProps>
    PageProps?: Partial<PageProps>
  }
}

const ReactPdfPage = ({url, slotProps = {}}: Props) => {
  const [numPages, setNumPages] = useState<number>(0)

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = useCallback(
    ({numPages: np}) => {
      setNumPages(np)
    },
    []
  )

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
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(e) => console.log(e)}
              {...DocumentProps}
            >
              {Array.from(new Array(numPages), (_el, index) => {
                const showDivider = index < numPages - 1 && numPages > 1
                const showLoadingCaption = index === 0
                return (
                  <>
                    <Page
                      loading={showLoadingCaption ? 'Loading page...' : ''} // just show loading page for first pg
                      width={width >= 900 ? 900 : width}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      {...PageProps}
                    />
                    {showDivider && <Divider />}
                  </>
                )
              })}
            </Document>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default ReactPdfPage
