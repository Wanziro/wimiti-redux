import React from 'react';
import {View, Text, StatusBar, Image, Dimensions} from 'react-native';
import {backendChattFilesUrl} from '../../../../Config';
import WimitiColors from '../../../../WimitiColors';

const {width} = Dimensions.get('window');

function ChattFilePreview({route, navigation}) {
  let file = '';
  const {message} = route.params;
  if (message.file !== '') {
    try {
      file = JSON.parse(message.file);
    } catch (error) {
      file = message.file;
    }
  }
  return (
    <>
      <StatusBar
        backgroundColor={WimitiColors.black}
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: WimitiColors.black,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          {file !== '' && (
            <>
              {file.type.split('/')[0] == 'image' && (
                <View>
                  <Image
                    source={{uri: backendChattFilesUrl + file.uri}}
                    style={{width, height: undefined, aspectRatio: 1}}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
}

export default ChattFilePreview;
