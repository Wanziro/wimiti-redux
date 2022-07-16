import {Platform, PermissionsAndroid} from 'react-native';
import Axios from 'axios';
import {callTokenServerUrl} from '../Config';
export async function getAllPermissions() {
  // it will ask the permission for user
  try {
    if (Platform.OS === 'android') {
      const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return userResponse;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

export const getCallToken = async (username, roomName) => {
  const url = callTokenServerUrl + '/token/' + username + '/' + roomName;
  console.log(url);
  try {
    const response = await Axios.get(url);
    console.log('token response ' + response);
    return response.data.token;
  } catch (error) {
    console.log('token error');
    console.log(error);
    return '';
  }
};
