import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import PostItem from './PostItem';
import {backendUrl} from '../../../Config';
import Axios from 'axios';
import PostSkeleton from './PostSkeleton';
import db from '../../../controller/db';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts, setIsloadingPosts, setPosts} from '../../../actions/posts';

function UserPosts({
  navigation,
  refreshing,
  showCommentsPanel,
  setCommentsPostId,
}) {
  const dispatch = useDispatch();
  const postObj = useSelector(state => state.posts);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (refreshing) {
        Axios.get(backendUrl + '/getAllPosts')
          .then(res => {
            dispatch(setPosts(res.data));
            dispatch(setIsloadingPosts(false));
          })
          .catch(error => {
            alert(error.message);
          });
      }
    }
    return () => (sub = false);
  }, [refreshing]);

  useEffect(() => {
    let sub = true;
    if (sub) {
      dispatch(fetchPosts());
    }
    return () => {
      sub = false;
    };
  }, []);

  return (
    <View style={{paddingBottom: 50}}>
      {postObj.isLoadingPosts ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        <>
          {postObj.posts.map(post => (
            <PostItem
              post={post}
              key={post.id}
              navigation={navigation}
              showCommentsPanel={showCommentsPanel}
              setCommentsPostId={setCommentsPostId}
            />
          ))}
        </>
      )}
    </View>
  );
}

export default UserPosts;
