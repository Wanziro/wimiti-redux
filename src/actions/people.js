import Axios from 'axios';
import {backendUrl} from '../Config';
export const SET_PEOPLE = 'SET_PEOPLE';
export const IS_LOADING_PEOPLE = 'IS_LOADING_PEOPLE';
export const SET_FOLLOWERS = 'SET_FOLLOWERS';
export const ADD_FOLLOWER = 'ADD_FOLLOWER';
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER';
export const IS_LOADING_FOLLOWERS = 'IS_LOADING_FOLLOWERS';

export const setPeople = users => dispatch => {
  dispatch({
    type: SET_PEOPLE,
    payload: users,
  });
};

export const setFollowers = users => dispatch => {
  dispatch({
    type: SET_FOLLOWERS,
    payload: users,
  });
};

export const setAddFollower = username => dispatch => {
  dispatch({
    type: ADD_FOLLOWER,
    payload: username,
  });
};

export const setRemoveFollower = username => dispatch => {
  dispatch({
    type: REMOVE_FOLLOWER,
    payload: username,
  });
};

export const setIsLoadingPeople = trueOrFalse => dispatch => {
  dispatch({
    type: IS_LOADING_PEOPLE,
    payload: trueOrFalse,
  });
};

export const setIsLoadingFollowers = trueOrFalse => dispatch => {
  dispatch({
    type: IS_LOADING_FOLLOWERS,
    payload: trueOrFalse,
  });
};

export const fetchFollowers = () => (dispatch, getState) => {
  const {currentUser} = getState();
  dispatch(setIsLoadingFollowers(true));
  Axios.post(backendUrl + '/getFollowers', {
    username: currentUser.username,
    userId: currentUser.id,
  })
    .then(res => {
      dispatch(setIsLoadingFollowers(false));
      console.log(res.data);
      dispatch(setFollowers(res.data));
    })
    .catch(err => {
      dispatch(setIsLoadingFollowers(false));
    });
};

export const fetchPeople = () => dispatch => {
  dispatch(setIsLoadingPeople(true));
  Axios.get(backendUrl + '/getAllUsers')
    .then(res => {
      dispatch(setIsLoadingPeople(false));
      console.log(res.data);
      dispatch(setPeople(res.data));
    })
    .catch(err => {
      dispatch(setIsLoadingPeople(false));
    });
};
