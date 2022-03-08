import React from 'react';

import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import WimitiColors from '../../../WimitiColors';

const getImage2 = image => {
  switch (image) {
    case 'person1':
      return require('../../../../assets/images/person1.jpg');
      break;

    case 'person2':
      return require('../../../../assets/images/person2.jpg');
      break;

    case 'person3':
      return require('../../../../assets/images/person3.jpg');
      break;

    case 'person4':
      return require('../../../../assets/images/person4.jpg');
      break;
    case 'person5':
      return require('../../../../assets/images/person5.jpg');
      break;
    default:
      return require('../../../../assets/images/person1.jpg');
      break;
  }
};

function FriendItem({friend}) {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Image
            source={getImage2(friend.image)}
            style={{width: 70, height: 70}}
          />
          <View style={{padding: 10}}>
            <Text>{friend.name}</Text>
            <Text>Location : {friend.location}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: WimitiColors.darkBtn,
            padding: 15,
            borderRadius: 10,
          }}>
          <Text style={{color: WimitiColors.white}}>Request free drink</Text>
        </View>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View
          style={{
            backgroundColor: WimitiColors.blue,
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: WimitiColors.white}}>Chat</Text>
        </View>
        <View
          style={{
            backgroundColor: WimitiColors.red,
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: WimitiColors.white}}>Call</Text>
        </View>
        <View
          style={{
            backgroundColor: WimitiColors.green,
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: WimitiColors.white}}>Offer free drink</Text>
        </View>
      </View>
    </View>
  );
}

FriendItem.propTypes = {
  friend: PropTypes.object,
};

export default FriendItem;
