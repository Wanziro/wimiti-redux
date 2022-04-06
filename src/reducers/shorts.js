import {SET_SHORTS} from '../actions/shorts';

const initialState = {
  shorts: [],
};

const shorts = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHORTS:
      return {shorts: action.payload};

    default:
      return state;
  }
};

export default shorts;
