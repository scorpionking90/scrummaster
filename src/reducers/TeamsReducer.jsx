import initialState from './initialState'
import {  FETCH_TEAM, RECEIVE_TEAM} from '../actions/actionTypes'

export default function teams(state = initialState.team, action) {
  let newState
  switch (action.type) {
    case FETCH_TEAM:
      return action
    case RECEIVE_TEAM:
      newState = action.team
      return newState
    default:
      return state
  }
}