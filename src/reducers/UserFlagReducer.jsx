import initialState from './initialState'
import { MASTER_FLAG } from '../actions/actionTypes'

export default function loggedInUserFlag(state = initialState.loggedInUserFlag, action) {
  let newState
  switch (action.type) {
    case MASTER_FLAG:
      newState = action.loggedInUserFlag
      return newState
    default:
      return state
  }
}
