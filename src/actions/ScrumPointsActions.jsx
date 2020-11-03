import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'

const apiBaseUrl='https://kiranscrumapp.herokuapp.com/'
function url(id) {
  return  apiBaseUrl+'scrumpoints?associate=' + id + '&_sort=point:ASC'
}


export function receiveScrumPoints(data) {
   
  return { type: types.RECEIVE_SCRUM_POINTS, scrumPoints: data }
}


export function getScrumPoints(id) {
  return dispatch => {
    return axios
      .get(url(id))
      .then(response => response.data)
      .then(data => dispatch(receiveScrumPoints(data)))
  }
}

