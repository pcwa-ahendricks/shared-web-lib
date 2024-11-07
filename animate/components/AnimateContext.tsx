import {createContext, useReducer, ReactNode, Dispatch} from 'react'

// Define the type for your animate state
interface AnimateState {
  animateDone: {[key: string]: boolean}
}

// Action types for the reducer
type AnimateAction = {
  type: 'SET_ANIMATE_DONE'
  payload: {key: string; done: boolean}
}

// Initial state
const initialState: AnimateState = {
  animateDone: {}
}

// Action Types
const Type = {
  SET_ANIMATE_DONE: 'SET_ANIMATE_DONE'
} as const

/**
 * Action creator for setting an animation as done. Accepts a key to identify the animation
 * and a boolean indicating if the animation is completed.
 *
 * @param {string} key - The unique identifier for the animation.
 * @param {boolean} done - A boolean indicating if the animation is completed.
 * @returns {AnimateAction} The action to dispatch.
 */
export const setAnimateDone = (key: string, done: boolean): AnimateAction => ({
  type: Type.SET_ANIMATE_DONE,
  payload: {key, done}
})

/**
 * Reducer function to manage animation states. Updates the animation status for the provided key.
 *
 * @param {AnimateState} state - The current state of animations.
 * @param {AnimateAction} action - The action to be handled.
 * @returns {AnimateState} The updated state after applying the action.
 */
const animateReducer = (
  state: AnimateState,
  action: AnimateAction
): AnimateState => {
  switch (action.type) {
    case 'SET_ANIMATE_DONE':
      return {
        ...state,
        animateDone: {
          ...state.animateDone,
          [action.payload.key]: action.payload.done
        }
      }
    default:
      return state
  }
}

// Define context value type
interface AnimateContextValue {
  state: AnimateState
  dispatch: Dispatch<AnimateAction>
}

// Create context
export const AnimateContext = createContext<AnimateContextValue | undefined>(
  undefined
)

/**
 * Provider component to wrap application parts that need access to animation states.
 *
 * @param {ReactNode} children - The children components to be wrapped by the context provider.
 * @returns {JSX.Element} The provider component with AnimateContext.
 */
export const AnimateProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(animateReducer, initialState)

  return (
    <AnimateContext.Provider value={{state, dispatch}}>
      {children}
    </AnimateContext.Provider>
  )
}
