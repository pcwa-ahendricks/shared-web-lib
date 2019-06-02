import {uploadHandler as uploadRoute} from './uploads'
import {getMediaHandler as getMediaRoute} from './media'
import {
  getObjects as getObjectsRoute,
  getObjectTypes as getObjectTypesRoute,
  getObjectType as getObjectTypeRoute
} from './objects'
import {
  salaryScheduleHandler as salaryScheduleRoute,
  salaryScheduleCsvHandler as salaryScheduleCsvRoute
} from './csv'

export {
  uploadRoute,
  getMediaRoute,
  getObjectsRoute,
  getObjectTypesRoute,
  getObjectTypeRoute,
  salaryScheduleRoute,
  salaryScheduleCsvRoute
}
