import { combineReducers } from 'redux'
import loggedInUser from './userListReducer'
import scrumPoints from './ScrumPointsReducers'
import team from './TeamsReducer'
import userScrumPoints from './userScrumPointReducer'
import teamScrumPoints from './TeamScrumPointsReducer'
import loggedInUserFlag from './UserFlagReducer'
import teampin from './TeamPinReducers'

const rootReducer = combineReducers({
  loggedInUser,
  scrumPoints,
  team,
  userScrumPoints,
  teamScrumPoints,
  loggedInUserFlag,
  teampin,
})

export default rootReducer
