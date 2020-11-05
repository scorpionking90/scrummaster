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

function MasterPinurl(id) {
  return  apiBaseUrl+'Teams/'+id
}

export function receivePinResponseCode(data) {
   
  return { type: types.RECEIVE_PIN_RESPONSE_CODE, pinResponse: data }
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
export function putMasterPin(pin,id) {
  console.log("pin,id",pin);
  return dispatch => {
    return axios
      .put(MasterPinurl(id),
      {
        pin:pin
      })
      .then(response => response.data)
      .then(data => dispatch(receivePinResponseCode(data)))
  }
}

export function postScrumPoints(userId) {
  axios.post(getUserPointsUrl(userId), {
  "point": 2,
  "associate": {
  "id": userId
  }
  })
  .then((response) => {
  console.log(response);
  }, (error) => {
  console.log(error);
  });
  }