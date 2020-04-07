import initialState from './initialState'
import { FETCH_USER, RECEIVE_USER } from '../actions/actionTypes'

export default function userList(state = initialState.loggedInUser, action) {
  let newState
  switch (action.type) {
    case FETCH_USER:
      return action
    case RECEIVE_USER:
      newState = action.loggedInUser
      return newState
    default:
      return state
  }
}
