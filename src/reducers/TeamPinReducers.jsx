import initialState from './initialState'
import {  FETCH_TEAM_PIN, RECEIVE_TEAM_PIN} from '../actions/actionTypes'

export default function teamPin(state = initialState.teampin, action) {
  let newState
  switch (action.type) {
    case FETCH_TEAM_PIN:
      return action
    case RECEIVE_TEAM_PIN:
      newState = action.teampin
      return newState
    default:
      return state
  }
}