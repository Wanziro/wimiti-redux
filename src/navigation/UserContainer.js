import React, {useEffect} from 'react';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {
  dispatchEmitCallAccepted,
  dispatchEmitCallRejected,
  recieveCall,
  setAcceptCall,
  setIsBeingCalled,
  setIsCalling,
  setRejectCall,
} from '../actions/call';
import {setSocket} from '../actions/socket';
import {addSingleMessage, fetchUserMessages} from '../actions/userMessages';
import IsBeingCalledScreen from '../screens/videoCall/BeingCalled';
import User from './User';
import {socketIoServerUrl} from '../Config';
import {setOnlineUsers} from '../actions/onlineUsers';

function UserContainer() {
  const dispatch = useDispatch();
  const {socket} = useSelector(state => state.socketReducer);
  const {
    isCalling,
    isBeingCalled,
    caller,
    callee,
    callAccepted,
    callRejected,
    emitCallAccepted,
    emitCallRejected,
  } = useSelector(state => state.videoCallReducer);
  const currentUserObj = useSelector(state => state.currentUser);

  let connectToSocketInterval;

  const handleSocketConnection = () => {
    // if (socket) {
    // if (!socket?.connected) {
    //   console.log('Not connected to the socket');
    //   dispatch(setSocket(io(socketIoServerUrl)));
    // }
    // }
  };

  //connect to the socket io server
  useEffect(() => {
    dispatch(setSocket(io(socketIoServerUrl)));
    // connectToSocketInterval = setInterval(() => {
    //   handleSocketConnection();
    // }, 10000);
    // handleSocketConnection();
    return () => {
      // clearInterval(connectToSocketInterval);
    };
  }, []);
  //connect to the socket io server

  useEffect(() => {
    socket?.emit('addUser', currentUserObj.username);
    socket?.on('getAllOnlineUsers', users => {
      console.log('all connected users', users);
      dispatch(setOnlineUsers(users));
    });
    socket?.on('getMessage', message => {
      // console.log('got message', message);
      if (message?.receiver == currentUserObj.username) {
        dispatch(addSingleMessage(message));
        dispatch(fetchUserMessages(currentUserObj.username, currentUserObj.id));
      }
    });

    socket?.on('UserAcceptedCall', users => {
      if (users.seer == currentUserObj.username) {
        console.log('Log from ' + currentUserObj.username);
        console.log('call accepted by ' + users.doer);
        dispatch(setAcceptCall(true));
      }
    });

    socket?.on('callRejectionList', users => {
      if (users.seer == currentUserObj.username) {
        console.log('Log from ' + currentUserObj.username);
        console.log('call rejected by ' + users.doer);
        dispatch(setRejectCall(true));
      }
    });

    socket?.on('getMessagesSeen', receiver => {
      //todo
      //mark all messages as seen
      dispatch(fetchUserMessages(currentUserObj.username, currentUserObj.id));
    });
    socket?.on('calledUsers', users => {
      console.log('called users ', users);
      let called = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].callee === currentUserObj.username) {
          dispatch(
            recieveCall(users[i].callee, users[i].caller, users[i].callerImage),
          );
          called = true;
          break;
        }
      }
      if (!called) {
        dispatch(setIsBeingCalled(false));
      }
    });
  }, [socket]);

  //handling call rejection and accept
  useEffect(() => {
    if (emitCallRejected) {
      if (callee == currentUserObj.username) {
        socket?.emit('callRejection', {
          doer: currentUserObj.username,
          seer: caller,
        });
      } else {
        socket?.emit('callRejection', {
          doer: currentUserObj.username,
          seer: callee,
        });
      }
      dispatch(dispatchEmitCallRejected(false));
    }

    if (emitCallAccepted) {
      if (callee == currentUserObj.username) {
        socket?.emit('callAccepted', {
          doer: currentUserObj.username,
          seer: caller,
        });
      } else {
        socket?.emit('callAccepted', {
          doer: currentUserObj.username,
          seer: callee,
        });
      }
      dispatch(dispatchEmitCallAccepted(false));
    }
  }, [emitCallAccepted, emitCallRejected]);

  return <>{isBeingCalled === true ? <IsBeingCalledScreen /> : <User />}</>;
}

export default UserContainer;
