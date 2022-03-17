import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, Dimensions, Pressable} from 'react-native';
import Video from 'react-native-video';
import WimitiColors from '../../../../../WimitiColors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function VideoPreview({selectedFile}) {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  useEffect(() => {
    return () => {
      setPaused(true);
    };
  }, []);
  return (
    <View style={{position: 'relative'}}>
      <Pressable onPress={() => setPaused(!paused)}>
        <Video
          onEnd={() => {
            setPaused(true);
            setCurrentTime(0);
          }}
          // onLoad={onLoad}
          // onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          currentTime={currentTime}
          ref={videoRef}
          source={{
            uri: selectedFile.uri,
          }}
          posterResizeMode="cover"
          volume={10}
          style={{
            width,
            height: undefined,
            aspectRatio: 1,
          }}
          resizeMode="cover"
        />
      </Pressable>
      <View style={{position: 'absolute', top: 0, width}}>
        <View
          style={{
            position: 'relative',
          }}>
          {paused && (
            <Pressable onPress={() => setPaused(!paused)}>
              <Image
                source={{uri: selectedFile.uri}}
                style={{width: '100%', height: undefined, aspectRatio: 1}}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  width,
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    height: 100,
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}>
                  <Icon name="play" size={40} color={WimitiColors.white} />
                </View>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

export default VideoPreview;
