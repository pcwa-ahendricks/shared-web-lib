import {SET_DRAWER_VIZ} from './actionTypes'

export const uiSetDrawerViz = (open: boolean) => {
  return {
    type: SET_DRAWER_VIZ,
    open
  }
}
