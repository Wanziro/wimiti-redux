import React from 'react';
import {View, Text, Image, Dimensions, Pressable} from 'react-native';
import WimitiColors from '../../../../WimitiColors';
import moment from 'moment';
import {backendUserImagesUrl} from '../../../../Config';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const width = Dimensions.get('window').width;
const ChatItem = ({room, username, navigation}) => {
  const getUsernameToDisplay = () => {
    if (room.sender === username) {
      return room.receiver;
    } else {
      return room.sender;
    }
  };

  const getImageToDisplay = () => {
    if (room.sender === username) {
      return room.receiverImage;
    } else {
      return room.senderImage;
    }
  };

  const userObj = () => {
    if (room.sender === username) {
      return {username: room.receiver, image: room.receiverImage};
    } else {
      return {
        username: room.sender,
        image: room.senderImage,
      };
    }
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('ChattRoom', {user: userObj()})}>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <View>
          {getImageToDisplay().trim() === '' || getImageToDisplay() == null ? (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: WimitiColors.black,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="user" size={30} color={WimitiColors.white} />
            </View>
          ) : (
            <Image
              source={{uri: backendUserImagesUrl + getImageToDisplay()}}
              style={{width: 50, height: 50, borderRadius: 100}}
            />
          )}
        </View>
        <View style={{paddingLeft: 10, flex: 1}}>
          <Text style={{color: WimitiColors.black}}>
            {getUsernameToDisplay()}
          </Text>
          <Text numberOfLines={1}>{room.textMessage}</Text>
        </View>
        <View>
          <Text style={{color: WimitiColors.black}}>
            {moment(room.date).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
