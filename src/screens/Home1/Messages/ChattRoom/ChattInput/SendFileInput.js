import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import WimitiColors from '../../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {useDispatch} from 'react-redux';
import {setSendMessage} from '../../../../../actions/userMessages';
import uuid from 'react-native-uuid';

function SendFileInput({
  user,
  currentUsername,
  currentUserImage,
  selectedFile,
  setSelectedFile,
  setShowModal,
  replyMessage,
}) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const handleSendMessage = async () => {
    if (selectedFile !== null) {
      let newMessage;
      if (replyMessage !== null && replyMessage !== '') {
        newMessage = {
          uuid: uuid.v4(),
          sender: currentUsername,
          senderImage: currentUserImage,
          receiver: user.username,
          receiverImage: user.image,
          textMessage: message,
          repliedMessage: JSON.stringify(replyMessage),
          file: selectedFile,
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
          repliedMessage: '',
          file: selectedFile,
          date: new Date(),
          sent: false,
          delivered: false,
          seen: false,
        };
      }

      await dispatch(setSendMessage(newMessage));
      setMessage('');
      setShowModal(false);
      setSelectedFile(null);
    } else {
      setShowModal(false);
    }
  };
  return (
    <View
      style={{
        padding: 15,
        borderTopColor: WimitiColors.lightGray,
        borderTopWidth: 1,
        backgroundColor: WimitiColors.white,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <TextInput
          placeholder="Add caption (optional)"
          onChangeText={t => setMessage(t)}
          style={{
            padding: 10,
            borderColor: WimitiColors.black,
            borderWidth: 1,
            borderRadius: 100,
            flex: 1,
          }}
        />
        <Pressable onPress={() => handleSendMessage()}>
          <View
            style={{
              height: 50,
              width: 50,
              marginLeft: 10,
              backgroundColor: WimitiColors.black,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="send-sharp"
              color={WimitiColors.white}
              size={30}
              style={{marginLeft: 10}}
            />
          </View>
        </Pressable>
      </View>
      <View style={{marginTop: 5}}>
        <Text style={{textAlign: 'right', color: WimitiColors.black}}>
          Send to {user.username}
        </Text>
      </View>
    </View>
  );
}

export default SendFileInput;
