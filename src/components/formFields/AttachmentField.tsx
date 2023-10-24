import React, {useCallback, useRef, useEffect} from 'react'
import {FormControl, FormHelperText, Typography as Type} from '@mui/material'
import DropzoneUploader, {
  DropzoneUploaderHandles
} from '@components/DropzoneUploader/DropzoneUploader'
import {FieldProps} from 'formik'
import {UploadedFileAttr} from '@components/DropzoneUploader/types'

type Props = {
  attachmentTitle?: string
  required?: boolean
  fullWidth?: boolean
  disabled?: boolean
  uploadRoute?: string
} & FieldProps<any>

const UPLOAD_MB_LIMIT = 30 // Now lambda functions must be less than 5MB, but we are resizing dropped files so this can be higher.
const UPLOAD_FILE_LIMIT = 10

const AttachmentField = ({
  field,
  form,
  attachmentTitle = 'attachment',
  uploadRoute = '',
  fullWidth = true,
  required = true,
  disabled = false,
  ...other
}: Props) => {
  const dropzoneUploaderRef = useRef<DropzoneUploaderHandles>(null)
  const prevUploads = useRef<string[]>()
  const {name, value} = field
  const {
    errors,
    setFieldValue,
    isSubmitting
    // setFieldError
    // touched
    // handleBlur
  } = form
  const currentError = (errors[name] as any) || []
  const fieldHasError = Boolean(currentError)
  // Errors might be an array of errors due to yup schema. Use string variables to store messages for helper text.
  // General error will store the top-level (required) error message if error is found in form.
  const generalError =
    fieldHasError && isString(currentError) ? currentError : null
  // Status and URL errors will store the sub-level (matches and required) error messages if errors are found in form.
  const statusError =
    fieldHasError && Array.isArray(currentError) && currentError.length > 0
      ? currentError.map((err) => err && err.status).shift()
      : null
  const urlError =
    fieldHasError && Array.isArray(currentError) && currentError.length > 0
      ? currentError.map((err) => err && err.url).shift()
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
      value?.length === 0 &&
      prevUploads.current &&
      prevUploads.current.length !== value?.length
    ) {
      resetDropzoneUploader()
    }
    prevUploads.current = value
  }, [value, resetDropzoneUploader])

  const uploadedAttachmentsHandler = useCallback(
    (files: UploadedFileAttr[]) => {
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

  return (
    <FormControl
      variant="standard"
      required={required}
      // Since we are using FormHelperText error prop is required.
      error={fieldHasError}
      fullWidth={fullWidth}
    >
      <Type variant="caption" color="textSecondary" gutterBottom>
        Attach {`${attachmentTitle}`}
      </Type>
      {/* withStyles (used in <DropzoneUploader/>) produces a higher order component. To access clearUploads() method use innerRef over ref prop. See https://github.com/mui-org/material-ui/issues/10106 and https://mui.com/customization/css-in-js/ for more info. */}
      <DropzoneUploader
        ref={dropzoneUploaderRef}
        subtitle={`your ${attachmentTitle.toLowerCase()} here or click to browse`}
        uploadRoute={uploadRoute}
        onUploadedChange={uploadedAttachmentsHandler}
        height={200}
        width="100%"
        // There is currently no reasonable way to resize pdfs. Note - Vercel will not accept anything over 4.5 MB. See https://vercel.com/docs/concepts/limits/overview#serverless-function-payload-size-limit for more info.
        // Post conversion application will need to upload (occasional) pdf and/or word document.
        accept={{
          'image/*': [
            '.png',
            '.gif',
            '.jpeg',
            '.jpg',
            '.tif',
            '.tiff',
            '.webp',
            '.avif',
            '.bmp'
          ],
          'application/pdf': ['.pdf'],
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            ['.docx']
        }}
        disabled={
          disabled || isSubmitting || value?.length >= UPLOAD_FILE_LIMIT
        }
        maxSize={1 * 1024 * 1024 * UPLOAD_MB_LIMIT}
        {...other}
      />
      {/* Prefer to show status error message over general (required) error message if both exist. URL error shouldn't ever be visible. */}
      <FormHelperText error={fieldHasError}>
        {fieldHasError ? statusError || generalError || urlError : ''}
      </FormHelperText>
    </FormControl>
  )
}

export default AttachmentField

// Returns if a value is a string
function isString(value: any) {
  return typeof value === 'string' || value instanceof String
}
