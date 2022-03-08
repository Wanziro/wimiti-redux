import React from 'react';
import {View, Text} from 'react-native';
import WimitiColors from '../../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import TimeAgo from 'react-native-timeago';

function MessageItem({item, currentUsername, user}) {
  console.log(item);
  const handleDeliveryIcons = () => {
    if (item.sent == false && item.delivered == false && item.seen == false) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon name="ios-time-outline" size={15} color={WimitiColors.black} />
        </View>
      );
    } else if (
      item.sent == true &&
      item.delivered == false &&
      item.seen == false
    ) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon name="checkmark-sharp" size={15} color={WimitiColors.black} />
        </View>
      );
    } else if (
      item.sent == true &&
      item.delivered == true &&
      item.seen == false
    ) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon name="checkmark-done" size={15} color={WimitiColors.black} />
        </View>
      );
    } else {
      return (
        <View style={{marginLeft: 5}}>
          <Icon name="checkmark-done" size={15} color={WimitiColors.blue} />
        </View>
      );
    }
  };

  const verifyMessage = () => {
    if (
      (item.sender == currentUsername && item.receiver == user.username) ||
      (item.sender == user.username && item.receiver == currentUsername)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {verifyMessage() && (
        <View style={{marginVertical: 10, marginHorizontal: 5}}>
          {item.sender === currentUsername ? (
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <View
                style={{
                  backgroundColor: WimitiColors.fbLightGray,
                  padding: 10,
                  borderRadius: 15,
                }}>
                <Text style={{color: WimitiColors.black}}>
                  {item.textMessage}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <TimeAgo time={item.date} />
                {handleDeliveryIcons()}
              </View>
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  backgroundColor: WimitiColors.fbLightBlue,
                  padding: 10,
                  borderRadius: 15,
                }}>
                <Text style={{color: WimitiColors.black}}>
                  {item.textMessage}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
}

export default MessageItem;
