import React from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import WimitiColors from '../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

function UploadModal({navigation, isSavingShort}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
      }}>
      <View style={{alignItems: 'flex-end', padding: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Shorts')}>
          <Icon name="close" size={40} color={WimitiColors.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '90%',
        }}>
        <ActivityIndicator
          color={WimitiColors.white}
          size={50}
          style={{marginBottom: 10}}
        />
        {isSavingShort ? (
          <Text style={{color: WimitiColors.white}}>Saving your video</Text>
        ) : (
          <Text style={{color: WimitiColors.white}}>Uploading your video</Text>
        )}
        <Text style={{color: WimitiColors.white}}>Please wait...</Text>
      </View>
    </View>
  );
}

export default UploadModal;
