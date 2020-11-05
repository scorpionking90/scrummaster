import initialState from './initialState'
import {  FETCH_TEAM, RECEIVE_TEAM, FETCH_TEAM_POINTS, RECEIVE_TEAM_POINTS } from '../actions/actionTypes'

export default function teams(state = initialState.team, action) {
  let newState
  switch (action.type) {
    case FETCH_TEAM:
      return action
    case RECEIVE_TEAM:
      newState = action.team
      return newState
    case FETCH_TEAM_POINTS:
      return action
    case RECEIVE_TEAM_POINTS:
      newState = action.teamScrumPoints
      return newState
    default:
      return state
  }
}