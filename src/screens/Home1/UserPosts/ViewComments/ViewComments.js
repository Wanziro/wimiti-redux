import React, {useEffect, useState, useRef, context, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import WimitiColors from '../../../../WimitiColors';
import Skeleton from './Skeleton';
import Axios from 'axios';
import {backendUrl} from '../../../../Config';
import CommentsList from './CommentsList';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;

const ViewComments = ({hideCommentsPanel, commentsPostId}) => {
  const {username, id} = useSelector(state => state.currentUser);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isSavingComment, setisSavingComment] = useState(false);
  const [comment, setComment] = useState('');
  const [savedComment, setSavedComment] = useState(false);

  const scrollViewRef = useRef();

  const onRefresh = () => {
    setRefreshing(false);
    Axios.post(backendUrl + '/getPostComments', {postId: commentsPostId})
      .then(res => {
        setIsLoadingComments(false);
        setComments(res.data);
      })
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 2000);
  }, []);

  useEffect(() => {
    let sub = true;
    if (sub) {
      fetchComments();
    }
    return () => {
      sub = false;
    };
  }, []);

  const fetchComments = () => {
    Axios.post(backendUrl + '/getPostComments', {postId: commentsPostId})
      .then(res => {
        setIsLoadingComments(false);
        setComments(res.data);
        if (savedComment) {
          scrollViewRef.current.scrollToEnd({animated: true});
          setSavedComment(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleComment = () => {
    if (comment.trim() != '') {
      setisSavingComment(true);
      Axios.post(backendUrl + '/saveComment', {
        postId: commentsPostId,
        username: username,
        userId: id,
        comment,
      })
        .then(res => {
          console.log(res.data);
          setComment('');
          setisSavingComment(false);
          setSavedComment(true);
          fetchComments();
        })
        .catch(error => {
          // alert(error);
          console.log(error);
          setisSavingComment(false);
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: WimitiColors.white,
        position: 'relative',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 10,
          borderBottomColor: WimitiColors.dark,
          borderBottomWidth: 1,
        }}>
        <View>
          <Text style={{color: WimitiColors.black, fontSize: 20}}>
            View comments
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => hideCommentsPanel()}>
          <View>
            <Icon name="close" color={WimitiColors.black} size={30} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{padding: 10}}>
        {isLoadingComments ? (
          <View>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </View>
        ) : (
          <View style={{height: '100%', paddingBottom: 100}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ref={scrollViewRef}>
              <CommentsList comments={comments} />
            </ScrollView>
          </View>
        )}
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width,
          padding: 10,
          backgroundColor: WimitiColors.white,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {isSavingComment ? (
            <View
              style={{
                borderColor: WimitiColors.black,
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 50,
                width: '85%',
              }}>
              <Text>{comment}</Text>
            </View>
          ) : (
            <TextInput
              placeholder="Say something..."
              style={{
                borderColor: WimitiColors.black,
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 50,
                width: '85%',
                maxHeight: 70,
              }}
              value={comment}
              onChangeText={text => setComment(text)}
              multiline={true}
            />
          )}
          <>
            {isSavingComment ? (
              <ActivityIndicator size={30} color={WimitiColors.black} />
            ) : (
              <TouchableWithoutFeedback onPress={() => handleComment()}>
                <View>
                  <Icon name="send" color={WimitiColors.black} size={30} />
                </View>
              </TouchableWithoutFeedback>
            )}
          </>
        </View>
      </View>
    </View>
  );
};

export default ViewComments;
