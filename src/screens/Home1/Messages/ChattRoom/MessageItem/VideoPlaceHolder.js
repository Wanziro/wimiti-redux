import React from 'react';
import {View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import WimitiColors from '../../../../../WimitiColors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('window');

function VideoPlaceHolder() {
  return (
    <View style={{position: 'relative'}}>
      <SkeletonPlaceholder>
        <View style={{height: 200, width: width - 80}}></View>
      </SkeletonPlaceholder>
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 200,
          width: width - 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="play" size={60} color={WimitiColors.lightGray} />
      </View>
    </View>
  );
}

export default VideoPlaceHolder;
