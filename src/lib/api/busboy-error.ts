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
} as const

class BusboyError extends Error {
  public constructor(code: BusboyErrorCode = 'UNKNOWN_ERROR', field?: any) {
    super()
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name
    this.message = errorMessages[code]
    this.code = code
    if (field) this.field = field
  }
  public message: BusboyErrorMessage
  public name: string
  public field: any
  public code: BusboyErrorCode
}

export default BusboyError

export type BusboyErrorCode = keyof typeof errorMessages
type ValueOf<T> = T[keyof T]
type BusboyErrorMessage = ValueOf<typeof errorMessages>

// export interface BusboyErrorType {
//   name: string
//   message: string
//   code: BusboyErrorCode
//   field: any
// }

// Takes a function type, and returns its return type
// This is useful if you want to get the return type of some function without actually calling it at runtime.
// type ExtractReturnType = <R>(() => R) => R
// type Fn = typeof BusboyError
// export type BusboyErrorType = $Call<ExtractReturnType, Fn> // Call `ExtractReturnType` with `Fn` as an argument
