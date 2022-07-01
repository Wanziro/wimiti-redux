import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import WimitiColors from '../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Octicons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import ChatList from './ChatList/ChatList';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUserMessages,
  markAllMessagesAsDelivered,
  organiseChattRooms,
  sendAllMessages,
} from '../../../actions/userMessages';
import MessagesPlaceHolder from './PlaceHolders/MessagesPlaceHolder';

const {width} = Dimensions.get('window');
function Messages({navigation}) {
  const dispatch = useDispatch();
  const {username, id} = useSelector(state => state.currentUser);
  const {socket} = useSelector(state => state.socketReducer);
  const {messages, messagesToBeSent, chattRooms, loading} = useSelector(
    state => state.userMessages,
  );

  useEffect(() => {
    dispatch(fetchUserMessages(username, id));
    dispatch(sendAllMessages({AllMessages: messagesToBeSent, socket}));
    dispatch(markAllMessagesAsDelivered());
  }, []);

  //refresh chatt rooms
  useEffect(() => {
    dispatch(organiseChattRooms([...messages, ...messagesToBeSent]));
  }, [messages, messagesToBeSent]);
  return (
    <View
      style={{
        backgroundColor: WimitiColors.cWhiteSnow,
        flex: 1,
      }}>
      <SafeAreaView>
        <View
          style={{
            height: '100%',
          }}>
          {messages.length === 0 &&
          messagesToBeSent.length === 0 &&
          loading === true ? (
            <MessagesPlaceHolder />
          ) : (
            <>
              <View style={{padding: 10}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: WimitiColors.white,
                    borderColor: WimitiColors.cGrey,
                    borderWidth: 1,
                  }}>
                  <Icon2
                    name="search"
                    size={25}
                    color={WimitiColors.textGray}
                  />
                  <TextInput
                    style={{
                      paddingVertical: 5,
                      paddingLeft: 10,
                      flex: 1,
                      width: '100%',
                      borderRadius: 10,
                      color: WimitiColors.textGray,
                    }}
                    placeholder="Search"
                  />
                </View>
              </View>
              <ScrollView>
                <View style={{paddingHorizontal: 10}}>
                  <ChatList
                    chattRooms={chattRooms}
                    navigation={navigation}
                    username={username}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Messages;
