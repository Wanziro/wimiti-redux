export const SET_SHORTS = 'SET_SHORTS';
export const SET_CURRENT_VIEWING_INDEX = 'SET_CURRENT_VIEWING_INDEX';

export const setShorts = shorts => dispatch => {
  dispatch({
    type: SET_SHORTS,
    payload: shorts,
  });
};

export const setCurrentViewingIndex = index => dispatch => {
  dispatch({
    type: SET_CURRENT_VIEWING_INDEX,
    payload: index,
  });
};
