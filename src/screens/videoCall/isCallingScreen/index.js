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
import {useDispatch, useSelector} from 'react-redux';
import {dispatchEmitCallRejected, resetCall} from '../../../actions/call';
import {backendUserImagesUrl} from '../../../Config';
import WimitiColors from '../../../WimitiColors';
import WimitiFonts from '../../../WimitiFonts';
const {height, width} = Dimensions.get('window');
function IsCallingScreen({callee, navigation}) {
  const {username, image} = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const handleEndCall = () => {
    dispatch(resetCall());
    dispatch(dispatchEmitCallRejected(true));
    navigation.goBack();
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
                }}>
                Calling {callee.username}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => handleEndCall()}>
              <View
                style={{
                  marginTop: 200,
                  backgroundColor: WimitiColors.red,
                  padding: 30,
                  borderRadius: 100,
                }}>
                <Icon2 name="ios-call" color={WimitiColors.white} size={25} />
              </View>
            </TouchableWithoutFeedback>
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
                }}>
                Calling {callee.username}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => handleEndCall()}>
              <View
                style={{
                  marginTop: 200,
                  backgroundColor: WimitiColors.red,
                  padding: 30,
                  borderRadius: 100,
                }}>
                <Icon2 name="ios-call" color={WimitiColors.white} size={25} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

export default IsCallingScreen;
