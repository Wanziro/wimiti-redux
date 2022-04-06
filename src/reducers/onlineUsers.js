import {SET_ONLINE_USERS} from '../actions/onlineUsers';

const initialState = {
  onlineUsers: [],
};

const onlineUsers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONLINE_USERS:
      return {onlineUsers: action.payload};

    default:
      return state;
  }
};

export default onlineUsers;
