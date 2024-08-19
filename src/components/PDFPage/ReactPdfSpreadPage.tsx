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
                {numPages > 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}
                  >
                    {Array.from(new Array(numPages - 1), (_el, index) => {
                      // const showDivider = index < numPages - 1 && numPages > 1
                      const showLoadingCaption = index === 0
                      return (
                        <>
                          <Box
                            sx={{marginBottom: 3, display: 'flex'}}
                            key={`page_${index + 2}`}
                          >
                            <Page
                              loading={
                                showLoadingCaption ? 'Loading page...' : ''
                              } // just show loading page for first pg
                              pageNumber={index + 2}
                              // width={width >= 900 ? 900 : width}
                              width={width * 0.45} // Half of the available width
                              {...PageProps}
                            />
                            {/* Check if there's a next page to render the second half of the spread */}
                            {index + 3 <= numPages && (
                              <Page
                                pageNumber={index + 3}
                                width={width * 0.45} // Half of the available width
                              />
                            )}
                            {/* {showDivider && <Divider />} */}
                          </Box>
                        </>
                      )
                    })}
                  </Box>
                ) : null}
              </>
            </Document>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default ReactPdfSpreadPage
