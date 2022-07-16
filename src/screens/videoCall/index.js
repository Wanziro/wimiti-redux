import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {resetCall, setCall} from '../../actions/call';
import CallRejected from './CallRejected';
import CallScreen from './callScreen';
import IsCalling from './isCallingScreen';
function VideoCall({route, navigation}) {
  const dispatch = useDispatch();
  const params = route.params;
  const userObj = useSelector(state => state.currentUser);
  const {socket} = useSelector(state => state.socketReducer);
  const {isCalling, isBeingCalled, caller, callee, callAccepted, callRejected} =
    useSelector(state => state.videoCallReducer);
  useEffect(() => {
    if (params.callee?.username) {
      dispatch(
        setCall(params.callee.username, userObj.username, userObj.image),
      );
      socket?.emit('callUser', {
        caller: userObj.username,
        callee: params.callee.username,
        callerImage: userObj.image,
      });
    }
  }, []);

  const decideScreen = () => {
    if (callAccepted) {
      return <CallScreen callee={params.callee} navigation={navigation} />;
    } else if (callRejected && callAccepted === false) {
      return <CallRejected callee={params.callee} navigation={navigation} />;
    } else {
      return <IsCalling callee={params.callee} navigation={navigation} />;
    }
  };

  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />
      {decideScreen()}
    </>
  );
}

export default VideoCall;
