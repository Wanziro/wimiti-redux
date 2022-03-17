import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import WimitiColors from '../../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import TimeAgo from 'react-native-timeago';
import {backendChattFilesUrl} from '../../../../../Config';
import Video from 'react-native-video';

const width = Dimensions.get('window').width;

function MessageItem({item, currentUsername, user}) {
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
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <View
                style={{
                  backgroundColor: WimitiColors.fbLightGray,
                  padding: 10,
                  borderRadius: 15,
                }}>
                {item.file !== '' && (
                  <View>
                    {file !== '' && file.type.split('/')[0] == 'image' && (
                      <View>
                        {item.sent == 'true' ? (
                          <Image
                            source={{uri: backendChattFilesUrl + file.uri}}
                            style={{
                              width: width / 2,
                              height: undefined,
                              aspectRatio: 1,
                            }}
                          />
                        ) : (
                          <Image
                            source={{uri: file.uri}}
                            style={{
                              width: width / 2,
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
                          <Video
                            paused={true}
                            source={{uri: backendChattFilesUrl + file.uri}}
                            style={{
                              width: width / 2,
                              height: undefined,
                              aspectRatio: 1,
                            }}
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            source={{uri: file.uri}}
                            style={{
                              width: width / 2,
                              height: undefined,
                              aspectRatio: 1,
                            }}
                          />
                        )}
                      </View>
                    )}
                  </View>
                )}
                {(file !== '' && file.type.split('/')[0] == 'image') ||
                (file !== '' && file.type.split('/')[0] == 'video') ? (
                  <Text
                    style={{
                      color: WimitiColors.black,
                      width: 200,
                      marginTop: 5,
                    }}>
                    {item.textMessage}
                  </Text>
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
