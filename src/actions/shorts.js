export const SET_SHORTS = 'SET_SHORTS';

export const setOnlineUsers = shorts => dispatch => {
  dispatch({
    type: SET_SHORTS,
    payload: shorts,
  });
};
