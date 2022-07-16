export const SET_CALL = 'SET_CALL';
export const RESET_CALL = 'RESET_CALL';
export const SET_IS_CALLING = 'SET_IS_CALLING';
export const SET_IS_BEING_CALLED = 'SET_IS_BEING_CALLED';
export const EMIT_CALL_ACCEPTED = 'EMIT_CALL_ACCEPTED';
export const EMIT_CALL_REJECTED = 'EMIT_CALL_REJECTED';
export const SET_CALL_ACCEPTED = 'CALL_ACCEPTED';
export const SET_CALL_REJECTED = 'CALL_REJECTED';

export const setCall = (callee, caller, callerImage) => dispatch => {
  dispatch({type: SET_CALL, payload: {callee, caller, callerImage}});
  dispatch(setIsCalling(true));
};

export const dispatchEmitCallAccepted = trueOrFalse => dispatch => {
  dispatch({type: EMIT_CALL_ACCEPTED, payload: trueOrFalse});
};

export const dispatchEmitCallRejected = trueOrFalse => dispatch => {
  dispatch({type: EMIT_CALL_REJECTED, payload: trueOrFalse});
};

export const setAcceptCall = trueOrFalse => dispatch => {
  dispatch({type: SET_CALL_ACCEPTED, payload: trueOrFalse});
};

export const setRejectCall = trueOrFalse => dispatch => {
  dispatch({type: SET_CALL_REJECTED, payload: trueOrFalse});
};

export const recieveCall = (callee, caller, callerImage) => dispatch => {
  dispatch({type: SET_CALL, payload: {callee, caller, callerImage}});
  dispatch(setIsBeingCalled(true));
};

export const setIsCalling = trueOrFalse => dispatch => {
  dispatch({type: SET_IS_CALLING, payload: trueOrFalse});
  dispatch({type: SET_IS_BEING_CALLED, payload: false});
};

export const setIsBeingCalled = trueOrFalse => dispatch => {
  dispatch({type: SET_IS_BEING_CALLED, payload: trueOrFalse});
  dispatch({type: SET_IS_CALLING, payload: false});
};

export const resetCall = () => dispatch => {
  dispatch({type: RESET_CALL});
};
