import React from 'react';
import {View, Text} from 'react-native';
import ChatItem from './ChatItem';

const ChatList = () => {
  return (
    <View>
      <ChatItem
        message="Hi Eric, am happy to see you here"
        user="Ange"
        date="12/02/2022"
        image="person1"
      />
      <ChatItem message="Hello" user="Kamana james" date="14/02/2022" />
      <ChatItem
        message="Testing message from wimit user"
        user="Kamana james"
        date="14/02/2022"
        image="person2"
      />
      <ChatItem
        message="Testing message from wimit user"
        user="Kamana james"
        date="14/02/2022"
        image="person3"
      />
      <ChatItem
        message="Testing message from wimit user"
        user="Kamana james"
        date="14/02/2022"
        image="person4"
      />
      <ChatItem
        message="Testing message from wimit user"
        user="Kamana james"
        date="14/02/2022"
        image="person5"
      />
      <ChatItem
        message="Testing message from wimit user"
        user="Kamana james"
        date="14/02/2022"
        image="person3"
      />
      <ChatItem
        message="Testing message from wimit user"
        user="Kamana james"
        date="14/02/2022"
        image="person4"
      />
      <ChatItem
        message="Testing message from wimit user"
        user="Kamana james"
        date="14/02/2022"
        image="person5"
      />
      <ChatItem
        message="Hi there, I am using wimiti"
        user="Kamana james"
        date="14/02/2022"
        image="person3"
      />
    </View>
  );
};

export default ChatList;
