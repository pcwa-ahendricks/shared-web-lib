// @flow
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
// States
import {uiReducer} from './reducers/ui'
import {forecastReducer, type State as ForecastState} from './reducers/forecast'
import {type State as UiState} from './reducers/ui'

export type State = {
  ui: UiState,
  forecast: ForecastState
}

const rootReducer = combineReducers({
  ui: uiReducer,
  forecast: forecastReducer
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

// TODO - State type
function configureStore(initialState: State) {
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([thunkMiddleware])
  )
  // const store = createStore(rootReducer, initialState, bindMiddleware())

  return store
}

export default configureStore
