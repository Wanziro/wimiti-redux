import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const {width, height} = Dimensions.get('window');

function ShortPlaceholder() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 50,
        padding: 15,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <SkeletonPlaceholder>
              <View style={{height: 50, width: 50, borderRadius: 50}}></View>
            </SkeletonPlaceholder>
          </View>
          <View style={{marginLeft: 10}}>
            <SkeletonPlaceholder>
              <View style={{height: 15, width: width - 160}}></View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View
                style={{height: 15, width: width - 160, marginTop: 10}}></View>
            </SkeletonPlaceholder>
          </View>
        </View>
        <View>
          <SkeletonPlaceholder>
            <View style={{height: 15, width: width - 90, marginTop: 10}}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{marginVertical: 20}}>
          <SkeletonPlaceholder>
            <View style={{height: 30, width: 40}}></View>
          </SkeletonPlaceholder>
        </View>
        <View style={{marginVertical: 20}}>
          <SkeletonPlaceholder>
            <View style={{height: 30, width: 40}}></View>
          </SkeletonPlaceholder>
        </View>
        <View style={{marginVertical: 20}}>
          <SkeletonPlaceholder>
            <View style={{height: 30, width: 40}}></View>
          </SkeletonPlaceholder>
        </View>
        <View style={{marginVertical: 20}}>
          <SkeletonPlaceholder>
            <View style={{height: 30, width: 40}}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
}

export default ShortPlaceholder;
