import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'

function url() {
  return 'https://kiranscrumapp.herokuapp.com/associates'
}

export function receiveActiveOrganization(data) {
  return { type: types.RECEIVE_USER, userList: data }
}

export function fetchActiveOrganization() {
  return dispatch => {
    return axios
      .get(url())
      .then(response => response.data)
      .then(data => dispatch(receiveActiveOrganization(data)))
  }
}
