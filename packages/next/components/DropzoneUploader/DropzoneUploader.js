// @flow
import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import {
  uploadFile,
  UPLOAD_SERVICE_BASE_URL
} from '../../lib/services/uploadService'
import {Document, Page} from 'react-pdf'
import UploadStatusIndicator from './UploadStatusIndicator'

type Props = {
  classes: any
}

const styles = () => ({
  dropzoneContainer: {
    backgroundColor: '#eee'
  },
  dropzone: {
    height: 300,
    '&$isActive': {
      backgroundColor: 'purple'
    }
  },
  isActive: {},
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
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

const responseTempUrl = (response: any) => {
  return response.status && response.status.toLowerCase() === 'success'
    ? `${UPLOAD_SERVICE_BASE_URL}/${response.fileName}?folder=${
        response.fieldName
      }`
    : ''
}

const DropzoneUploader = ({classes}: Props) => {
  const [droppedFiles, setDroppedFiles] = useState<Array<any>>([])
  const [uploadedFiles, setUploadedFiles] = useState<Array<any>>([])

  const dropHandler = async (
    files: Array<any>
    // rejectedFiles: Array<any>
  ) => {
    // console.log('accepted files: ', acceptedFiles)
    // console.log('rejected files: ', rejectedFiles)
    // Add image preview urls.
    const newFiles = files.map((file) => ({
      path: file.path,
      lastModified: file.lastModified,
      name: file.name,
      type: file.type,
      size: file.size,
      fileType: extension(file.name),
      previewUrl: URL.createObjectURL(file)
    }))
    setDroppedFiles((prevDroppedFiles) => [...prevDroppedFiles, ...newFiles])
    // Upload dropped files.
    files.forEach(uploadFileHandler)
  }

  const uploadFileHandler = async (file) => {
    try {
      const response = await uploadFile(file, 'device-rebate')
      if (response) {
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          {
            ...response,
            fileType: extension(response.fileName),
            tempUrl: responseTempUrl(response)
          }
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

  // onFileDialogCancel property handler doesn't fire correctly in Firefox. Will avoid using this for now.
  // const cancelHandler = () => {
  //   alert('Canceling...')
  //   setFiles([])
  // }
  const fileList = droppedFiles.map((file, idx) => (
    <li key={idx}>
      {file.name} - {file.size} bytes
    </li>
  ))
  const attachmentList = uploadedFiles.map((file, idx) => (
    <li key={idx}>{file.tempUrl}</li>
  ))

  const thumbs = droppedFiles.map((file, idx) => {
    return (
      <div className={classes.thumb} key={idx}>
        <UploadStatusIndicator uploadedFiles={uploadedFiles} file={file}>
          <div className={classes.thumbInner}>
            {file.fileType === 'pdf' ? (
              // <img src="/static/images/pdf.svg" />
              <Document file={file.previewUrl}>
                {/* Since Border-box sizing is used width needs to be calculated. */}
                <Page pageNumber={1} width={108} scale={1} />
              </Document>
            ) : (
              <img src={file.previewUrl} />
            )}
          </div>
        </UploadStatusIndicator>
      </div>
    )
  })

  // <PageLayout title="Irrigation Canal Information">
  return (
    <div>
      <div className={classes.dropzoneContainer}>
        {/* Mime types are also checked on the back-end. */}
        <Dropzone onDrop={dropHandler} accept="image/*, application/pdf">
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
                className={classNames(classes.dropzone, {
                  [classes.isActive]: isDragActive
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                )}
              </div>
            )
          }}
        </Dropzone>
        <aside className={classes.thumbsContainer}>{thumbs}</aside>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{fileList}</ul>
        <h4>Attachments</h4>
        <ul>{attachmentList}</ul>
      </aside>
    </div>
  )
}
/* </PageLayout> */

export default withStyles(styles)(DropzoneUploader)

function extension(filename: string, lowercase = true) {
  if (!filename || typeof filename !== 'string') {
    return null
  }
  const ext = filename
    .split('.')
    .pop()
    .trim()
  if (lowercase) {
    return ext.toLowerCase()
  } else {
    return ext
  }
}
