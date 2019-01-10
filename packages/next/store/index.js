// @flow
import {createStore, applyMiddleware, combineReducers} from 'redux'
// import {uiReducer} from './reducers/ui'
// import type {State as UiState} from './reducers/ui'
// import thunkMiddleware from 'redux-thunk'

export type State = {
  // ui: UiState
}

export const blankReducer = (state: State = {}, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  // ui: uiReducer
  blank: blankReducer
})

// const bindMiddleware = (middleware) => {
const bindMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    const {composeWithDevTools} = require('redux-devtools-extension')
    const actionsBlacklist = ['SET_VIEWPORT']
    // const actionsBlacklist = []
    const composeEnhancers = composeWithDevTools({
      actionsBlacklist
    })
    // return composeEnhancers(applyMiddleware(...middleware))
    return composeEnhancers(applyMiddleware())
  }
  // return applyMiddleware(...middleware)
  return applyMiddleware()
}

// TODO - State type
function configureStore(initialState: State) {
  // const store = createStore(rootReducer, initialState, bindMiddleware([thunkMiddleware]))
  const store = createStore(rootReducer, initialState, bindMiddleware())

  return store
}

export default configureStore
