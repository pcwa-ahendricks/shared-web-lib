import React, {createContext, useReducer} from 'react'

interface State {
  selectedGallery: null | string
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  selectedGallery: null
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const MultimediaContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_SELECTED_GALLERY: 'SET_SELECTED_GALLERY' = 'SET_SELECTED_GALLERY'

// Actions
export const setSelectedGallery = (gallery: State['selectedGallery']) => {
  return {
    type: SET_SELECTED_GALLERY,
    gallery
  }
}

// Reducer
const multimediaReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_SELECTED_GALLERY:
      return {
        ...state,
        selectedGallery: action.gallery
      }
    default:
      return state
  }
}

// Provider
const MultimediaProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(multimediaReducer, initialState)
  const value = {state, dispatch}
  return (
    <MultimediaContext.Provider value={value}>
      {children}
    </MultimediaContext.Provider>
  )
}

export default MultimediaProvider
