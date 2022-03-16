import Axios from 'axios';
import {backendUrl} from '../Config';
export const SET_USER_SUGGESTIONS = 'SET_USER_SUGGESTIONS';
export const SET_FETCH_USER_SUGGESTIONS_LOADING =
  'SET_FETCH_USER_SUGGESTIONS_LOADING';
export const SET_FETCH_USER_SUGGESTIONS_FAILURE =
  'SET_FETCH_USER_SUGGESTIONS_FAILURE';

export const setUserSuggestions = users => dispatch => {
  dispatch({
    type: SET_USER_SUGGESTIONS,
    payload: users,
  });
};

export const setFetchUserSuggestionsLoading = () => dispatch => {
  dispatch({
    type: SET_FETCH_USER_SUGGESTIONS_LOADING,
  });
};

export const setFetchUserSuggestionsFailure = error => dispatch => {
  dispatch({
    type: SET_FETCH_USER_SUGGESTIONS_FAILURE,
    payload: error,
  });
};

export const fetchUserSuggestions = (username, userId) => dispatch => {
  dispatch(setFetchUserSuggestionsLoading());
  Axios.post(backendUrl + '/suggestions', {
    username: username,
    userId: userId,
  })
    .then(res => {
      dispatch(setUserSuggestions(res.data));
    })
    .catch(err => {
      dispatch(setFetchUserSuggestionsFailure(err.message));
    });
};
