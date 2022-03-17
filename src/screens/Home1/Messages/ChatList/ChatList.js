import React from 'react';
import {View, Text} from 'react-native';
import ChatItem from './ChatItem';

const ChatList = ({chattRooms, username, navigation}) => {
  return (
    <View>
      {chattRooms.map((room, index) => (
        <ChatItem
          key={index}
          navigation={navigation}
          room={room}
          username={username}
        />
      ))}
    </View>
  );
};

export default ChatList;
