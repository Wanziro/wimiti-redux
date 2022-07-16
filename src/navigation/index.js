import React from 'react';
import {useSelector} from 'react-redux';
import IsBeingCalledScreen from '../screens/videoCall/BeingCalled';

import Client from './Client';
import User from './User';
import UserContainer from './UserContainer';

function index() {
  const {isCalling, isBeingCalled, caller, callee, callAccepted, callRejected} =
    useSelector(state => state.videoCallReducer);
  const {username} = useSelector(state => state.currentUser);
  return (
    <>{username != '' && username != null ? <UserContainer /> : <Client />}</>
  );
}

export default index;
