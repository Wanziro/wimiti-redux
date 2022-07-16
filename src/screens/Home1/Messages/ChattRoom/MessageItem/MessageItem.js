import React from 'react';
import {View, Image, Text, Dimensions, Pressable} from 'react-native';
import WimitiColors from '../../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/Octicons';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import TimeAgo from 'react-native-timeago';
import {
  backendChattFilesUrl,
  backendUserImagesUrl,
} from '../../../../../Config';
import VideoThumbnail from './VideoThumbnail';
import {SwipeRow} from 'react-native-swipe-list-view';
import WimitiFonts from '../../../../../WimitiFonts';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

function MessageItem({
  item,
  user,
  navigation,
  currentUsername,
  setReplyMessage,
}) {
  const userObj = useSelector(state => state.currentUser);
  let file = '';
  let repliedMessage = '';
  let repliedFile = '';
  const handleDeliveryIcons = () => {
    if (item.sent == false && item.delivered == false && item.seen == false) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon
            name="ios-time-outline"
            size={25}
            color={WimitiColors.textGray}
          />
        </View>
      );
    } else if (
      item.sent == 'true' &&
      item.delivered == 'false' &&
      item.seen == 'false'
    ) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon
            name="checkmark-sharp"
            size={25}
            color={WimitiColors.textGray}
          />
        </View>
      );
    } else if (
      item.sent == 'true' &&
      item.delivered == 'true' &&
      item.seen == 'false'
    ) {
      return (
        <View style={{marginLeft: 5}}>
          <Icon name="checkmark-done" size={25} color={WimitiColors.textGray} />
        </View>
      );
    } else {
      return (
        <View style={{marginLeft: 5}}>
          <Icon
            name="checkmark-done"
            size={25}
            color={WimitiColors.famousBlue}
          />
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

  if (item.repliedMessage !== '') {
    try {
      repliedMessage = JSON.parse(item.repliedMessage);
      if (repliedMessage.file != '') {
        repliedFile = JSON.parse(repliedMessage.file);
      }
    } catch (error) {
      file = item.repliedMessage;
      try {
        if (repliedMessage.file != '') {
          repliedFile = JSON.parse(repliedMessage.file);
        }
      } catch (error) {
        console.log(error);
      }
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
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View style={{maxWidth: width - (10 + 10 + 40 + 20)}}>
                    <View
                      style={{
                        backgroundColor: WimitiColors.cGrey,
                        padding: 10,
                        borderRadius: 15,
                        borderBottomRightRadius: 0,
                      }}>
                      {repliedMessage != '' && (
                        <View
                          style={{
                            borderLeftWidth: 3,
                            borderLeftColor: WimitiColors.famousBlue,
                            backgroundColor: WimitiColors.white2,
                            borderBottomRightRadius: 0,
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <View>
                              <Text
                                numberOfLines={1}
                                style={{color: WimitiColors.blue}}>
                                {repliedMessage.sender === currentUsername
                                  ? 'You'
                                  : repliedMessage.receiver}
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={{color: WimitiColors.gray}}>
                                {repliedMessage.textMessage}
                              </Text>
                            </View>
                            {repliedFile != '' && (
                              <>
                                {repliedFile?.type?.split('/')[0] ===
                                'image' ? (
                                  <Image
                                    source={{
                                      uri:
                                        backendChattFilesUrl + repliedFile.uri,
                                    }}
                                    style={{
                                      width: 50,
                                      height: 45,
                                      borderRadius: 10,
                                      marginLeft: 10,
                                    }}
                                  />
                                ) : (
                                  <View style={{marginLeft: 10}}>
                                    <Icon2
                                      name="video"
                                      size={40}
                                      color={WimitiColors.blue}
                                    />
                                  </View>
                                )}
                              </>
                            )}
                          </View>
                        </View>
                      )}
                      {item.file !== '' && (
                        <Pressable
                          onPress={() =>
                            navigation.navigate('ChattFilePreview', {
                              message: item,
                            })
                          }>
                          {file !== '' && file?.type?.split('/')[0] == 'image' && (
                            <View>
                              {item.sent == 'true' ? (
                                <Image
                                  source={{
                                    uri: backendChattFilesUrl + file.uri,
                                  }}
                                  style={{
                                    width: width - 100,
                                    height: undefined,
                                    borderRadius: 10,
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
                          {file !== '' && file?.type?.split('/')[0] == 'video' && (
                            <View>
                              {item.sent == 'true' ? (
                                <VideoThumbnail
                                  file={file}
                                  messageId={item.id}
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
                        </Pressable>
                      )}
                      {(file !== '' && file?.type?.split('/')[0] == 'image') ||
                      (file !== '' && file?.type?.split('/')[0] == 'video') ? (
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
                        <Text
                          style={{
                            color: WimitiColors.black,
                            fontFamily: WimitiFonts.sfPro,
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: 14,
                          }}>
                          {item.textMessage}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {handleDeliveryIcons()}
                      <TimeAgo
                        time={item.date}
                        style={{color: WimitiColors.white}}
                      />
                    </View>
                  </View>
                  <View style={{marginLeft: 10}}>
                    {userObj?.image?.trim() !== '' &&
                    userObj?.image !== null ? (
                      <Image
                        source={{uri: backendUserImagesUrl + userObj.image}}
                        style={{width: 40, height: 40, borderRadius: 100}}
                      />
                    ) : (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          backgroundColor: WimitiColors.black,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon3
                          name="user"
                          size={25}
                          color={WimitiColors.white}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </SwipeRow>
          ) : (
            <SwipeRow
              swipeGestureEnded={() => {
                setReplyMessage(item);
              }}
              preview={true}
              disableLeftSwipe={true}>
              <View>{/* <Text>this is hidden</Text> */}</View>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{marginRight: 10}}>
                    {user?.image?.trim() !== '' && user?.image !== null ? (
                      <Image
                        source={{uri: backendUserImagesUrl + user.image}}
                        style={{width: 40, height: 40, borderRadius: 100}}
                      />
                    ) : (
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          backgroundColor: WimitiColors.black,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Icon3
                          name="user"
                          size={25}
                          color={WimitiColors.white}
                        />
                      </View>
                    )}
                  </View>
                  <View style={{maxWidth: width - (10 + 10 + 40 + 10)}}>
                    <View
                      style={{
                        // backgroundColor: WimitiColors.white,
                        backgroundColor: WimitiColors.white,
                        borderColor: WimitiColors.cGrey,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 15,
                        borderTopLeftRadius: 0,
                      }}>
                      {repliedMessage != '' && (
                        <View
                          style={{
                            borderLeftWidth: 3,
                            borderLeftColor: WimitiColors.blue,
                            backgroundColor: WimitiColors.fbLightGrayDark,
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <View>
                              <Text
                                numberOfLines={1}
                                style={{color: WimitiColors.blue}}>
                                {repliedMessage.sender === currentUsername
                                  ? 'You'
                                  : repliedMessage.receiver}
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={{color: WimitiColors.gray}}>
                                {repliedMessage.textMessage}
                              </Text>
                            </View>
                            {repliedFile != '' && (
                              <>
                                {repliedFile?.type?.split('/')[0] ===
                                'image' ? (
                                  <Image
                                    source={{
                                      uri:
                                        backendChattFilesUrl + repliedFile.uri,
                                    }}
                                    style={{
                                      width: 50,
                                      height: 45,
                                      borderRadius: 10,
                                      marginLeft: 10,
                                    }}
                                  />
                                ) : (
                                  <View style={{marginLeft: 10}}>
                                    <Icon2
                                      name="video"
                                      size={40}
                                      color={WimitiColors.blue}
                                    />
                                  </View>
                                )}
                              </>
                            )}
                          </View>
                        </View>
                      )}
                      {item.file !== '' && (
                        <Pressable
                          onPress={() =>
                            navigation.navigate('ChattFilePreview', {
                              message: item,
                            })
                          }>
                          {file !== '' && file?.type?.split('/')[0] == 'image' && (
                            <View>
                              {item.sent == 'true' ? (
                                <Image
                                  source={{
                                    uri: backendChattFilesUrl + file.uri,
                                  }}
                                  style={{
                                    width: width - 100,
                                    height: undefined,
                                    borderRadius: 10,
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
                          {file !== '' && file?.type?.split('/')[0] == 'video' && (
                            <View>
                              {item.sent == 'true' ? (
                                <VideoThumbnail
                                  file={file}
                                  messageId={item.id}
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
                        </Pressable>
                      )}
                      {(file !== '' && file?.type?.split('/')[0] == 'image') ||
                      (file !== '' && file?.type?.split('/')[0] == 'video') ? (
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
                      }}>
                      <TimeAgo
                        time={item.date}
                        style={{color: WimitiColors.white}}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </SwipeRow>
          )}
        </View>
      )}
    </>
  );
}

export default MessageItem;
