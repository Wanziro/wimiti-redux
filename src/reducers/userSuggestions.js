import {
  SET_USER_SUGGESTIONS,
  SET_FETCH_USER_SUGGESTIONS_LOADING,
  SET_FETCH_USER_SUGGESTIONS_FAILURE,
} from '../actions/userSuggestions';

const initialState = {
  users: [],
  loading: true,
  error: '',
};

const userSuggestions = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCH_USER_SUGGESTIONS_LOADING:
      return {...state, loading: true};
    case SET_USER_SUGGESTIONS:
      return {...state, loading: false, users: action.payload};
    case SET_FETCH_USER_SUGGESTIONS_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default userSuggestions;
