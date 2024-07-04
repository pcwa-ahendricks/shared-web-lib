import React, {useCallback, useState} from 'react'
import {Box, Button, ButtonGroup} from '@mui/material'
import {useMeasure} from 'react-use'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigatePrevIcon from '@mui/icons-material/NavigateBefore'
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

  const maxWidth = 900
  const [pageNumber, setPageNumber] = useState(1)
  const [renderedPageNumber, setRenderedPageNumber] = useState(null)
  const [numPages, setNumPages] = useState(null)

  function documentLoadSuccessHandler({numPages}) {
    setNumPages(numPages)
  }

  const isLoading = renderedPageNumber !== pageNumber

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  const nextPgClickHandler = useCallback(() => {
    changePage(1)
  }, [])

  const prevPgClickHander = useCallback(() => {
    changePage(-1)
  }, [])

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
              onLoadSuccess={documentLoadSuccessHandler}
              {...DocumentProps}
            >
              {isLoading && renderedPageNumber ? (
                <Page
                  key={renderedPageNumber}
                  className="prevPage"
                  pageNumber={renderedPageNumber}
                  width={400}
                />
              ) : null}
              <Page
                width={width ? Math.min(width, maxWidth) : maxWidth}
                key={`page_${pageNumber}`}
                pageNumber={pageNumber}
                onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
                {...PageProps}
              />
            </Document>
          </Box>
        </Box>
      ) : null}
      <Box>
        <ButtonGroup
          variant="text"
          aria-label="PDF Pagination Buttons"
          fullWidth
        >
          <Button
            tabIndex={-1}
            startIcon={<NavigatePrevIcon />}
            fullWidth
            onClick={prevPgClickHander}
            disabled={pageNumber === 1}
          >
            Prev
          </Button>
          <Button
            tabIndex={-1}
            endIcon={<NavigateNextIcon />}
            fullWidth
            onClick={nextPgClickHandler}
            disabled={pageNumber === numPages}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default ReactPdfSinglePage
