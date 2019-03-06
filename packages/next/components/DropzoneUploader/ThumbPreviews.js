// @flow
import React, {useState} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {withWidth, Tooltip} from '@material-ui/core'
import {type DroppedFile, type UploadedFile} from './DropzoneUploader'
import RemoveUploadFab from './RemoveUploadFab'
import UploadStatusIndicator from './UploadStatusIndicator'
import {Document, Page} from 'react-pdf'
import classNames from 'classnames'

type Props = {
  classes: any,
  droppedFiles: Array<DroppedFile>,
  uploadedFiles: Array<UploadedFile>,
  onRemoveUpload: (file: DroppedFile) => void,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const styles = (theme) => ({
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    // border: '1px solid #eaeaea',
    width: 150,
    height: 150,
    marginBottom: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    padding: theme.spacing.unit / 2,
    boxSizing: 'border-box',
    '&$xs': {
      borderRadius: 1,
      width: 100,
      height: 100,
      marginBottom: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2,
      padding: theme.spacing.unit / 2 / 2
    }
  },
  xs: {},
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    width: '100%',
    '& img': {
      display: 'block',
      width: '100%',
      objectFit: 'cover'
      // height: '100%'
    }
  },
  // fileNameOverlay: {
  //   position: 'absolute',
  //   zIndex: 11,
  //   color: theme.palette.common.white,
  //   wordWrap: 'anywhere',
  //   padding: 2,
  //   fontSize: '0.65rem'
  // },
  removeUploadFabContainer: {
    position: 'absolute',
    zIndex: 12
  }
})

const ThumbPreviews = ({
  classes,
  droppedFiles,
  uploadedFiles,
  onRemoveUpload,
  width
}: Props) => {
  const [thumbHover, setThumbHover] = useState<string | null>(null)
  return (
    <React.Fragment>
      {droppedFiles.map((file) => (
        <div
          className={classNames(classes.thumb, {
            [classes.xs]: width === 'xs'
          })}
          key={file.name}
        >
          <UploadStatusIndicator uploadedFiles={uploadedFiles} file={file}>
            <Tooltip title={file.originalName} enterDelay={500}>
              <div
                className={classes.thumbInner}
                onMouseEnter={() => setThumbHover(file.name)}
                onMouseLeave={() => setThumbHover(null)}
              >
                {file.ext === 'pdf' ? (
                  // <img src="/static/images/pdf.svg" />
                  <Document file={file.previewUrl}>
                    {/* Since Border-box sizing is used width needs to be calculated. Use devtools to calculate. */}
                    <Page
                      pageNumber={1}
                      width={width === 'xs' ? 64 : 110}
                      scale={1}
                    />
                  </Document>
                ) : (
                  <img src={file.previewUrl} />
                )}
              </div>
              {/* <div className={classes.fileNameOverlay}>
              <Type color="inherit" variant="caption">
                {file.name}
              </Type>
            </div> */}
            </Tooltip>
          </UploadStatusIndicator>
          <div className={classes.removeUploadFabContainer}>
            <RemoveUploadFab
              thumbName={file.name}
              thumbHover={thumbHover}
              onRemove={() => onRemoveUpload(file)}
            />
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}

ThumbPreviews.defaultProps = {
  droppedFiles: [],
  uploadedFiles: [],
  onRemoveUpload: () => {}
}

export default withWidth()(withStyles(styles)(ThumbPreviews))
