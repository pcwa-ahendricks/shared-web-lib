import React, {createContext, useReducer, Dispatch} from 'react'

export interface Placeholder {
  url: string
  filename: string
  blurhash: string
}
export type Placeholders = Placeholder[]

interface State {
  placeholders: Placeholders
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  placeholders: []
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const ImageBlurContext = createContext<{
  state: State
  dispatch: Dispatch<any>
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  ADD_PLACEHOLDERS: 'ADD_PLACEHOLDERS'
} as const

// Actions

export const addPlaceholders = (placeholders: Placeholders = []) => {
  return {
    type: Type.ADD_PLACEHOLDERS,
    payload: placeholders
  }
}

// Reducer
const uiReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.ADD_PLACEHOLDERS: {
      const {placeholders} = state
      const {payload} = action || {}
      // Don't add placeholder if same placeholder already was added.
      const newPlaceholders = payload.filter((p: Placeholder) => {
        return placeholders.findIndex((e) => e.filename === p.filename) < 0
      })
      return {
        ...state,
        placeholders: [...placeholders, ...newPlaceholders]
      }
    }
    default:
      return state
  }
}

// Provider
const ImageBlurProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)
  const value = {state, dispatch}
  return (
    <ImageBlurContext.Provider value={value}>
      {children}
    </ImageBlurContext.Provider>
  )
}

export default ImageBlurProvider
