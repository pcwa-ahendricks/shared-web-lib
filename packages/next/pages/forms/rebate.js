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
import {uploadFile} from '../../lib/services/uploadService'

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
  // attachments: [],
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
  isActive: {}
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
    setDroppedFiles((prevDroppedFiles) => [
      ...prevDroppedFiles,
      ...acceptedFiles
    ])
    // acceptedFiles.forEach(uploadFileHandler)
    for (var i = 0; i <= acceptedFiles.length; i++) {
      console.log('array length', i)
      uploadFileHandler(acceptedFiles[i])
    }
  }

  const uploadFileHandler = async (file) => {
    try {
      console.log('about to upload file', file.name)
      const response = await uploadFile(file, 'device rebate')
      if (
        response &&
        response.status &&
        response.status.toLowerCase() === 'success'
      ) {
        console.log(`about to attach ${response.filePath}`)
        setAttachFiles((prevAttachedFiles) => [
          ...prevAttachedFiles,
          response.filePath
        ])
      }
    } catch (error) {
      console.log('we caught it. No biggie.')
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
    <li key={idx}>{file}</li>
  ))

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
