import {
  SET_CLOSE_ALL,
  SET_CLOSE_FOLOW_PEOPLE,
  SET_CLOSE_ACCOUNT,
} from '../actions/setupPanel';

const initialState = {
  closeAllTabs: false,
  closeFollowTab: false,
  closeAccountTab: false,
};

const setupPanel = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLOSE_ALL:
      return {...state, closeAllTabs: true};
    case SET_CLOSE_FOLOW_PEOPLE:
      return {...state, closeFollowTab: true};
    case SET_CLOSE_ACCOUNT:
      return {...state, closeAccountTab: true};
    default:
      return state;
  }
};

export default setupPanel;
