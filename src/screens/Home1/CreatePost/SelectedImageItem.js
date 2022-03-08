import React from 'react';
import {Dimensions, Image, View, TouchableOpacity} from 'react-native';
import WimitiColors from '../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const width = Dimensions.get('window').width;

function SelectedImageItem({image, removeImage}) {
  return (
    <View style={{marginHorizontal: 10}}>
      <View style={{position: 'relative'}}>
        <Image
          source={{uri: image.uri}}
          style={{width: width - 200, height: 200, borderRadius: 10}}
        />
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -10,
          }}>
          <TouchableOpacity onPress={() => removeImage(image.uri)}>
            <View
              style={{
                backgroundColor: WimitiColors.blue,
                padding: 5,
                borderRadius: 50,
              }}>
              <Icon name="close" size={30} color={WimitiColors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SelectedImageItem;
