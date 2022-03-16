import Axios from 'axios';
import {backendUrl} from '../Config';

export const SET_USER_MESSAGES = 'SET_USER_MESSAGES';
export const SET_FETCH_USER_MESSAGES_LOADING =
  'SET_FETCH_USER_MESSAGES_LOADING';
export const SET_FETCH_USER_MESSAGES_FAILURE =
  'SET_FETCH_USER_MESSAGES_FAILURE';

export const SET_SEND_MESSAGE = 'SET_SEND_MESSAGE';
export const REMOVE_MESSAGE_FROM_SENDING_LIST =
  'REMOVE_MESSAGE_FROM_SENDING_LIST';

export const setUserMessages = messages => dispatch => {
  dispatch({
    type: SET_USER_MESSAGES,
    payload: messages,
  });
};

export const setFetchUserMessagesLoading = () => dispatch => {
  dispatch({
    type: SET_FETCH_USER_MESSAGES_LOADING,
  });
};

export const removeMessageFromSendingList = message => dispatch => {
  dispatch({
    type: REMOVE_MESSAGE_FROM_SENDING_LIST,
    payload: message,
  });
};

export const setFetchUserMessagesFailure = error => dispatch => {
  dispatch({
    type: SET_FETCH_USER_MESSAGES_FAILURE,
    payload: error,
  });
};

export const setSendMessage = message => dispatch => {
  dispatch({
    type: SET_SEND_MESSAGE,
    payload: message,
  });
};

export const sendAllMessages = AllMessages => dispatch => {
  // const messageToBeSent = AllMessages[0];
  const messageToBeSent = AllMessages[AllMessages.length - 1];
  if (messageToBeSent) {
    Axios.post(backendUrl + '/sendMessage', messageToBeSent)
      .then(response => {
        //dispathchinga actions
        // const messageFromServer = response.data.messageSent;
        // console.log('message from the server', messageFromServer);
        const sortedMessages = AllMessages.filter(
          message => message.date != messageToBeSent.date,
        );
        dispatch(removeMessageFromSendingList(sortedMessages));
      })
      .catch(error => {
        console.log('error while sending message ', error.message);
      });
  }
};

export const fetchUserMessages = (username, userId) => dispatch => {
  dispatch(setFetchUserMessagesLoading());
  Axios.post(backendUrl + '/getAllMessages', {
    username,
    userId,
  })
    .then(res => {
      dispatch(setUserMessages(res.data.messages));
    })
    .catch(err => {
      dispatch(setFetchUserMessagesFailure(err.message));
    });
};
