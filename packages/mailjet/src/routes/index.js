// @flow
import {postFormExamSubmit as hecpEmailRoute} from './hecp-email'
import {waterWasteHandler as waterWasteRoute} from './water-waste'
import {
  photoFileHandler as photoFileRoute,
  photoB64Handler as photoB64Route,
  photoUploadHandler as photoUploadRoute
} from './uploads'

export {
  hecpEmailRoute,
  waterWasteRoute,
  photoFileRoute,
  photoB64Route,
  photoUploadRoute
}
