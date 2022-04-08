import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, Platform, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchUserMessages,
  organiseChattRooms,
  sendAllMessages,
} from '../../../../actions/userMessages';
import WimitiColors from '../../../../WimitiColors';
import ChattInput from './ChattInput/ChattInput';
import MessageItem from './MessageItem/MessageItem';

const ChattRoom = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {username, image, id} = useSelector(state => state.currentUser);
  const {messages, messagesToBeSent} = useSelector(state => state.userMessages);
  const {socket} = useSelector(state => state.socketReducer);
  const [replyMessage, setReplyMessage] = useState(null);

  const keyExtractor = (item, index) => index.toString();
  const user = route.params.user;

  //tobe removed
  useEffect(() => {
    dispatch(fetchUserMessages(username, id));
    dispatch(sendAllMessages({AllMessages: messagesToBeSent, socket}));
  }, [messagesToBeSent]);

  //refresh chattrooms
  useEffect(() => {
    dispatch(organiseChattRooms([...messages, ...messagesToBeSent]));
  }, [messagesToBeSent, messages]);

  //send all messages that are waiting to be sent
  // useEffect(() => {
  //   dispatch(sendAllMessages(messagesToBeSent));
  // }, [messagesToBeSent]);
  const uniqueArray = array => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i].date == a[j].date) {
          a.splice(j--, 1);
        }
      }
    }

    return a;
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}>
      <View style={{backgroundColor: WimitiColors.white, flex: 1}}>
        <FlatList
          inverted
          disableVirtualization={false}
          data={uniqueArray([...messagesToBeSent, ...messages])}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <MessageItem
              item={item}
              navigation={navigation}
              currentUsername={username}
              setReplyMessage={setReplyMessage}
              user={user}
            />
          )}
          onEndReachedThreshold={5}
          onEndReached={() => dispatch(fetchUserMessages(username, id))}
          style={{flex: 1}}
        />

        <ChattInput
          user={user}
          currentUsername={username}
          currentUserImage={image}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChattRoom;
