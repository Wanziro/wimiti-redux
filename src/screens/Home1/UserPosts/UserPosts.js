import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import PostItem from './PostItem';
import {backendUrl} from '../../../Config';
import Axios from 'axios';
import PostSkeleton from './PostSkeleton';
import {UserMainContext} from '../../Context/UserContext';
import db from '../../../controller/db';

function UserPosts({
  navigation,
  refreshing,
  showCommentsPanel,
  setCommentsPostId,
}) {
  const context = useContext(UserMainContext);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const createUserLikesTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'userLikes ' +
          '(id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL UNIQUE,processed INTEGER DEFAULT 0);',
      );
    });
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (refreshing) {
        Axios.get(backendUrl + '/getAllPosts')
          .then(res => {
            setPosts(res.data);
            setIsLoadingPosts(false);
          })
          .catch(error => {
            alert(error);
          });
      }
    }
    return () => (sub = false);
  }, [refreshing]);

  useEffect(() => {
    let sub = true;

    Axios.get(backendUrl + '/getAllPosts')
      .then(res => {
        if (sub) {
          setPosts(res.data);
          setIsLoadingPosts(false);
        }
      })
      .catch(error => {
        console.log(error);
      });

    return () => {
      sub = false;
    };
  });

  useEffect(() => {
    createUserLikesTable();
  }, []);

  return (
    <View style={{paddingBottom: 50}}>
      {isLoadingPosts ? (
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
          {posts.map(post => (
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
