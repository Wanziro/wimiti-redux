import React, {useEffect, useState} from 'react';
import {View, Image, Dimensions} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import {backendChattFilesUrl} from '../../../../../Config';
import VideoPlaceHolder from './VideoPlaceHolder';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import WimitiColors from '../../../../../WimitiColors';

const {width} = Dimensions.get('window');

function VideoThumbnail({file, messageId}) {
  const [isFetching, setIsFetching] = useState(true);
  const [thumbnail, setThumbnail] = useState('');
  useEffect(() => {
    let sub = true;
    if (sub) {
      createThumbnail({
        url: backendChattFilesUrl + file.uri,
        timeStamp: 10000,
        cacheName: 'video_thumbnail' + messageId,
      })
        .then(res => {
          if (sub) {
            setThumbnail(res.path);
            setIsFetching(false);
          }
        })
        .catch(err =>
          console.log(
            'an error occured while generating video thumbnail :' + err,
          ),
        );
    }
    return () => {
      sub = false;
    };
  }, []);
  return (
    <View>
      {isFetching ? (
        <VideoPlaceHolder />
      ) : (
        <View style={{position: 'relative'}}>
          <Image
            source={{uri: thumbnail}}
            style={{width: width - 100, height: undefined, aspectRatio: 1}}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              height: '100%',
              width: width - 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="play" size={80} color={WimitiColors.black} />
          </View>
        </View>
      )}
    </View>
  );
}

export default VideoThumbnail;
