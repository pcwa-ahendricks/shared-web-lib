import React, {useMemo} from 'react'
import {Box, Theme, makeStyles, createStyles} from '@material-ui/core'
import {GoogleCseItem} from '../SearchResponse'
import WebIcon from 'mdi-material-ui/Web'
import FileImageOutlineIcon from 'mdi-material-ui/FileImageOutline'
import FileDocumentOutlineIcon from 'mdi-material-ui/FileDocumentOutline'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    webIcon: {
      verticalAlign: 'middle',
      // color: theme.palette.secondary.dark
      color: theme.palette.grey[500]
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
