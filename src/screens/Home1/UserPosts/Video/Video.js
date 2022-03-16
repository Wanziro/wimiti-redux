import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Videwo from 'react-native-video';
import {backendPostFilesUrl} from '../../../../Config';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import Icon from 'react-native-vector-icons/dist/Ionicons';
import WimitiColors from '../../../../WimitiColors';
import {useSelector, useDispatch} from 'react-redux';
import {setPlayingVideo} from '../../../../actions/playingVideo';

function Video({postContent}) {
  const dispatch = useDispatch();
  const videoBeingPlayed = useSelector(state => state.playingVideo);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef();

  const onProgress = data => {
    if (videoBeingPlayed.video != postContent.video) {
      setPaused(true);
    }
    setCurrentTime(data.currentTime);
    setIsLoading(false);
  };
  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoad = () => {
    setIsLoading(true);
  };

  return (
    <View style={{marginTop: 10, position: 'relative'}}>
      {isPlayed ? (
        <View style={{position: 'relative'}}>
          <Videwo
            //  onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={videoRef}
            source={{
              uri: backendPostFilesUrl + postContent.video,
            }}
            poster={backendPostFilesUrl + postContent.videoThumbnail}
            posterResizeMode="cover"
            volume={10}
            repeat={true}
            style={{
              width,
              height: postContent.videoHeight
                ? postContent.videoHeight > height - 300
                  ? height - 300
                  : postContent.videoHeight
                : height - 300,
              // height: undefined,
              // aspectRatio: 1,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              width,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {!paused && isLoading && (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: 15,
                  borderRadius: 100,
                }}>
                <ActivityIndicator color={WimitiColors.white} size={50} />
              </View>
            )}
          </View>
        </View>
      ) : (
        <Image
          source={{uri: backendPostFilesUrl + postContent.videoThumbnail}}
          style={{
            width,
            height: postContent.videoHeight
              ? postContent.videoHeight > height - 300
                ? height - 300
                : postContent.videoHeight
              : height - 300,
          }}
        />
      )}
      <View
        style={{
          position: 'absolute',
          width,
          height: '100%',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch(setPlayingVideo(postContent.video));
            setIsPlayed(true);
            setPaused(!paused);
          }}>
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {paused && (
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: 100,
                }}>
                <Icon name="play" color={WimitiColors.white} size={40} />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default Video;
