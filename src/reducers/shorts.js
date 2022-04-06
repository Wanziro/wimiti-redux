import {SET_SHORTS, SET_CURRENT_VIEWING_INDEX} from '../actions/shorts';

const initialState = {
  shorts: [],
  currentViewingIndex: 0,
};

const shorts = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHORTS:
      return {...state, shorts: action.payload};

    case SET_CURRENT_VIEWING_INDEX:
      return {...state, currentViewingIndex: action.payload};

    default:
      return state;
  }
};

export default shorts;
