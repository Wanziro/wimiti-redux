export const SET_ONLINE_USERS = 'SET_ONLINE_USERS';

export const setOnlineUsers = users => dispatch => {
  dispatch({
    type: SET_ONLINE_USERS,
    payload: users,
  });
};
