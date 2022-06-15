import Axios from 'axios';
import {backendUrl} from '../Config';
export const SET_POSTS = 'SET_POST';
export const DELETE_POST = 'DELETE_POST';
export const IS_LOADING_POSTS = 'IS_LOADING';
export const LOADING_POSTS_ERROR = 'LOADING_POSTS_ERROR';

export const setPosts = posts => dispatch => {
  dispatch({
    type: SET_POSTS,
    payload: posts,
  });
};

export const setIsloadingPosts = value => dispatch => {
  dispatch({
    type: IS_LOADING_POSTS,
    payload: value,
  });
};
export const setLoadingPostsError = value => dispatch => {
  dispatch({
    type: LOADING_POSTS_ERROR,
    payload: value,
  });
};

export const deletePost = post => dispatch => {
  dispatch({
    type: DELETE_POST,
    payload: post,
  });
};

export const fetchPosts = () => dispatch => {
  dispatch(setIsloadingPosts(true));
  Axios.get(backendUrl + '/getAllPosts')
    .then(res => {
      dispatch(setIsloadingPosts(false));
      dispatch(setPosts(res.data));
    })
    .catch(err => {
      dispatch(setLoadingPostsError(err.message));
    });
};
