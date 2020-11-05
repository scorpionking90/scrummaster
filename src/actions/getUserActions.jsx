import * as types from './actionTypes'
import axios from 'axios';
import { bindActionCreators, Dispatch } from 'redux'
import { compassOutline } from 'ionicons/icons';

function url() {
  return 'https://kiranscrumapp.herokuapp.com/associates'
}
function masterUrl(){
  return 'https://kiranscrumapp.herokuapp.com/Masters'
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
export function fetchLoggedInMaster(associateId) {
  return dispatch => {
    return axios
      .get(masterUrl(),{
        params:{
            associateId:associateId
        }
      })
      .then(response => response.data)
      .then(data => dispatch(receiveLoggedInUser(data)))
  }
}
export function storeLoggedInUser(isMaster){
  return {
    type: types.MASTER_FLAG,
    loggedInUserFlag: isMaster,
  }

}

