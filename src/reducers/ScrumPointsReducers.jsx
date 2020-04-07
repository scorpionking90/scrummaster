import initialState from './initialState'
import { FETCH_SCRUM_POINTS, RECEIVE_SCRUM_POINTS } from '../actions/actionTypes'

export default function userList(state = initialState.scrumPoints, action) {
  let newState
  switch (action.type) {
    case FETCH_SCRUM_POINTS:
      return action
    case RECEIVE_SCRUM_POINTS:
      newState = action.scrumPoints
      return newState
    default:
      return state
  }
}
