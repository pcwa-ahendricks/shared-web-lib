// @flow
import React, {useState} from 'react'
import {Typography as Type} from '@material-ui/core'
// import PageLayout from '../../components/PageLayout/PageLayout'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import Head from 'next/head'
import {Formik, Form} from 'formik'
import {string, object} from 'yup'
import {
  uploadFile,
  UPLOAD_SERVICE_BASE_URL
} from '../../lib/services/uploadService'
import {Document, Page} from 'react-pdf'

type Props = {
  classes: any
}

const formSchema = object()
  .camelCase()
  .shape({
    // attachments: array().of(string()),
    email: string()
      .email()
      .required()
      .label('Email')
  })

const initialFormValues = {
  email: ''
}

const styles = {
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
      width: 'auto',
      height: '100%'
    }
  }
}

const Rebate = ({classes}: Props) => {
  const [formIsDirty, setFormIsDirty] = useState<boolean>(false)
  const [formValues, setFormValues] = useState(null)
  const [formIsTouched, setFormIsTouched] = useState<boolean>(false)
  const [droppedFiles, setDroppedFiles] = useState<Array<any>>([])
  const [attachFiles, setAttachFiles] = useState<Array<any>>([])

  const dropHandler = async (
    acceptedFiles: Array<any>
    // rejectedFiles: Array<any>
  ) => {
    // console.log('accepted files: ', acceptedFiles)
    // console.log('rejected files: ', rejectedFiles)
    // Add image preview urls.
    const newFiles = acceptedFiles.map((file) => ({
      path: file.path,
      lastModified: file.lastModified,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file)
    }))
    setDroppedFiles((prevDroppedFiles) => [...prevDroppedFiles, ...newFiles])
    // Upload dropped files.
    acceptedFiles.forEach(uploadFileHandler)
  }

  const uploadFileHandler = async (file) => {
    try {
      const response = await uploadFile(file, 'device-rebate')
      if (
        response &&
        response.status &&
        response.status.toLowerCase() === 'success'
      ) {
        setAttachFiles((prevAttachedFiles) => [
          ...prevAttachedFiles,
          {
            ...response,
            fileType: extension(response.fileName),
            url: `${UPLOAD_SERVICE_BASE_URL}/${response.fileName}?folder=${
              response.fieldName
            }`
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
  const attachmentList = attachFiles.map((file, idx) => (
    <li key={idx}>{file.url}</li>
  ))
  const thumbs = attachFiles.map((file, idx) => {
    return (
      <div className={classes.thumb} key={idx}>
        <div className={classes.thumbInner}>
          {file.fileType === 'pdf' ? (
            // <img src="/static/images/pdf.svg" />
            <Document file={{url: `${file.url}`}}>
              <Page pageNumber={1} width={150} />
            </Document>
          ) : (
            <img src={file.url} />
          )}
        </div>
      </div>
    )
  })

  // <PageLayout title="Irrigation Canal Information">
  return (
    <React.Fragment>
      <Head>
        <title>Rebate Form</title>
        <meta name="description" content="PCWA Water Efficiency Rebate Form" />
      </Head>
      <main>
        <Type variant="h3">Rebate Form</Type>

        <Formik
          // Always run validation. Ie. don't use validateOnBlur prop cause when a valid email is actually entered the form will remain invalid until field is blurred.
          // Instead, we control the displaying of the error message below in the field to ensure the field was touched before showing errors, which will start
          // propagating as soon as the first character is entered in the input.
          initialValues={initialFormValues}
          validationSchema={formSchema}
          onSubmit={(values, actions) => {
            // Dispatch submit
            console.log(values, actions)
          }}
        >
          {({
            values,
            touched = {},
            dirty
            // errors = {},
            // handleChange,
            // handleBlur,
            // isSubmitting,
            // isValid,
          }) => {
            if (dirty !== formIsDirty) {
              setFormIsDirty(dirty)
            }
            if (values !== formValues) {
              setFormValues(values)
            }
            // Use state to save a boolean version of 'touched'.
            const formTouched = Object.keys(touched).length > 0
            if (formTouched !== formIsTouched) {
              setFormIsTouched(formTouched)
            }

            return (
              <Form>
                <div className={classes.dropzoneContainer}>
                  {/* Mime types are also checked on the back-end. */}
                  <Dropzone
                    onDrop={dropHandler}
                    accept="image/*, application/pdf"
                  >
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
                              Try dropping some files here, or click to select
                              files to upload.
                            </p>
                          )}
                        </div>
                      )
                    }}
                  </Dropzone>
                </div>
                <aside>
                  <h4>Files</h4>
                  <ul>{fileList}</ul>
                  <h4>Attachments</h4>
                  <ul>{attachmentList}</ul>
                </aside>
                <aside className={classes.thumbsContainer}>{thumbs}</aside>
              </Form>
            )
          }}
        </Formik>
      </main>
    </React.Fragment>
  )
}
/* </PageLayout> */

export default withStyles(styles)(Rebate)

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
