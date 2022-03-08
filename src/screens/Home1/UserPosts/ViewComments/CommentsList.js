import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {UserMainContext} from '../../../Context/UserContext';

import CommentItem from './CommentItem';

function CommentsList({comments}) {
  const context = useContext(UserMainContext);
  return (
    <View>
      {comments.length > 0 ? (
        <>
          {comments.map(comment => (
            <CommentItem comment={comment} key={comment.id} />
          ))}
        </>
      ) : (
        <Text>Be the first one to comment on this post.</Text>
      )}
    </View>
  );
}

export default CommentsList;
