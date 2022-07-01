import React from 'react';
import {View, Text, Dimensions, Image, Platform, Pressable} from 'react-native';
import WimitiColors from '../../../../../WimitiColors';
import Icon4 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {backendUserImagesUrl} from '../../../../../Config';

const width = Dimensions.get('window').width;

function ChattRoomHeader({user, navigation}) {
  // width: width- (Platform.OS==='ios'?72:118)
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: width - 25,
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <View>
          <Icon name="ios-chevron-back" size={30} color={WimitiColors.black} />
        </View>
      </Pressable>
      <View style={{marginLeft: 5}}>
        {user.image != null && user.image.trim() == '' ? (
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor: WimitiColors.black,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon3 name="user" size={20} color={WimitiColors.white} />
          </View>
        ) : (
          <Image
            source={{uri: backendUserImagesUrl + user.image}}
            style={{height: 40, width: 40, borderRadius: 50}}
          />
        )}
      </View>
      <View style={{flex: 1, marginLeft: 5}}>
        <Text
          style={{
            color: WimitiColors.black,
            marginLeft: 5,
            fontSize: 18,
            fontFamily: 'sf_pro',
            fontWeight: '700',
          }}
          numberOfLines={1}>
          {user.username}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: 120,
        }}>
        <View>
          <Icon name="videocam" size={30} color={WimitiColors.famousBlue} />
        </View>
        <View>
          <Icon name="ios-call" size={25} color={WimitiColors.famousBlue} />
        </View>
        <View>
          <Icon5
            name="dots-vertical"
            size={30}
            color={WimitiColors.famousBlue}
          />
        </View>
      </View>
    </View>
  );
}

export default ChattRoomHeader;
