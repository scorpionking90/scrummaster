import { combineReducers } from 'redux'
import loggedInUser from './userListReducer'
import scrumPoints from './ScrumPointsReducers'
import team from './TeamsReducer'


const rootReducer = combineReducers({
  loggedInUser,
  scrumPoints,
  team,
 
})

export default rootReducer
