import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {
  TwilioVideoLocalView, // to get local view
  TwilioVideoParticipantView, //to get participant view
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import KeepAwake from 'react-native-keep-awake';
import normalize from 'react-native-normalize';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPermissions, getCallToken} from '../../../helpers';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import WimitiColors from '../../../WimitiColors';
import {resetCall} from '../../../actions/call';
const {width, height} = Dimensions.get('screen');
const CallScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const {socket} = useSelector(state => state.socketReducer);
  const {isCalling, isBeingCalled, caller, callee, callAccepted, callRejected} =
    useSelector(state => state.videoCallReducer);

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVudeoEnabled] = useState(true);
  const [isButtonDisplay, setIsButtonDisplay] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState('');
  const twilioVideo = useRef(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    onConnectButtonPress();
  }, [token]);

  const init = async () => {
    await getAllPermissions();
    const tk = await getCallToken(currentUser.username, caller);
    console.log('token: ' + tk);
    setToken(tk);
    setRoomName(caller);
    onConnectButtonPress();
  };

  const onConnectButtonPress = () => {
    console.log('in on connect button preess');
    twilioVideo.current.connect({
      roomName: roomName,
      accessToken: token,
    });
    setStatus('connecting');
    console.log(status);
  };

  const onEndButtonPress = () => {
    twilioVideo.current.disconnect();
  };

  const onMuteButtonPress = () => {
    // on cliking the mic button we are setting it to mute or viceversa
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const onFlipButtonPress = () => {
    // switches between fronst camera and Rare camera
    twilioVideo.current.flipCamera();
  };
  const onRoomDidConnect = () => {
    console.log('room did connected');
    setStatus('connected');
    // console.log("over");
  };

  const onRoomDidDisconnect = ({roomName, error}) => {
    console.log('ERROR: ', JSON.stringify(error));
    console.log('disconnected');
    setStatus('disconnected');
    dispatch(resetCall());
    // alert(error.message);
  };

  const onRoomDidFailToConnect = error => {
    console.log('ERROR: ', JSON.stringify(error));
    console.log('failed to connect');
    setStatus('disconnected');
    dispatch(resetCall());
    // alert(error.message);
  };

  const onParticipantAddedVideoTrack = ({participant, track}) => {
    // call everytime a participant joins the same room
    console.log('onParticipantAddedVideoTrack: ', participant, track);
    try {
      setVideoTracks(
        new Map([
          ...videoTracks,
          [
            track.trackSid,
            {participantSid: participant.sid, videoTrackSid: track.trackSid},
          ],
        ]),
      );
      console.log('state.videoTracks', videoTracks);
    } catch (error) {
      console.log(error);
    }
  };

  const onParticipantRemovedVideoTrack = ({participant, track}) => {
    try {
      // gets called when a participant disconnects.
      console.log('onParticipantRemovedVideoTrack: ', participant, track);
      const videoTracks = videoTracks;
      videoTracks?.delete(track.trackSid);
      setVideoTracks({...videoTracks});
      dispatch(resetCall());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <KeepAwake />
      {status === 'disconnected' && (
        <View style={{marginTop: 100}}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={onConnectButtonPress}>
            <Text style={styles.Buttontext}>Reconnect</Text>
          </TouchableHighlight>
        </View>
      )}

      {(status === 'connected' || status === 'connecting') && (
        <View style={styles.callContainer}>
          {status === 'connected' && (
            <View style={styles.remoteGrid}>
              <TouchableOpacity
                style={styles.remoteVideo}
                onPress={() => {
                  setIsButtonDisplay(!isButtonDisplay);
                }}>
                {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                  return (
                    <TwilioVideoParticipantView
                      style={styles.remoteVideo}
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  );
                })}
              </TouchableOpacity>
              <TwilioVideoLocalView
                enabled={true}
                style={
                  isButtonDisplay
                    ? styles.localVideoOnButtonEnabled
                    : styles.localVideoOnButtonDisabled
                }
              />
            </View>
          )}
          <View
            style={{
              display: isButtonDisplay ? 'flex' : 'none',
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              height: 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              // backgroundColor:"blue",
              // zIndex: 2,
              zIndex: isButtonDisplay ? 2 : 0,
            }}>
            <TouchableOpacity
              style={{
                display: isButtonDisplay ? 'flex' : 'none',
                width: 60,
                height: 60,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 100 / 2,
                backgroundColor: WimitiColors.blue,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onMuteButtonPress}>
              <MIcon
                name={isAudioEnabled ? 'mic' : 'mic-off'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: isButtonDisplay ? 'flex' : 'none',
                width: 60,
                height: 60,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 100 / 2,
                backgroundColor: WimitiColors.red,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onEndButtonPress}>
              {/* <Text style={{fontSize: 12}}>End</Text> */}
              <MIcon name="call-end" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: isButtonDisplay ? 'flex' : 'none',
                width: 60,
                height: 60,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 100 / 2,
                backgroundColor: WimitiColors.blue,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onFlipButtonPress}>
              {/* <Text style={{fontSize: 12}}>Flip</Text> */}
              <MCIcon name="rotate-3d-variant" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={onRoomDidConnect}
        onRoomDidDisconnect={onRoomDidDisconnect}
        onRoomDidFailToConnect={onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight: '100%',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideoOnButtonEnabled: {
    bottom: '40%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  localVideoOnButtonDisabled: {
    bottom: '30%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'column',
  },
  remoteVideo: {
    width: wp('100%'),
    height: hp('100%'),
    zIndex: 1,
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2,
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: WimitiColors.famousBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
  },
  buttonContainer: {
    height: normalize(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: wp('90%'),
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1E3378',
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  Buttontext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  inputBox: {
    borderBottomColor: '#cccccc',
    fontSize: 16,
    width: wp('95%'),
    borderBottomWidth: 1,
  },
});

export default CallScreen;
