import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
// States
import {uiReducer, State as UiState} from './reducers/ui'

export type State = {
  ui: UiState
}

const rootReducer = combineReducers({
  ui: uiReducer
})

const bindMiddleware = (middleware) => {
  // const bindMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    const {composeWithDevTools} = require('redux-devtools-extension')
    const actionsBlacklist = ['SET_VIEWPORT']
    // const actionsBlacklist = []
    const composeEnhancers = composeWithDevTools({
      actionsBlacklist
    })
    return composeEnhancers(applyMiddleware(...middleware))
    // return composeEnhancers(applyMiddleware())
  }
  return applyMiddleware(...middleware)
  // return applyMiddleware()
}

function configureStore(initialState?: State) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([thunkMiddleware])
  )
  // const store = createStore(rootReducer, initialState, bindMiddleware())

  return store
}

export default configureStore
