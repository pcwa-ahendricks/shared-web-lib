import React, {createContext, useReducer} from 'react'

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
export const UiContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  ADD_PLACEHOLDERS: 'ADD_PLACEHOLDERS'
} as const

// Actions

export const addPlaceholders = ({
  position,
  active = true,
  hidden = false,
  ieOnly = false
}: {
  position: number
  active?: boolean
  hidden?: boolean
  ieOnly?: boolean
}) => {
  return {
    type: Type.ADD_PLACEHOLDERS,
    payload: {position, active, hidden, ieOnly}
  }
}

// Reducer
const uiReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.ADD_PLACEHOLDERS: {
      const {placeholders} = state
      const {payload} = action || {}
      // Don't add placeholder if same placeholder already was added.
      const exists = placeholders.findIndex(
        (p) => p.filename === action.payload.filename
      )
      if (exists >= 0) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          placeholders: [...placeholders, {...payload}]
        }
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
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export default ImageBlurProvider
