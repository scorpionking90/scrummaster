import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'
const apiBaseUrl='https://kiranscrumapp.herokuapp.com/'
function teamUrl() {
    return apiBaseUrl+'associates'
}

export function receiveLogInUserTeam(data) {
  return { type: types.RECEIVE_TEAM, team: data }
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