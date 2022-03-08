import {
  SET_CURRENT_USER_FNAME,
  SET_CURRENT_USER_LNAME,
  SET_CURRENT_USER_ID,
  SET_CURRENT_USER_USERNAME,
  SET_CURRENT_USER_PHONE,
  SET_CURRENT_USER_EMAIL,
  SET_CURRENT_USER_IMAGE,
  RESET_CURRENT_USER,
} from '../actions/currentUser';

const initialState = {
  id: '',
  username: null,
  fname: '',
  lname: '',
  phone: '',
  email: '',
  image: '',
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_ID:
      return {...state, id: action.payload};

    case SET_CURRENT_USER_USERNAME:
      return {...state, username: action.payload};

    case SET_CURRENT_USER_FNAME:
      return {...state, fname: action.payload};

    case SET_CURRENT_USER_LNAME:
      return {...state, lname: action.payload};

    case SET_CURRENT_USER_PHONE:
      return {...state, phone: action.payload};

    case SET_CURRENT_USER_EMAIL:
      return {...state, email: action.payload};

    case SET_CURRENT_USER_IMAGE:
      return {...state, email: action.payload};

    case RESET_CURRENT_USER:
      return {
        ...state,
        id: '',
        username: null,
        fname: '',
        lname: '',
        phone: '',
        email: '',
        image: '',
      };

    default:
      return state;
  }
};

export default currentUser;
