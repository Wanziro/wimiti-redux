import {
  SET_SHORTS,
  SET_CURRENT_VIEWING_INDEX,
  SET_IS_LOADING_SHORTS,
  SET_FETCHING_SHORTS_FAILURE,
} from '../actions/shorts';

const initialState = {
  shorts: [],
  currentViewingIndex: 0,
  isLoadingShorts: true,
  error: null,
};

const shorts = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_SHORTS:
      return {...state, isLoadingShorts: true};
    case SET_FETCHING_SHORTS_FAILURE:
      return {...state, isLoadingShorts: false, error: action.payload};
    case SET_SHORTS:
      return {...state, isLoadingShorts: false, shorts: action.payload};
    case SET_CURRENT_VIEWING_INDEX:
      return {...state, currentViewingIndex: action.payload};
    default:
      return state;
  }
};

export default shorts;
