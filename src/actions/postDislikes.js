import Axios from 'axios';
import {backendUrl} from '../Config';
import {removeLike} from './postLikes';
export const SET_DISLIKES = 'SET_DISLIKES';
export const SET_DISLIKE = 'SET_DISLIKE';
export const UPDATE_DISLIKE = 'UPDATE_DISLIKE';
export const REMOVE_DISLIKE = 'REMOVE_DISLIKE';
export const IS_LOADING_DISLIKES = 'IS_LOADING_DISLIKES';
export const LOADING_DISLIKES_ERROR = 'LOADING_DISLIKES_ERROR';

export const setDislikes = likes => dispatch => {
  dispatch({
    type: SET_DISLIKES,
    payload: likes,
  });
};

export const setIsloadingDislikes = value => dispatch => {
  dispatch({
    type: IS_LOADING_DISLIKES,
    payload: value,
  });
};

export const setDislike = like => dispatch => {
  dispatch({
    type: SET_DISLIKE,
    payload: like,
  });
};

export const updateDislikeStatus = like => dispatch => {
  dispatch({
    type: UPDATE_DISLIKE,
    payload: like,
  });
};

export const setLoadingDislikesError = value => dispatch => {
  dispatch({
    type: LOADING_DISLIKES_ERROR,
    payload: value,
  });
};

// {
//   username,
//   postId
// }
export const removeDislike = like => dispatch => {
  dispatch({
    type: REMOVE_DISLIKE,
    payload: like,
  });
};

export const fetchDisikes = postId => dispatch => {
  dispatch(setIsloadingDislikes(true));
  Axios.post(backendUrl + '/getPostDislikes', {
    postId,
  })
    .then(res => {
      dispatch(setIsloadingDislikes(false));
      dispatch(setDislikes(res.data));
    })
    .catch(err => {
      dispatch(setLoadingDislikesError(err.message));
    });
};

export const removePostDislike = postId => (dispatch, getState) => {
  const {username, id} = getState().currentUser;
  const createdAt = new Date();
  dispatch(
    updateDislikeStatus({
      postId,
      username,
      status: 'removing',
    }),
  );
  dispatch(removeLike({postId, username, status: 'saved'}));
  Axios.post(backendUrl + '/handlePostDislike', {
    postId,
    username,
    userId: id,
    date: createdAt,
  })
    .then(res => {
      console.log('removed disLike from post');
      console.log(res.data);
      if (res.data.type === 'success') {
        dispatch(removeDislike({postId, username, status: 'saved'}));
      }
    })
    .catch(err => {
      console.log('Error while disliking post');
      console.log(err);
      dispatch(setLoadingDislikesError(err.message));
    });
};

export const handleDislike = postId => (dispatch, getState) => {
  const {username, id} = getState().currentUser;
  const createdAt = new Date();
  dispatch(
    setDislike({
      postId,
      username,
      date: createdAt,
      status: 'pending',
    }),
  );
  dispatch(removeLike({postId, username, status: 'saved'}));
  Axios.post(backendUrl + '/handlePostDislike', {
    postId,
    username,
    userId: id,
    date: createdAt,
  })
    .then(res => {
      console.log('disLiked post');
      console.log(res.data);
      if (res.data.type === 'success') {
        dispatch(
          updateDislikeStatus({
            postId,
            username,
            status: 'saved',
          }),
        );
      }
    })
    .catch(err => {
      console.log('Error while disliking post');
      console.log(err);
      dispatch(setLoadingDislikesError(err.message));
    });
};
