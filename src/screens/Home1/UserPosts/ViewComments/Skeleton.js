import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;

function Skeleton() {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <SkeletonPlaceholder>
          <View style={{height: 40, width: 40, borderRadius: 50}}></View>
        </SkeletonPlaceholder>
        <View style={{width: width - 70}}>
          <SkeletonPlaceholder>
            <View style={{height: 15}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{height: 15, width: '60%', marginTop: 5}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{height: 15, marginTop: 10}}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
}

export default Skeleton;
