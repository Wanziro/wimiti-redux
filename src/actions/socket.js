export const SET_SOCKET = 'SET_SOCKET';

export const setSocket = socket => dispatch => {
  dispatch({
    type: SET_SOCKET,
    payload: socket,
  });
};
