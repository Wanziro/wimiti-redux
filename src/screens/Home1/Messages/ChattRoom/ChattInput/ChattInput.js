import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  Keyboard,
  Modal,
  Text,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import Icon5 from 'react-native-vector-icons/dist/Octicons';
import WimitiColors from '../../../../../WimitiColors';
import EmojiSelector from 'react-native-emoji-selector';
import {useDispatch} from 'react-redux';
import {setSendMessage} from '../../../../../actions/userMessages';
import SendFileModal from './SendFileModal';
import {backendChattFilesUrl} from '../../../../../Config';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function ChattInput({
  user,
  currentUsername,
  currentUserImage,
  setReplyMessage,
  replyMessage,
}) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  let replyFile = '';

  const handleFileSelect = async () => {
    try {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'mixed',
      });
      setSelectedFile(result.assets[0]);
      setShowModal(true);
    } catch (error) {
      console.log('Error occured while selecting chatt file. ' + error.message);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() != '') {
      setIsSendingMessage(true);
      let newMessage;
      if (replyMessage !== null && replyMessage !== '') {
        newMessage = {
          sender: currentUsername,
          senderImage: currentUserImage,
          receiver: user.username,
          receiverImage: user.image,
          textMessage: message,
          file: '',
          repliedMessage: JSON.stringify(replyMessage),
          date: new Date(),
          sent: false,
          delivered: false,
          seen: false,
        };
      } else {
        newMessage = {
          sender: currentUsername,
          senderImage: currentUserImage,
          receiver: user.username,
          receiverImage: user.image,
          textMessage: message,
          file: '',
          repliedMessage: '',
          date: new Date(),
          sent: false,
          delivered: false,
          seen: false,
        };
      }
      await dispatch(setSendMessage(newMessage));
      setMessage('');
      setReplyMessage(null);
      setIsSendingMessage(false);
    } else {
      inputRef.current.focus();
    }
  };

  if (replyMessage?.file !== null) {
    try {
      replyFile = JSON.parse(replyMessage?.file);
    } catch (error) {
      replyFile = replyMessage?.file;
    }
  }
  return (
    <View
      style={{
        borderTopColor: WimitiColors.gray,
        borderTopWidth: 1,
        padding: 10,
      }}>
      {replyMessage !== null && (
        <View
          style={{
            marginVertical: 5,
            backgroundColor: WimitiColors.lightGray,
            padding: 10,
            borderRadius: 10,
            borderLeftColor: WimitiColors.blue,
            borderLeftWidth: 5,
            position: 'relative',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <View>
              {replyMessage.sender === currentUsername ? (
                <Text style={{color: WimitiColors.blue}}>You</Text>
              ) : (
                <Text numberOfLines={1} style={{color: WimitiColors.blue}}>
                  {replyMessage.sender}
                </Text>
              )}
              <Text style={{color: WimitiColors.darkGray}}>
                {replyMessage.textMessage}
              </Text>
            </View>
            {replyFile !== '' && (
              <>
                {replyFile.type.split('/')[0] === 'image' ? (
                  <Image
                    source={{uri: backendChattFilesUrl + replyFile.uri}}
                    style={{width: 50, height: 50}}
                  />
                ) : (
                  <Icon5 name="video" size={50} color={WimitiColors.blue} />
                )}
              </>
            )}
          </View>
          <View style={{position: 'absolute', top: 0, right: 0}}>
            <View
              style={{
                backgroundColor: WimitiColors.lightGray,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Pressable onPress={() => setReplyMessage(null)}>
                <Icon4 name="close" size={30} color={WimitiColors.blue} />
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View
          style={{width: width - 90, position: 'relative', marginRight: 10}}>
          <View
            style={{
              width: '100%',
              borderColor: WimitiColors.black,
              borderWidth: 1,
              borderRadius: 20,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: WimitiColors.white2,
            }}>
            <Pressable
              onPress={() => {
                if (showEmoji) {
                  inputRef.current.focus();
                  setShowEmoji(false);
                } else {
                  Keyboard.dismiss();
                  setShowEmoji(true);
                }
              }}>
              <View>
                {showEmoji ? (
                  <Icon2 name="keyboard" size={25} color={WimitiColors.black} />
                ) : (
                  <Icon name="emotsmile" size={25} color={WimitiColors.black} />
                )}
              </View>
            </Pressable>
            <TextInput
              placeholder="Type something..."
              style={{
                paddingVertical: 0,
                borderRadius: 20,
                maxHeight: 300,
                marginLeft: 5,
                flex: 1,
              }}
              multiline={true}
              onChangeText={text => setMessage(text)}
              value={message}
              ref={inputRef}
            />
            {message.trim() === '' && (
              <Pressable onPress={() => handleFileSelect()}>
                <View>
                  <Icon3 name="camera" size={25} color={WimitiColors.black} />
                </View>
              </Pressable>
            )}
          </View>
        </View>
        <View>
          {message.trim() === '' ? (
            <View
              style={{
                padding: 10,
                backgroundColor: WimitiColors.black,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon2 name="mic" size={25} color={WimitiColors.white} />
            </View>
          ) : (
            <Pressable onPress={() => handleSendMessage()}>
              <View
                style={{
                  backgroundColor: WimitiColors.black,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Icon4
                  name="send-sharp"
                  size={25}
                  color={WimitiColors.white}
                  style={{marginLeft: 5}}
                />
              </View>
            </Pressable>
          )}
        </View>
      </View>
      {showEmoji ? (
        <View
          style={{
            height: height / 2 - 70,
            padding: 10,
          }}>
          <EmojiSelector
            columns={8}
            showSectionTitles={false}
            showTabs={false}
            placeholder="Search for emoji..."
            onEmojiSelected={emoji =>
              setMessage(currentMessage => currentMessage + emoji)
            }
          />
        </View>
      ) : null}

      <Modal visible={showModal}>
        <SendFileModal
          setShowModal={setShowModal}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          currentUsername={currentUsername}
          currentUserImage={currentUserImage}
          user={user}
        />
      </Modal>
    </View>
  );
}

export default ChattInput;
