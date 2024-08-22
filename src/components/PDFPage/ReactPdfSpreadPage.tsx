import React, {useState, useCallback, useEffect} from 'react'
import {Box, LinearProgress} from '@mui/material'
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
const LoadingProgress = () => {
  return (
    <LinearProgress
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '3px' // default is 4px
      }}
      variant="indeterminate"
      color="secondary"
    />
  )
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

  const [pagesRendered, setPagesRendered] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const onRenderSuccess = useCallback(() => {
    setPagesRendered((prev) => prev + 1)
  }, [])
  // When all pages are rendered, set loading to false
  useEffect(() => {
    if (numPages > 0 && pagesRendered === numPages) {
      setLoading(false)
    }
  }, [pagesRendered, numPages])

  return (
    <Box position="relative">
      {loading && <LoadingProgress />}
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
                  <Page
                    pageNumber={1}
                    width={width * 0.45}
                    onRenderSuccess={onRenderSuccess}
                  />
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
                      const firstPage = index * 2 + 2
                      const secondPage = firstPage + 1

                      return (
                        <Box
                          sx={{marginBottom: 3, display: 'flex'}}
                          key={`spread_${index}`}
                        >
                          <Page
                            pageNumber={firstPage}
                            onRenderSuccess={onRenderSuccess}
                            width={width * 0.45} // Half of the available width
                            {...PageProps}
                          />
                          {secondPage <= numPages && (
                            <Page
                              pageNumber={secondPage}
                              onRenderSuccess={onRenderSuccess}
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
