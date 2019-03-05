// @flow
import React, {useState} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {type DroppedFile, type UploadedFile} from './DropzoneUploader'
import RemoveUploadFab from './RemoveUploadFab'
import UploadStatusIndicator from './UploadStatusIndicator'
import {Document, Page} from 'react-pdf'

type Props = {
  classes: any,
  droppedFiles: Array<DroppedFile>,
  uploadedFiles: Array<UploadedFile>,
  onRemoveUpload: (file: DroppedFile) => void
}

const styles = () => ({
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    // border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 150,
    height: 150,
    padding: 4,
    boxSizing: 'border-box'
  },
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
  }
})

const ThumbPreviews = ({
  classes,
  droppedFiles,
  uploadedFiles,
  onRemoveUpload
}: Props) => {
  const [thumbHover, setThumbHover] = useState<string | null>(null)

  return (
    <React.Fragment>
      {droppedFiles.map((file) => (
        <div className={classes.thumb} key={file.name}>
          <UploadStatusIndicator uploadedFiles={uploadedFiles} file={file}>
            <div
              className={classes.thumbInner}
              onMouseEnter={() => setThumbHover(file.name)}
              onMouseLeave={() => setThumbHover(null)}
            >
              {file.ext === 'pdf' ? (
                // <img src="/static/images/pdf.svg" />
                <Document file={file.previewUrl}>
                  {/* Since Border-box sizing is used width needs to be calculated. */}
                  <Page pageNumber={1} width={110} scale={1} />
                </Document>
              ) : (
                <img src={file.previewUrl} />
              )}
            </div>
          </UploadStatusIndicator>
          <div style={{zIndex: 11, position: 'absolute'}}>
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

export default withStyles(styles)(ThumbPreviews)
