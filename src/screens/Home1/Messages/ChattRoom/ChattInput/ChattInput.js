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
import Icon from 'react-native-vector-icons/dist/Feather';
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
import uuid from 'react-native-uuid';

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
        videoQuality: 'low',
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
          uuid: uuid.v4(),
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
          uuid: uuid.v4(),
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
        padding: 20,
        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 2,
        // backgroundColor: WimitiColors.white,
      }}>
      {replyMessage !== null && (
        <View
          style={{
            marginVertical: 5,
            backgroundColor: WimitiColors.fbLightGray,
            padding: 10,
            borderRadius: 10,
            borderBottomRightRadius: 0,
            borderLeftColor: WimitiColors.famousBlue,
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
                // backgroundColor: WimitiColors.famousBlue,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Pressable onPress={() => setReplyMessage(null)}>
                <Icon4 name="close" size={30} color={WimitiColors.famousBlue} />
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
          style={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 20,
            backgroundColor: WimitiColors.cGrey,
            flex: 1,
          }}>
          {message.trim() === '' && (
            <Pressable onPress={() => handleFileSelect()}>
              <View>
                <Icon3
                  name="camera"
                  size={25}
                  color={WimitiColors.famousBlue}
                />
              </View>
            </Pressable>
          )}
          <TextInput
            placeholder="Type your message..."
            style={{
              paddingVertical: 0,
              borderRadius: 20,
              maxHeight: 300,
              marginLeft: 10,
              flex: 1,
            }}
            multiline={true}
            onChangeText={text => setMessage(text)}
            value={message}
            ref={inputRef}
          />
        </View>
        <Pressable onPress={() => handleSendMessage()}>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 0,
            }}>
            <Icon4 name="send" size={30} color={WimitiColors.famousBlue} />
          </View>
        </Pressable>
      </View>

      <Modal visible={showModal}>
        <SendFileModal
          setShowModal={setShowModal}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          currentUsername={currentUsername}
          currentUserImage={currentUserImage}
          replyMessage={replyMessage}
          user={user}
        />
      </Modal>
    </View>
  );
}

export default ChattInput;
