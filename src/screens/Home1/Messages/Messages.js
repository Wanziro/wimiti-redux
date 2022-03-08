import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import WimitiColors from '../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Octicons';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import ChatList from './ChatList/ChatList';

function Messages({navigation}) {
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
          <ScrollView>
            <View style={{paddingHorizontal: 10}}>
              <View
                style={{marginTop: 15, marginBottom: 10, position: 'relative'}}>
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
                  <Icon2 name="search" size={30} color={WimitiColors.black} />
                </View>
              </View>
              <ChatList />
            </View>
          </ScrollView>

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
