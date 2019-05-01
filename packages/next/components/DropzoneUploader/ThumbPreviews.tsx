import React, {useState, useMemo, useCallback} from 'react'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import {withWidth, Tooltip} from '@material-ui/core'
import {DroppedFile, UploadedFile} from './types'
import RemoveUploadFab from './RemoveUploadFab'
import UploadStatusIndicator from './UploadStatusIndicator'
import {Document, Page} from 'react-pdf'
import classNames from 'classnames'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'

type Props = {
  classes: any
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onRemoveUpload?: (file: DroppedFile) => void
  droppedFiles?: DroppedFile[]
  uploadedFiles?: UploadedFile[]
}

const styles = (theme: Theme) =>
  createStyles({
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
      cursor: 'pointer',
      minWidth: 0,
      overflow: 'hidden',
      width: '100%',
      '& img': {
        display: 'block',
        width: '100%',
        objectFit: 'contain'
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
  droppedFiles = [],
  uploadedFiles = [],
  onRemoveUpload,
  width
}: Props) => {
  const [thumbHover, setThumbHover] = useState<string | null>()
  const [showThumbDialog, setShowThumbDialog] = useState<boolean>(false)
  const [showThumbDialogFile, setShowThumbDialogFile] = useState<DroppedFile>()

  const thumbDialogMemo = useMemo(
    () =>
      showThumbDialogFile ? (
        <MediaPreviewDialog
          url={showThumbDialogFile.previewUrl}
          name={showThumbDialogFile.name}
          ext={showThumbDialogFile.ext}
          open={showThumbDialog}
          onClose={() => setShowThumbDialog(false)}
        />
      ) : null,
    [showThumbDialogFile, showThumbDialog]
  )

  const clickHandler = useCallback(
    (file: DroppedFile) => () => {
      setShowThumbDialog(true)
      setShowThumbDialogFile(file)
    },
    []
  )

  const removeUploadHandler = useCallback(
    (file: DroppedFile) => () => {
      onRemoveUpload && onRemoveUpload(file)
    },
    [onRemoveUpload]
  )

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
                onClick={clickHandler(file)}
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
                  <img
                    data-sizes="auto"
                    src="/static/images/placeholder-camera.png"
                    data-srcset={file.previewUrl}
                    className="lazyload"
                    alt={`Thumbnail for ${file.name} upload`}
                  />
                )}
              </div>
            </Tooltip>
            {/* <div className={classes.fileNameOverlay}>
              <Type color="inherit" variant="caption">
                {file.name}
              </Type>
            </div> */}
          </UploadStatusIndicator>
          <div className={classes.removeUploadFabContainer}>
            <RemoveUploadFab
              thumbName={file.name}
              thumbHover={thumbHover}
              onRemove={removeUploadHandler(file)}
            />
          </div>
        </div>
      ))}

      {thumbDialogMemo}
    </React.Fragment>
  )
}

export default withWidth()(withStyles(styles)(ThumbPreviews))
