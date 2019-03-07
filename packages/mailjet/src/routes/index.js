// @flow
import hecpEmailRoute from './hecp-email'
import waterWasteRoute from './water-waste'
import irrigCntrlRebateRoute from './irrigation-controller-rebate'
import {
  photoFileHandler as photoFileRoute,
  photoB64Handler as photoB64Route,
  uploadHandler as uploadRoute
} from './uploads'

export {
  hecpEmailRoute,
  waterWasteRoute,
  photoFileRoute,
  photoB64Route,
  uploadRoute,
  irrigCntrlRebateRoute
}
