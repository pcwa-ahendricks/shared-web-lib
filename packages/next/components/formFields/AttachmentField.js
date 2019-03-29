// @flow
import React, {useCallback, useRef, useEffect} from 'react'
import {
  FormControl,
  FormHelperText,
  Typography as Type
} from '@material-ui/core'
import DropzoneUploader from '@components/DropzoneUploader/DropzoneUploader'
import {type Form, type Field} from 'formik'
import {type UploadedFile} from '@components/DropzoneUploader/types'

type Props = {
  field: Field,
  form: Form,
  fullWidth: boolean,
  required: boolean,
  attachmentTitle: string
}

const UPLOAD_MB_LIMIT = 15 // Now lambda functions must be less than 5MB, but we are resizing dropped files using Jimp to roughly 3MB.
const UPLOAD_FILE_LIMIT = 5

const AttachmentField = ({
  field,
  form,
  fullWidth,
  required,
  attachmentTitle,
  ...other
}: Props) => {
  const dropzoneUploaderRef = useRef()
  const prevUploads = useRef()
  const {name, value} = field
  const {
    errors,
    setFieldValue,
    isSubmitting
    // setFieldError
    // touched
    // handleBlur
  } = form
  const currentError = errors[name]
  // Errors might be an array of errors due to yup schema. Use string variables to store messages for helper text.
  // General error will store the top-level (required) error message if error is found in form.
  const generalError =
    currentError && isString(currentError) ? currentError : null
  // Status and URL errors will store the sub-level (matches and required) error messages if errors are found in form.
  const statusError =
    currentError && Array.isArray(currentError) && currentError.length > 0
      ? currentError.map((err) => err.status)[0]
      : null
  const urlError =
    currentError && Array.isArray(currentError) && currentError.length > 0
      ? currentError.map((err) => err.url)[0]
      : null

  const resetDropzoneUploader = useCallback(() => {
    const dzUploaderInstance = dropzoneUploaderRef.current
    dzUploaderInstance &&
      dzUploaderInstance.clearUploads &&
      dzUploaderInstance.clearUploads()
    // Resetting of form value is unnecessary since change will get triggered via handler.
  }, [])

  // Seems like there would be a way to accomplish this with Formik (w/out useEffect) and forwardRef in <DropzoneUploader/> but nothing I've tried has worked.
  useEffect(() => {
    // Don't need to reset uploads on initial render or redundantly, hence use of useRef hook.
    /** Only run reset if:
     *    we have a new value
     *    and the new value is an array with no items
     *    and there is a previous value
     *    and that previous value is different than the new value (ie changed)
     */
    if (
      Array.isArray(value) &&
      value.length === 0 &&
      prevUploads.current &&
      prevUploads.current.length !== value.length
    ) {
      resetDropzoneUploader()
    }
    prevUploads.current = value
  }, [value, resetDropzoneUploader])

  // const fieldTouched = touched[name]

  const uploadedAttachmentsHandler = useCallback(
    (files: Array<UploadedFile>) => {
      // onUploadedChange files parameter always includes all uploads, regardless of their upload status so there is no need to distribute the files parameter and append the incoming to existing uploads. Simply filter and map for the relevant uploads. Uploads removed via thumbnails will also be handled by this handler.
      const attachments = files
        .map((file) => ({
          url: file.serverResponse.media
            ? file.serverResponse.media.imgix_url
            : null,
          status: file.serverResponse.status
        }))
        .filter(Boolean)

      setFieldValue(name, [...attachments])
    },
    [setFieldValue, name]
  )

  const disabled = Boolean(isSubmitting)
  const isError = Boolean(currentError)
  return (
    <FormControl
      required={required}
      margin="normal"
      // Since we are using FormHelperText error prop is required.
      error={isError}
      fullWidth={fullWidth}
    >
      <Type variant="caption" color="textSecondary" gutterBottom>
        Attach {`${attachmentTitle}(s)`}
      </Type>
      {/* withStyles (used in <DropzoneUploader/>) produces a higher order component. To access clearUploads() method use innerRef over ref prop. See https://github.com/mui-org/material-ui/issues/10106 and https://material-ui.com/customization/css-in-js/ for more info. */}
      <DropzoneUploader
        innerRef={dropzoneUploaderRef}
        subtitle={`your ${attachmentTitle.toLowerCase()}(s) here or click to browse`}
        uploadFolder="irrigation-controller"
        onUploadedChange={uploadedAttachmentsHandler}
        height={200}
        width="100%"
        accept="image/*, application/pdf"
        disabled={disabled || value.length >= UPLOAD_FILE_LIMIT}
        maxSize={1 * 1024 * 1024 * UPLOAD_MB_LIMIT}
        {...other}
      />
      {/* Prefer to show status error message over general (required) error message if both exist. URL error shouldn't ever be visible. */}
      <FormHelperText error={isError}>
        {isError ? statusError || generalError || urlError : ''}
      </FormHelperText>
    </FormControl>
  )
}

AttachmentField.defaultProps = {
  attachmentTitle: 'attachment',
  fullWidth: true,
  required: true
}

export default AttachmentField

// Returns if a value is a string
function isString(value) {
  return typeof value === 'string' || value instanceof String
}
