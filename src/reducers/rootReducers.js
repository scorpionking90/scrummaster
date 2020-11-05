import { combineReducers } from 'redux'
import loggedInUser from './userListReducer'
import scrumPoints from './ScrumPointsReducers'
import team from './TeamsReducer'
import userScrumPoints from './userScrumPointReducer'
import teamScrumPoints from './TeamsReducer'


const rootReducer = combineReducers({
  loggedInUser,
  scrumPoints,
  team,
  userScrumPoints,
  teamScrumPoints,
 
})

export default rootReducer
