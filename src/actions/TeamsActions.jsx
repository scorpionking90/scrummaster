import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'
const apiBaseUrl='https://kiranscrumapp.herokuapp.com/'
function teamUrl() {
    return apiBaseUrl+'associates'
}

function teamPointsUrl() {
  return  apiBaseUrl+'scrumpoints'
}

export function receiveLogInUserTeam(data) {
  return { type: types.RECEIVE_TEAM, team: data }
}

export function receiveTeamScrumPoints(data) {
   
  return { type: types.RECEIVE_TEAM_POINTS, teamScrumPoints: data }
}

  export function getLogInUserTeam(teamId) {
  return dispatch => {
    return axios
      .get(teamUrl(),
      {
        params:{
          team:teamId
      }
      })
      .then(response => response.data)
      .then(data => dispatch(receiveLogInUserTeam(data)))
  }
}

export function getTeamScrumPoints() {
  return dispatch => {
    return axios
      .get(teamPointsUrl())
      .then(response => response.data)
      .then(data => dispatch(receiveTeamScrumPoints(data)))
  }
}