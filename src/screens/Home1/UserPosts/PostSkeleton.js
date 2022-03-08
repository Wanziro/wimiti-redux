import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;

function PostSkeleton() {
  return (
    <View style={{marginHorizontal: 10, marginVertical: 15}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 40, width: 40, borderRadius: 50}}></View>
          </SkeletonPlaceholder>
        </View>
        <View>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 15, width: width - 70}}></View>
            <View style={{height: 15, width: width - 70, marginTop: 5}}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <SkeletonPlaceholder speed={900}>
        <View style={{height: 150, marginTop: 10}}></View>
      </SkeletonPlaceholder>
      <View
        style={{
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 20, width: 150}}></View>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 20, width: 60}}></View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
}

export default PostSkeleton;
