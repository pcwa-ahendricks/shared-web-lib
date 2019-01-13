// @flow
import {SET_DRAWER_VIZ} from '../actions/actionTypes'

export type State = {
  drawerOpen: boolean
}

export const initialState = {
  drawerOpen: false
}

export const uiReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case SET_DRAWER_VIZ:
      return {
        ...state,
        drawerOpen: action.open
      }
    default:
      return state
  }
}
