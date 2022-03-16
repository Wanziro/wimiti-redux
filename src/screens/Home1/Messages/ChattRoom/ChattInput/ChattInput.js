import React, {useState, useRef, useContext} from 'react';
import {View, TextInput, Dimensions, Pressable, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import Icon4 from 'react-native-vector-icons/dist/Ionicons';
import WimitiColors from '../../../../../WimitiColors';
import EmojiSelector from 'react-native-emoji-selector';
import {useDispatch} from 'react-redux';
import {setSendMessage} from '../../../../../actions/userMessages';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function ChattInput({user, currentUsername}) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);

  const handleSendMessage = async () => {
    if (message.trim() != '') {
      setIsSendingMessage(true);

      const newMessage = {
        sender: currentUsername,
        receiver: user.username,
        textMessage: message,
        date: new Date(),
        sent: false,
        delivered: false,
        seen: false,
      };
      await dispatch(setSendMessage(newMessage));
      setMessage('');
      setIsSendingMessage(false);
    } else {
      inputRef.current.focus();
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTopColor: WimitiColors.gray,
          borderTopWidth: 1,
          padding: 10,
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
            {message.trim() == '' && (
              <View>
                <Icon3 name="camera" size={25} color={WimitiColors.black} />
              </View>
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
    </View>
  );
}

export default ChattInput;
