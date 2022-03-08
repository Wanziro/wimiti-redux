import React from 'react';
import {Text, View} from 'react-native';
import PostItem from './PostItem';

const posts = [
  {
    id: 1,
    owner: {
      name: 'Barack mbabazi ',
      image: 'person1',
    },
    commonFriends: [
      {
        name: 'Emile',
        image: 'person2',
      },
      {
        name: 'James',
        image: 'person3',
      },
      {
        name: 'Anitha',
        image: 'person2',
      },
    ],
    comments: 20,
    image: 'image1',
  },
  {
    id: 2,
    owner: {
      name: 'Akingeneye Jeanette',
      image: 'person2',
    },
    commonFriends: [
      {
        name: 'Emile',
        image: 'person1',
      },
      {
        name: 'James',
        image: 'person4',
      },
      {
        name: 'Anitha',
        image: 'person3',
      },
      {
        name: 'Anitha',
        image: 'person2',
      },
      {
        name: 'Anitha pendo',
        image: 'person5',
      },
    ],
    comments: 20,
    image: 'image2',
  },
  {
    id: 3,
    owner: {
      name: 'Kwihangana Eric ',
      image: 'person1',
    },
    commonFriends: [
      {
        name: 'Emile',
        image: 'person1',
      },
      {
        name: 'James',
        image: 'person4',
      },
      {
        name: 'Anitha',
        image: 'person1',
      },
    ],
    comments: 20,
    image: 'image3',
  },
  {
    id: 4,
    owner: {
      name: 'Abayo Ange',
      image: 'person5',
    },
    commonFriends: [
      {
        name: 'Emile',
        image: 'person1',
      },
      {
        name: 'Anitha',
        image: 'person3',
      },
    ],
    comments: 20,
    image: 'image7',
  },
  {
    id: 5,
    owner: {
      name: 'Abayo Ange',
      image: 'person5',
    },
    commonFriends: [
      {
        name: 'Emile',
        image: 'person1',
      },
      {
        name: 'Anitha',
        image: 'person3',
      },
    ],
    comments: 20,
    image: 'image7',
  },
];

function Posts() {
  return (
    <View>
      {posts.map(post => (
        <PostItem post={post} key={post.id} />
      ))}
    </View>
  );
}

export default Posts;
