import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'

const apiBaseUrl='https://kiranscrumapp.herokuapp.com/'
function url(id) {
  return  apiBaseUrl+'scrumpoints?associate=' + id + '&_sort=point:ASC'
}

function getUserPointsUrl(associateId) {
  return apiBaseUrl+'scrumpoints'
}

export function receiveScrumPoints(data) {
   
  return { type: types.RECEIVE_SCRUM_POINTS, scrumPoints: data }
}

export function receiveUserScrumPoints(data){
  return { type: types.RECEIVE_USER_POINTS, userScrumPoints: data }
}


export function getScrumPoints(id) {
  return dispatch => {
    return axios
      .get(url(id))
      .then(response => response.data)
      .then(data => dispatch(receiveScrumPoints(data)))
  }
}

export function getUserScrumPoints(associateId, scrumPointsFrom, scrumPointsTo){
  return dispatch => {
    return axios
      .get(getUserPointsUrl(),
      {
        params:{
          associate:associateId,
          created_at_lte:scrumPointsTo,
          created_at_gte:scrumPointsFrom
      }
      })
      .then(response => response.data)
      .then(data => dispatch(receiveUserScrumPoints(data)))
  }
}