export const SET_CLOSE_ACCOUNT = 'SET_CLOSE_ACCOUNT';
export const SET_CLOSE_FOLOW_PEOPLE = 'SET_CLOSE_FOLOW_PEOPLE';
export const SET_CLOSE_ALL = 'SET_CLOSE_ALL';

export const handlecloseAccountTab = () => dispatch => {
  dispatch({
    type: SET_CLOSE_ACCOUNT,
  });
};
export const closeFollowPeopleTab = () => dispatch => {
  dispatch({
    type: SET_CLOSE_FOLOW_PEOPLE,
  });
};
export const closeAllSetupTabs = () => dispatch => {
  dispatch({
    type: SET_CLOSE_ALL,
  });
};
