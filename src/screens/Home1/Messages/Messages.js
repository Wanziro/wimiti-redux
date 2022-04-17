import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  Pressable,
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
        backgroundColor: WimitiColors.white,
        flex: 1,
      }}>
      <SafeAreaView>
        <View
          style={{
            position: 'relative',
            height: '100%',
          }}>
          {messages.length === 0 &&
          messagesToBeSent.length === 0 &&
          loading === true ? (
            <MessagesPlaceHolder />
          ) : (
            <ScrollView>
              <View style={{paddingHorizontal: 10}}>
                {chattRooms.length > 0 && (
                  <View
                    style={{
                      marginTop: 15,
                      marginBottom: 10,
                      position: 'relative',
                    }}>
                    <TextInput
                      style={{
                        padding: 10,
                        paddingLeft: 40,
                        height: 40,
                        borderRadius: 5,
                        backgroundColor: WimitiColors.white2,
                      }}
                      placeholder="Search"
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon2
                        name="search"
                        size={30}
                        color={WimitiColors.black}
                      />
                    </View>
                  </View>
                )}
                <ChatList
                  chattRooms={chattRooms}
                  navigation={navigation}
                  username={username}
                />
              </View>
            </ScrollView>
          )}

          <View
            style={{
              position: 'absolute',
              bottom: 30,
              right: 20,
            }}>
            <Pressable onPress={() => navigation.navigate('UsersList')}>
              <View
                style={{
                  backgroundColor: WimitiColors.black,
                  padding: 15,
                  borderRadius: 100,
                  width: 60,
                  height: 60,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="plus" size={30} color={WimitiColors.white} />
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Messages;
