import {
  SET_CALL,
  RESET_CALL,
  SET_IS_BEING_CALLED,
  SET_IS_CALLING,
  EMIT_CALL_ACCEPTED,
  EMIT_CALL_REJECTED,
  SET_CALL_ACCEPTED,
  SET_CALL_REJECTED,
} from '../actions/call';

const initialState = {
  isCalling: false,
  isBeingCalled: false,
  caller: null,
  callee: null,
  callerImage: null,
  callAccepted: false,
  callRejected: false,
  emitCallAccepted: false,
  emitCallRejected: false,
};

const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CALL:
      return {
        ...state,
        caller: action.payload.caller,
        callee: action.payload.callee,
        callerImage: action.payload.callerImage,
      };

    case SET_IS_BEING_CALLED:
      return {
        ...state,
        isBeingCalled: action.payload,
      };

    case SET_IS_CALLING:
      return {
        ...state,
        isCalling: action.payload,
      };
    case EMIT_CALL_ACCEPTED:
      return {
        ...state,
        emitCallAccepted: action.payload,
      };
    case EMIT_CALL_REJECTED:
      return {
        ...state,
        emitCallRejected: action.payload,
      };

    case SET_CALL_ACCEPTED:
      return {
        ...state,
        callAccepted: action.payload,
      };

    case SET_CALL_REJECTED:
      return {
        ...state,
        callRejected: action.payload,
      };

    case RESET_CALL:
      return {
        isCalling: false,
        isBeingCalled: false,
        caller: null,
        callee: null,
        callerImage: null,
        callAccepted: false,
        callRejected: false,
        emitCallAccepted: false,
        emitCallRejected: false,
      };

    default:
      return state;
  }
};

export default callReducer;
