import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import WimitiColors from '../../../../WimitiColors';

const width = Dimensions.get('window').width;
const ChatItem = ({message, date, user, image}) => {
  const getImage2 = image => {
    switch (image) {
      case 'person1':
        return require('../../../../../assets/images/person1.jpg');
        break;

      case 'person2':
        return require('../../../../../assets/images/person2.jpg');
        break;

      case 'person3':
        return require('../../../../../assets/images/person3.jpg');
        break;

      case 'person4':
        return require('../../../../../assets/images/person4.jpg');
        break;
      case 'person5':
        return require('../../../../../assets/images/person5.jpg');
        break;
      default:
        return require('../../../../../assets/images/person1.jpg');
        break;
    }
  };
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
      }}>
      <View>
        <Image
          source={getImage2(image)}
          style={{width: 50, height: 50, borderRadius: 100}}
        />
      </View>
      <View style={{width: width - 150, paddingLeft: 10}}>
        <Text style={{color: WimitiColors.black}}>{user}</Text>
        <Text>{message}</Text>
      </View>
      <View>
        <Text>{date}</Text>
      </View>
    </View>
  );
};

export default ChatItem;
