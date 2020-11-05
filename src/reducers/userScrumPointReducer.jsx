import initialState from './initialState'
import { RECEIVE_USER_POINTS, FETCH_USER_POINTS } from '../actions/actionTypes'

export default function userPointList(state = initialState.userScrumPoints, action) {
    let newState
    switch (action.type) {
      case FETCH_USER_POINTS:
        return action
      case RECEIVE_USER_POINTS:
        newState = action.userScrumPoints
        return newState
      default:
        return state
    }
  }
