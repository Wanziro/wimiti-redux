import {SET_SOCKET} from '../actions/socket';

const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return {socket: action.payload};

    default:
      return state;
  }
};

export default socketReducer;
