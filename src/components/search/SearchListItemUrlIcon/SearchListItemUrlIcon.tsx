import React, {useMemo} from 'react'
import {Box, SxProps, useTheme} from '@mui/material'
import {GoogleCseItem} from '../SearchResponse'
import WebIcon from 'mdi-material-ui/Web'
import FileImageOutlineIcon from 'mdi-material-ui/FileImageOutline'
import FileDocumentOutlineIcon from 'mdi-material-ui/FileDocumentOutline'
import {Theme} from '@lib/material-theme'

type Props = {result: GoogleCseItem}

const pdfRe = /pdf/i
const imageRe = /jpg|jpeg|png|svg/i

const SearchListItemUrlIcon = ({result}: Props) => {
  // const searchContext = useContext(SearchContext)

  const theme = useTheme<Theme>()
  const style = useMemo(
    () => ({
      webIcon: {
        verticalAlign: 'middle',
        // color: theme.palette.secondary.dark
        color: theme.palette.grey[500]
      } as SxProps<Theme>
    }),
    [theme]
  )
  const {fileFormat = ''} = result

  const isPdfLink = useMemo(() => pdfRe.test(fileFormat), [fileFormat])
  const isImageLink = useMemo(() => imageRe.test(fileFormat), [fileFormat])

  const urlIconEl = useMemo(
    () =>
      isPdfLink ? (
        <FileDocumentOutlineIcon
          fontSize="inherit"
          sx={{
            ...style.webIcon
          }}
        />
      ) : isImageLink ? (
        <FileImageOutlineIcon
          fontSize="inherit"
          sx={{
            ...style.webIcon
          }}
        />
      ) : (
        <WebIcon fontSize="inherit" sx={{...style.webIcon}} />
      ),
    [isPdfLink, style, isImageLink]
  )

  // Avoid "Div cannot be a descendant of <p>" errors with <span>.
  return <Box component="span">{urlIconEl}</Box>
}

export default SearchListItemUrlIcon
