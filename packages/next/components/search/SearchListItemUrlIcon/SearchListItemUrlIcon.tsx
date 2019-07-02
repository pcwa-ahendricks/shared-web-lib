import React, {useMemo} from 'react'
import {Box} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/styles'
import {GoogleCseItem} from '../SearchResponse'
import WebIcon from 'mdi-material-ui/Web'
import FileImageOutlineIcon from 'mdi-material-ui/FileImageOutline'
import FileDocumentOutlineIcon from 'mdi-material-ui/FileDocumentOutline'

const useStyles = makeStyles(() =>
  createStyles({
    webIcon: {
      verticalAlign: 'middle'
    }
  })
)
type Props = {result: GoogleCseItem}

const pdfRe = /pdf/i
const imageRe = /jpg|jpeg|png|svg/i

const SearchListItemUrlIcon = ({result}: Props) => {
  const classes = useStyles()
  // const searchContext = useContext(SearchContext)

  const {fileFormat = ''} = result

  const isPdfLink = useMemo(() => pdfRe.test(fileFormat), [fileFormat])
  const isImageLink = useMemo(() => imageRe.test(fileFormat), [fileFormat])

  const urlIconEl = useMemo(
    () =>
      isPdfLink ? (
        <FileDocumentOutlineIcon
          fontSize="inherit"
          className={classes.webIcon}
        />
      ) : isImageLink ? (
        <FileImageOutlineIcon fontSize="inherit" className={classes.webIcon} />
      ) : (
        <WebIcon fontSize="inherit" className={classes.webIcon} />
      ),
    [isPdfLink, classes, isImageLink]
  )

  // Avoid "Div cannot be a descendant of <p>" errors with <span>.
  return <Box component="span">{urlIconEl}</Box>
}

export default SearchListItemUrlIcon
