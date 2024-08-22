import React, {useState, useCallback} from 'react'
import {Box} from '@mui/material'
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

const ReactPdfSpreadPage = ({url, slotProps = {}}: Props) => {
  const [numPages, setNumPages] = useState<number>(0)

  const onDocumentLoadSuccess: OnDocumentLoadSuccess = useCallback(
    ({numPages: np}) => {
      setNumPages(np)
    },
    []
  )

  const [ref, {width}] = useMeasure()

  const {DocumentProps = {}, PageProps = {}} = slotProps

  const spreadLength = Math.ceil((numPages - 1) / 2)

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
              <>
                {/* Render the first page full-width */}
                <Box
                  sx={{
                    marginBottom: 3,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}
                >
                  <Page pageNumber={1} width={width * 0.45} />
                </Box>
                {/* Render remaining pages in two-page spreads */}
                {numPages > 1 && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}
                  >
                    {Array.from({length: spreadLength}).map((_, index) => {
                      // just show loading page for first pg
                      const showLoadingCaption = index === 0

                      const firstPage = index * 2 + 2
                      const secondPage = firstPage + 1

                      return (
                        <Box
                          sx={{marginBottom: 3, display: 'flex'}}
                          key={`spread_${index}`}
                        >
                          <Page
                            pageNumber={firstPage}
                            loading={
                              showLoadingCaption ? 'Loading page...' : ''
                            }
                            width={width * 0.45} // Half of the available width
                            {...PageProps}
                          />
                          {secondPage <= numPages && (
                            <Page
                              pageNumber={secondPage}
                              width={width * 0.45} // Half of the available width
                              {...PageProps}
                            />
                          )}
                        </Box>
                      )
                    })}
                  </Box>
                )}
              </>
            </Document>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default ReactPdfSpreadPage
