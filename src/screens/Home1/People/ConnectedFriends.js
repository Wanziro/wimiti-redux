import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import WimitiColors from '../../../WimitiColors';
import FriendItem from './FriendItem';

const friends = [
  {name: 'Kamana Eric', location: 'Kigali', image: 'person1'},
  {name: 'Ange', location: 'Kigali', image: 'person2'},
  {name: 'Patrick', location: 'Kenya', image: 'person3'},
];

function ConnectedFriends() {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingTop: 20,
        height: 400,
        paddingVertical: 40,
      }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Text style={{fontSize: 20, color: WimitiColors.black}}>
          Connected friends
        </Text>
        <View
          style={{
            borderBottomColor: WimitiColors.black,
            borderBottomWidth: 2,
            width: 80,
            marginLeft: 35,
            marginTop: 5,
          }}
        />
        <View style={{marginTop: 15}}>
          {friends.map((friend, index) => (
            <FriendItem friend={friend} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default ConnectedFriends;
