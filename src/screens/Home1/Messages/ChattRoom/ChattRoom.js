import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {UserMainContext} from '../../../Context/UserContext';
import WimitiColors from '../../../../WimitiColors';
import ChattInput from './ChattInput/ChattInput';
import MessageItem from './MessageItem/MessageItem';
// import db from '../../../../../../controller/db';

const ChattRoom = ({route, navigation}) => {
  const context = useContext(UserMainContext);
  const [messages, setMessages] = useState([]);
  const keyExtractor = (item, index) => index.toString();
  const user = route.params.user;

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}>
      <View style={{backgroundColor: WimitiColors.white, flex: 1}}>
        <FlatList
          inverted
          data={[...context.userMessages, ...context.userMessagesToBeSent]}
          keyExtractor={keyExtractor}
          renderItem={({item}) => (
            <MessageItem
              item={item}
              currentUsername={context.username}
              user={user}
            />
          )}
          onEndReachedThreshold={5}
          // onEndReached={this.getMoreMessages}
          style={{flex: 1}}
        />
        <ChattInput user={user} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChattRoom;
