import Axios from 'axios';
import {backendUrl} from '../Config';
export const SET_LIKES = 'SET_LIKES';
export const SET_LIKE = 'SET_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const IS_LOADING_LIKES = 'IS_LOADING_LIKES';
export const LOADING_LIKES_ERROR = 'LOADING_LIKES_ERROR';

export const setLikes = likes => dispatch => {
  dispatch({
    type: SET_POSTS,
    payload: likes,
  });
};

export const setIsloadingLikes = value => dispatch => {
  dispatch({
    type: IS_LOADING_LIKES,
    payload: value,
  });
};

export const setLike = like => dispatch => {
  dispatch({
    type: SET_LIKE,
    payload: like,
  });
};

export const updateLikeStatus = like => dispatch => {
  dispatch({
    type: SET_LIKE,
    payload: like,
  });
};

export const setLoadingLikesError = value => dispatch => {
  dispatch({
    type: LOADING_LIKES_ERROR,
    payload: value,
  });
};

export const setRemoveLike = post => dispatch => {
  dispatch({
    type: REMOVE_LIKE,
    payload: post,
  });
};

export const fetchLikes = postId => dispatch => {
  dispatch(setIsloadingLikes(true));
  Axios.post(backendUrl + '/getPostLikes', {
    postId,
  })
    .then(res => {
      dispatch(setIsloadingLikes(false));
      dispatch(setPosts(res.data));
    })
    .catch(err => {
      dispatch(setLoadingLikesError(err.message));
    });
};

export const handleLike = postId => (dispatch, getState) => {
  const {username, id} = getState().currentUser;
  const createdAt = new Date();
  dispatch(
    setLike({
      postId,
      username,
      date: createdAt,
      status: 'pending',
    }),
  );
  Axios.post(backendUrl + '/handlePostLike', {
    postId,
    username,
    userId: id,
    date: createdAt,
  })
    .then(res => {
      if (res.data.type === 'success') {
        dispatch(
          updateLikeStatus({
            postId,
            username,
            status: 'saved',
          }),
        );
      }
    })
    .catch(err => {
      dispatch(setLoadingLikesError(err.message));
    });
};
