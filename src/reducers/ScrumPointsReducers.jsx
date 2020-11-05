import initialState from './initialState'
import { FETCH_SCRUM_POINTS, RECEIVE_SCRUM_POINTS,RECEIVE_PIN_RESPONSE_CODE } from '../actions/actionTypes'

export default function scrumPoints(state = initialState.scrumPoints, action) {
  let newState
  switch (action.type) {
    case FETCH_SCRUM_POINTS:
      return action
    case RECEIVE_SCRUM_POINTS:
      newState = action.scrumPoints
      return newState
    case RECEIVE_PIN_RESPONSE_CODE:
      return action
    default:
      return state
  }
}
