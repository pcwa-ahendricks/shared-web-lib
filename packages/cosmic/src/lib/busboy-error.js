// @flow
const util = require('util')

const errorMessages = {
  BAD_MIME_TYPE: 'Unexpected File type',
  UNKNOWN_ERROR: 'An Error Occurred',
  NO_FILENAME: 'Filename is absent',
  PROCESSING_ERROR: 'Error during image processing',
  UPLOAD_ERROR: 'Error during media upload'

  // LIMIT_FILE_SIZE: 'File too large',
  // LIMIT_FILE_COUNT: 'Too many files',
  // LIMIT_FIELD_KEY: 'Field name too long',
  // LIMIT_FIELD_VALUE: 'Field value too long',
  // LIMIT_FIELD_COUNT: 'Too many fields',
  // LIMIT_UNEXPECTED_FILE: 'Unexpected field'
}

function BusboyError(
  code: BusboyErrorCode = 'UNKNOWN_ERROR',
  field?: any
): BusboyErrorType {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = errorMessages[code.toString()]
  this.code = code
  if (field) this.field = field
  return this
}

util.inherits(BusboyError, Error)

export default BusboyError
export type BusboyErrorCode = $Keys<typeof errorMessages>
export type BusboyErrorType = {
  name: string,
  message: string,
  code: BusboyErrorCode,
  field: any
}

// Takes a function type, and returns its return type
// This is useful if you want to get the return type of some function without actually calling it at runtime.
// type ExtractReturnType = <R>(() => R) => R
// type Fn = typeof BusboyError
// export type BusboyErrorType = $Call<ExtractReturnType, Fn> // Call `ExtractReturnType` with `Fn` as an argument
