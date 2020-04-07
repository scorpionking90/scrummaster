import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'

const apiBaseUrl='https://kiranscrumapp.herokuapp.com/'
function url() {
  return  apiBaseUrl+'scrumpoints'
}
function teamUrl() {
  return apiBaseUrl+'associates'
}

export function receiveScrumPoints(data) {
   
  return { type: types.RECEIVE_SCRUM_POINTS, scrumPoints: data }
}
export function receiveLogInUserTeam(data) {
  console.log(data);
return { type: types.RECEIVE_TEAM, team: data }
}

export function getScrumPoints() {
  return dispatch => {
    return axios
      .get(url())
      .then(response => response.data)
      .then(data => dispatch(receiveScrumPoints(data)))
  }
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
