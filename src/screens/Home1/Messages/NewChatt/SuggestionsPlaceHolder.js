import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;

function SuggestionsPlaceHolder() {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <SkeletonPlaceholder>
            <View style={{height: 50, width: 50, borderRadius: 100}}></View>
          </SkeletonPlaceholder>
        </View>
        <View>
          <SkeletonPlaceholder>
            <View style={{height: 45, width: width - 80}}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
}

export default SuggestionsPlaceHolder;
