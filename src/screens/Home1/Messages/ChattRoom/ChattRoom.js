import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchUserMessages,
  sendAllMessages,
} from '../../../../actions/userMessages';
import WimitiColors from '../../../../WimitiColors';
import ChattInput from './ChattInput/ChattInput';
import MessageItem from './MessageItem/MessageItem';

const ChattRoom = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {username, id} = useSelector(state => state.currentUser);
  const {messages, messagesToBeSent} = useSelector(state => state.userMessages);

  // console.log('tobe sent');
  // console.log(messagesToBeSent);

  const keyExtractor = (item, index) => index.toString();
  const user = route.params.user;

  //tobe removed
  useEffect(() => {
    dispatch(fetchUserMessages(username, id));
    dispatch(sendAllMessages(messagesToBeSent));
  }, [messagesToBeSent]);

  //send all messages that are waiting to be sent
  // useEffect(() => {
  //   dispatch(sendAllMessages(messagesToBeSent));
  // }, [messagesToBeSent]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}>
      <View style={{backgroundColor: WimitiColors.white, flex: 1}}>
        <FlatList
          inverted
          data={[...messagesToBeSent, ...messages]}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <MessageItem item={item} currentUsername={username} user={user} />
          )}
          onEndReachedThreshold={5}
          onEndReached={() => dispatch(fetchUserMessages(username, id))}
          style={{flex: 1}}
        />
        <ChattInput user={user} currentUsername={username} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChattRoom;
