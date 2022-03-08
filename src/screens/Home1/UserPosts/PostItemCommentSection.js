import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import WimitiColors from '../../../WimitiColors';
import Axios from 'axios';
import {UserMainContext} from '../../Context/UserContext';
import {backendUrl, backendUserImagesUrl} from '../../../Config';

const PostItemComment = ({post}) => {
  const context = useContext(UserMainContext);
  const [isSavingComment, setisSavingComment] = useState(false);
  const [comment, setComment] = useState('');
  const handleComment = () => {
    if (comment.trim() != '') {
      setisSavingComment(true);
      Axios.post(backendUrl + '/saveComment', {
        postId: post.id,
        username: context.username,
        userId: context.userId,
        comment,
      })
        .then(res => {
          console.log(res.data);
          setComment('');
          setisSavingComment(false);
        })
        .catch(error => {
          // alert(error);
          console.log(error);
          setisSavingComment(false);
        });
    }
  };
  return (
    <View style={{marginTop: 5}}>
      {isSavingComment ? (
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View>
            <View>
              {context.userImage != null && context.userImage.trim() != '' ? (
                <Image
                  source={{uri: backendUserImagesUrl + context.userImage}}
                  style={{height: 40, width: 40, borderRadius: 50}}
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
                  <Icon2 name="user" size={20} color={WimitiColors.white} />
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 50,
              paddingHorizontal: 15,
              paddingVertical: 10,
              width: '70%',
            }}>
            <Text>{comment}</Text>
          </View>
          <View>
            <ActivityIndicator color={WimitiColors.black} size={40} />
          </View>
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View>
            <View>
              {context.userImage != null && context.userImage.trim() != '' ? (
                <Image
                  source={{uri: backendUserImagesUrl + context.userImage}}
                  style={{height: 40, width: 40, borderRadius: 50}}
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
                  <Icon2 name="user" size={20} color={WimitiColors.white} />
                </View>
              )}
            </View>
          </View>
          <TextInput
            placeholder="Say something..."
            style={{
              borderWidth: 1,
              borderRadius: 50,
              paddingHorizontal: 15,
              paddingVertical: 5,
              width: '70%',
              maxHeight: 70,
            }}
            multiline={true}
            value={comment}
            onChangeText={text => setComment(text)}
          />
          <TouchableWithoutFeedback onPress={() => handleComment()}>
            <View>
              <Icon name="send" size={40} color={WimitiColors.black} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default PostItemComment;
