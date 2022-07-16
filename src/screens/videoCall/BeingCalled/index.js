import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  dispatchEmitCallAccepted,
  dispatchEmitCallRejected,
  resetCall,
  setAcceptCall,
  setIsCalling,
  setRejectCall,
} from '../../../actions/call';
import {backendUserImagesUrl} from '../../../Config';
import WimitiColors from '../../../WimitiColors';
import WimitiFonts from '../../../WimitiFonts';
import CallScreen from '../callScreen';
const {height, width} = Dimensions.get('window');
function IsBeingCalledScreen() {
  const dispatch = useDispatch();
  const {
    isCalling,
    isBeingCalled,
    caller,
    callerImage,
    callee,
    callAccepted,
    callRejected,
  } = useSelector(state => state.videoCallReducer);
  const {username, image} = useSelector(state => state.currentUser);
  const {socket} = useSelector(state => state.socketReducer);

  const acceptCall = () => {
    dispatch(dispatchEmitCallAccepted(true));
    dispatch(setAcceptCall(true));
  };
  const rejectCall = () => {
    dispatch(dispatchEmitCallRejected(true));
    dispatch(setAcceptCall(false));
    dispatch(setRejectCall(false));
    dispatch(setIsCalling(false));
    // dispatch(resetCall());
  };
  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />
      {callAccepted ? (
        <CallScreen />
      ) : (
        <View>
          {image?.trim() !== '' ? (
            <ImageBackground
              source={{uri: backendUserImagesUrl + image}}
              style={{width: '100%', height: '100%'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  height,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                {callerImage !== '' ? (
                  <Image
                    source={{uri: backendUserImagesUrl + callerImage}}
                    style={{
                      width: width / 2 - 50,
                      height: width / 2 - 50,
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: width / 2 - 50,
                      height: width / 2 - 50,
                      borderRadius: 100,
                      backgroundColor: WimitiColors.black,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="user" size={50} color={WimitiColors.white} />
                  </View>
                )}
                <View style={{marginVertical: 20}}>
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 20,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    Incoming call from
                  </Text>
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 20,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    {caller}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableWithoutFeedback onPress={() => acceptCall()}>
                    <View style={{marginRight: 70}}>
                      <View
                        style={{
                          backgroundColor: WimitiColors.green,
                          padding: 30,
                          borderRadius: 100,
                        }}>
                        <Icon2
                          name="ios-call"
                          color={WimitiColors.white}
                          size={25}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: WimitiColors.white,
                          marginTop: 10,
                        }}>
                        Accept call
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => rejectCall()}>
                    <View>
                      <View
                        style={{
                          backgroundColor: WimitiColors.red,
                          padding: 30,
                          borderRadius: 100,
                        }}>
                        <Icon2
                          name="ios-call"
                          color={WimitiColors.white}
                          size={25}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: WimitiColors.white,
                          marginTop: 10,
                        }}>
                        Reject call
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </ImageBackground>
          ) : (
            <ImageBackground
              source={require('../../../../assets/pattern.png')}
              style={{width: '100%', height: '100%'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  height,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                }}>
                {callerImage !== '' ? (
                  <Image
                    source={{uri: backendUserImagesUrl + callerImage}}
                    style={{
                      width: width / 2 - 50,
                      height: width / 2 - 50,
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: width / 2 - 50,
                      height: width / 2 - 50,
                      borderRadius: 100,
                      backgroundColor: WimitiColors.black,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="user" size={50} color={WimitiColors.white} />
                  </View>
                )}
                <View style={{marginVertical: 20}}>
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 20,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    Incoming call from
                  </Text>
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 20,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    {caller}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableWithoutFeedback onPress={() => acceptCall()}>
                    <View style={{marginRight: 70}}>
                      <View
                        style={{
                          backgroundColor: WimitiColors.green,
                          padding: 30,
                          borderRadius: 100,
                        }}>
                        <Icon2
                          name="ios-call"
                          color={WimitiColors.white}
                          size={25}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: WimitiColors.white,
                          marginTop: 10,
                        }}>
                        Accept call
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => rejectCall()}>
                    <View>
                      <View
                        style={{
                          backgroundColor: WimitiColors.red,
                          padding: 30,
                          borderRadius: 100,
                        }}>
                        <Icon2
                          name="ios-call"
                          color={WimitiColors.white}
                          size={25}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: WimitiColors.white,
                          marginTop: 10,
                        }}>
                        Reject call
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </ImageBackground>
          )}
        </View>
      )}
    </>
  );
}

export default IsBeingCalledScreen;
