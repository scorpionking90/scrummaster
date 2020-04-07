import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'

function url() {
  return 'https://kiranscrumapp.herokuapp.com/associates'
}

export function receiveLoggedInUser(data) {
  return { type: types.RECEIVE_USER, loggedInUser: data }
}

export function fetchLoggedInUser(associateId) {
  return dispatch => {
    return axios
      .get(url(),{
        params:{
            associate_id:associateId
        }
      })
      .then(response => response.data)
      .then(data => dispatch(receiveLoggedInUser(data)))
  }
}
