import Axios from 'axios';
import {backendUrl} from '../Config';

const sendMessage = async message => {
  if (typeof message != 'undefined' && message.sent == false) {
    try {
      const response = await Axios.post(backendUrl + '/sendMessage', message);
      return response.data;
    } catch (error) {
      return {type: 'error', msg: 'something went wrong while sending sms.'};
    }
  }
};

const getAllMessages = async (username, userId) => {
  try {
    const response = await Axios.post(backendUrl + '/getAllMessages', {
      username,
      userId,
    });
    return response.data;
  } catch (error) {
    return {
      type: 'error',
      msg: 'something went wrong while getting all sms.',
    };
  }
};

module.exports = {sendMessage, getAllMessages};
