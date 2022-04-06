import Axios from 'axios';
import {backendUrl} from '../Config';

export const SET_SHORTS = 'SET_SHORTS';
export const SET_IS_LOADING_SHORTS = 'SET_IS_LOADING_SHORTS';
export const SET_CURRENT_VIEWING_INDEX = 'SET_CURRENT_VIEWING_INDEX';
export const SET_FETCHING_SHORTS_FAILURE = 'SET_FETCHING_SHORTS_FAILURE';

export const setShorts = shorts => dispatch => {
  dispatch({
    type: SET_SHORTS,
    payload: shorts,
  });
};

export const setCurrentViewingIndex = index => dispatch => {
  dispatch({
    type: SET_CURRENT_VIEWING_INDEX,
    payload: index,
  });
};

export const setFetchingShortsLoading = () => dispatch => {
  dispatch({
    type: SET_IS_LOADING_SHORTS,
  });
};

export const setFetchingShortsFailure = error => dispatch => {
  dispatch({
    type: SET_FETCHING_SHORTS_FAILURE,
    payload: error,
  });
};

export const fetchShorts = () => dispatch => {
  dispatch(setFetchingShortsLoading());
  Axios.post(backendUrl + '/getAllShorts', {})
    .then(res => {
      dispatch(setShorts(res.data));
    })
    .catch(error => {
      dispatch(setFetchingShortsFailure(error.message));
    });
};
