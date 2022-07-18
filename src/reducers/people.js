import {
  SET_FOLLOWERS,
  SET_PEOPLE,
  IS_LOADING_FOLLOWERS,
  IS_LOADING_PEOPLE,
  REMOVE_FOLLOWER,
  ADD_FOLLOWER,
} from '../actions/people';

const initialState = {
  followers: [],
  people: [],
  isLoadingPeople: true,
  isLoadingFollowers: true,
};

const people = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLLOWERS:
      return {...state, followers: action.payload};
    case REMOVE_FOLLOWER:
      return {
        ...state,
        followers: followers.filter(item => item != action.payload),
      };
    case ADD_FOLLOWER:
      return {
        ...state,
        followers: [...state.followers, action.payload],
      };
    case SET_PEOPLE:
      return {...state, people: action.payload};
    case IS_LOADING_FOLLOWERS:
      return {...state, isLoadingFollowers: action.payload};
    case IS_LOADING_PEOPLE:
      return {...state, isLoadingPeople: action.payload};
    default:
      return state;
  }
};

export default people;
