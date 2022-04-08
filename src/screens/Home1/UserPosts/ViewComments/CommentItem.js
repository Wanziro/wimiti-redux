import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import WimitiColors from '../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/SimpleLineIcons';
import {backendUrl, backendUserImagesUrl} from '../../../../Config';
import TimeAgo from 'react-native-timeago';
import Axios from 'axios';
import {useSelector} from 'react-redux';

function CommentItem({comment}) {
  const {image, fname, lname, username, id} = useSelector(
    state => state.currentUser,
  );
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [isDeletingComment, setisDeletingComment] = useState(false);

  const handleLike = () => {
    if (!isLiking) {
      setIsLiking(true);
      Axios.post(backendUrl + '/handleLikeComment', {
        username: username,
        userId: id,
        postId: comment.postId,
        commentId: comment.id,
      })
        .then(res => {
          setIsLiking(false);
          console.log(res.data);
        })
        .catch(error => {
          setIsLiking(false);
          console.log(error);
        });
    }
  };

  const handleDislike = () => {
    if (!isDisliking) {
      setIsDisliking(true);
      Axios.post(backendUrl + '/handleDislikeComment', {
        username: username,
        userId: id,
        postId: comment.postId,
        commentId: comment.id,
      })
        .then(res => {
          setIsDisliking(false);
          console.log(res.data);
        })
        .catch(error => {
          setIsDisliking(false);
          console.log(error);
        });
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm',
      'Do you want to remove this comment? If yes, there will be no undo for the process.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            handleCommentRemove();
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleCommentRemove = () => {
    setisDeletingComment(true);
    Axios.post(backendUrl + '/handleDeleteComment', {
      username: username,
      userId: id,
      postId: comment.postId,
      commentId: comment.id,
    })
      .then(res => {
        // console.log(res.data);
      })
      .catch(error => {
        setisDeletingComment(false);
        alert(error);
      });
  };

  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          {comment.image != null && comment.image.trim() != '' ? (
            <Image
              source={{uri: backendUserImagesUrl + image}}
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
              <Icon name="user" size={20} color={WimitiColors.white} />
            </View>
          )}
        </View>
        <View style={{width: '85%'}}>
          <Text style={{color: WimitiColors.black}}>
            {comment.owner.fname} {comment.owner.lname}
          </Text>
          <Text style={{color: WimitiColors.gray}}>
            @{comment.owner.username}
          </Text>
          <View style={{marginTop: 5}}>
            <Text style={{color: WimitiColors.black}}>{comment.comment}</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TimeAgo time={comment.date} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback onPress={() => handleLike()}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 10,
                  }}>
                  <Icon2 name="like" size={20} />
                  {isLiking ? (
                    <ActivityIndicator size={20} color={WimitiColors.black} />
                  ) : (
                    <>
                      {comment.likes != 0 && (
                        <Text style={{fontSize: 20, paddingLeft: 5}}>
                          {comment.likes}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleDislike()}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Icon2 name="dislike" size={20} />
                  {isDisliking ? (
                    <ActivityIndicator
                      size={20}
                      color={WimitiColors.black}
                      style={{marginLeft: 5}}
                    />
                  ) : (
                    <>
                      {comment.dislikes != 0 && (
                        <Text style={{fontSize: 20, paddingLeft: 5}}>
                          {comment.dislikes}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {comment.owner.username === username && (
            <View style={{marginTop: 5}}>
              <TouchableWithoutFeedback onPress={() => confirmDelete()}>
                {isDeletingComment ? (
                  <Text style={{color: WimitiColors.blue, textAlign: 'right'}}>
                    Removing comment...
                  </Text>
                ) : (
                  <Text style={{color: WimitiColors.blue, textAlign: 'right'}}>
                    Remove comment
                  </Text>
                )}
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default CommentItem;
