import initialState from './initialState'
import {FETCH_TEAM_POINTS, RECEIVE_TEAM_POINTS } from '../actions/actionTypes'

export default function teamScrumPoints(state = initialState.teamScrumPoints, action) {
  let newState
  switch (action.type) {
    case FETCH_TEAM_POINTS:
      return action
    case RECEIVE_TEAM_POINTS:
      newState = action.teamScrumPoints
      return newState
    default:
      return state
  }
}