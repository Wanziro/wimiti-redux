import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import WimitiColors from '../../WimitiColors';

function PostItem({post}) {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <Image
          source={getImage2(post.owner.image)}
          style={{width: 60, height: 60, borderRadius: 100}}
        />
        <View style={{width: '70%'}}>
          <Text style={{color: WimitiColors.black, fontWeight: 'bold'}}>
            {post.owner.name}
          </Text>
          <Text>{post.commonFriends.length} Mutual Friends</Text>
        </View>
        <View>
          <Icon name="close" size={30} />
        </View>
      </View>
      <Image
        source={getImage(post.image)}
        style={{width: '100%', height: 300}}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={getImage2(
              post.commonFriends[post.commonFriends.length - 1].image,
            )}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderColor: WimitiColors.white,
              borderWidth: 3,
            }}
          />
          <View style={{position: 'absolute', top: 0, left: 40}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={getImage2(
                  post.commonFriends[post.commonFriends.length - 2].image,
                )}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderColor: WimitiColors.white,
                  borderWidth: 3,
                }}
              />
              <Text
                style={{
                  color: WimitiColors.black,
                  fontSize: 25,
                  paddingLeft: 10,
                }}>
                {post.commonFriends.length}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{color: WimitiColors.black}}>
            {post.commonFriends.length} comments
          </Text>
        </View>
      </View>
    </View>
  );
}

PostItem.propTypes = {
  post: PropTypes.object,
};

export default PostItem;
