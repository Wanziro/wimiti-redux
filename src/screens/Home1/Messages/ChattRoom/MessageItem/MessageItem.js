import React from 'react';
import {View, Image, Text, Dimensions, Pressable} from 'react-native';
import WimitiColors from '../../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import TimeAgo from 'react-native-timeago';
import {backendChattFilesUrl} from '../../../../../Config';
import VideoThumbnail from './VideoThumbnail';
import {SwipeRow} from 'react-native-swipe-list-view';

const {width} = Dimensions.get('window');

function MessageItem({
  item,
  user,
  navigation,
  currentUsername,
  setReplyMessage,
}) {
  let file = '';
  const handleDeliveryIcons = () => {
    if (item.sent == false && item.delivered == false && item.seen == false) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon name="ios-time-outline" size={15} color={WimitiColors.black} />
        </View>
      );
    } else if (
      item.sent == 'true' &&
      item.delivered == 'false' &&
      item.seen == 'false'
    ) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon name="checkmark-sharp" size={15} color={WimitiColors.black} />
        </View>
      );
    } else if (
      item.sent == 'true' &&
      item.delivered == 'true' &&
      item.seen == 'false'
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

  if (item.file !== '') {
    try {
      file = JSON.parse(item.file);
    } catch (error) {
      file = item.file;
    }
  }

  return (
    <>
      {verifyMessage() && (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          {item.sender === currentUsername ? (
            <SwipeRow
              swipeGestureEnded={() => {
                console.log(item);
                setReplyMessage(item);
              }}
              preview={true}
              disableRightSwipe={true}>
              <View>{/* <Text>this is hidden</Text> */}</View>
              <View
                style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <View
                  style={{
                    backgroundColor: WimitiColors.fbLightGray,
                    padding: 10,
                    borderRadius: 15,
                  }}>
                  {item.file !== '' && (
                    <Pressable
                      onPress={() =>
                        navigation.navigate('ChattFilePreview', {message: item})
                      }>
                      {file !== '' && file.type.split('/')[0] == 'image' && (
                        <View>
                          {item.sent == 'true' ? (
                            <Image
                              source={{uri: backendChattFilesUrl + file.uri}}
                              style={{
                                width: width - 100,
                                height: undefined,
                                aspectRatio: 1,
                              }}
                            />
                          ) : (
                            <Image
                              source={{uri: file.uri}}
                              style={{
                                width: width - 100,
                                height: undefined,
                                aspectRatio: 1,
                              }}
                            />
                          )}
                        </View>
                      )}
                      {file !== '' && file.type.split('/')[0] == 'video' && (
                        <View>
                          {item.sent == 'true' ? (
                            <VideoThumbnail file={file} messageId={item.id} />
                          ) : (
                            <Image
                              source={{uri: file.uri}}
                              style={{
                                width: width - 100,
                                height: undefined,
                                aspectRatio: 1,
                              }}
                            />
                          )}
                        </View>
                      )}
                    </Pressable>
                  )}
                  {(file !== '' && file.type.split('/')[0] == 'image') ||
                  (file !== '' && file.type.split('/')[0] == 'video') ? (
                    <>
                      {item.textMessage != '' && (
                        <Text
                          style={{
                            color: WimitiColors.black,
                            width: width - 100,
                            marginTop: 5,
                          }}>
                          {item.textMessage}
                        </Text>
                      )}
                    </>
                  ) : (
                    <Text style={{color: WimitiColors.black}}>
                      {item.textMessage}
                    </Text>
                  )}
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
            </SwipeRow>
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
