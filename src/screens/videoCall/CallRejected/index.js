import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAcceptCall,
  setCall,
  setIsCalling,
  setRejectCall,
} from '../../../actions/call';
import {backendUserImagesUrl} from '../../../Config';
import WimitiColors from '../../../WimitiColors';
import WimitiFonts from '../../../WimitiFonts';
const {height, width} = Dimensions.get('window');
function CallRejected({callee, navigation}) {
  const {username, image} = useSelector(state => state.currentUser);
  const userObj = useSelector(state => state.currentUser);
  const {socket} = useSelector(state => state.socketReducer);
  const dispatch = useDispatch();
  const handleEndCall = () => {
    dispatch(setAcceptCall(false));
    dispatch(setRejectCall(false));
    dispatch(setIsCalling(false));
    navigation.goBack();
  };
  const handleCallAgain = () => {
    dispatch(setAcceptCall(false));
    dispatch(setRejectCall(false));
    dispatch(setIsCalling(false));
    dispatch(setCall(callee.username, userObj.username, userObj.image));
    socket?.emit('callUser', {
      caller: userObj.username,
      callee: callee.username,
      callerImage: userObj.image,
    });
  };
  return (
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
            {callee?.image?.trim() !== '' ? (
              <Image
                source={{uri: backendUserImagesUrl + image}}
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
                {callee.username}
              </Text>
              <Text
                style={{
                  fontFamily: WimitiFonts.sfPro,
                  fontSize: 16,
                  color: WimitiColors.white,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Call rejected!
              </Text>
            </View>
            <View
              style={{
                marginTop: 200,
              }}>
              <TouchableWithoutFeedback onPress={() => handleCallAgain()}>
                <View
                  style={{
                    backgroundColor: WimitiColors.green,
                    padding: 20,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginBottom: 25,
                  }}>
                  <Icon2 name="ios-call" color={WimitiColors.white} size={25} />
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 18,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      marginLeft: 10,
                    }}>
                    Call again
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleEndCall()}>
                <View
                  style={{
                    backgroundColor: WimitiColors.red,
                    padding: 20,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Icon3 name="call-end" color={WimitiColors.white} size={25} />
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 18,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      marginLeft: 10,
                    }}>
                    Cancel call
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
            {callee?.image?.trim() !== '' ? (
              <Image
                source={{uri: backendUserImagesUrl + callee.image}}
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
                {callee.username}
              </Text>
              <Text
                style={{
                  fontFamily: WimitiFonts.sfPro,
                  fontSize: 16,
                  color: WimitiColors.white,
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                Call rejected!
              </Text>
            </View>
            <View
              style={{
                marginTop: 200,
              }}>
              <TouchableWithoutFeedback onPress={() => handleCallAgain()}>
                <View
                  style={{
                    backgroundColor: WimitiColors.green,
                    padding: 20,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginBottom: 25,
                  }}>
                  <Icon2 name="ios-call" color={WimitiColors.white} size={25} />
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 18,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      marginLeft: 10,
                    }}>
                    Call again
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleEndCall()}>
                <View
                  style={{
                    backgroundColor: WimitiColors.red,
                    padding: 20,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Icon3 name="call-end" color={WimitiColors.white} size={25} />
                  <Text
                    style={{
                      fontFamily: WimitiFonts.sfPro,
                      fontSize: 18,
                      color: WimitiColors.white,
                      fontWeight: '400',
                      marginLeft: 10,
                    }}>
                    Cancel call
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

export default CallRejected;
