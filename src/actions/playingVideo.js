export const SET_PLAYING_VIDEO = 'SET_PLAYING_VIDEO';

export const setPlayingVideo = video => dispatch => {
  dispatch({
    type: SET_PLAYING_VIDEO,
    payload: video,
  });
};
