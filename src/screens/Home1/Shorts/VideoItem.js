import React, {useState, useEffect, useRef} from 'react';
import {View, Dimensions, Text, StyleSheet, Image} from 'react-native';
import Video from 'react-native-video';
import {backendShortVideosUrl, backendUserImagesUrl} from '../../../Config';
import WimitiColors from '../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/Feather';

const {width, height} = Dimensions.get('window');

function VideoItem({videoObj}) {
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  useEffect(() => {
    return () => {
      setPaused(false);
    };
  }, []);

  return (
    <View style={{position: 'relative'}}>
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
        repeat={true}
        source={{
          uri: backendShortVideosUrl + videoObj.video,
        }}
        posterResizeMode="cover"
        volume={10}
        style={{
          width,
          height,
        }}
        resizeMode="cover"
      />

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {videoObj.owner.image.trim() !== '' &&
              videoObj.owner.image !== null ? (
                <View>
                  <Image
                    source={{uri: backendUserImagesUrl + videoObj.owner.image}}
                    style={{width: 50, height: 50, borderRadius: 100}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: WimitiColors.black,
                  }}>
                  <Icon name="user" size={30} color={WimitiColors.white} />
                </View>
              )}
              <View style={{flex: 1, marginLeft: 10}}>
                <Text style={styles.text}>
                  {videoObj.owner.fname + ' ' + videoObj.owner.lname}
                </Text>
                <Text style={styles.text}>@{videoObj.owner.username}</Text>
              </View>
            </View>
            {videoObj.caption?.trim() != '' && (
              <View style={{marginTop: 10}}>
                <Text style={{...styles.text, fontSize: 16}}>
                  {videoObj.caption}
                </Text>
              </View>
            )}
          </View>
          <View style={{width: 50, alignItems: 'center'}}>
            <View style={{marginVertical: 5}}>
              <Icon2
                name="ios-heart-outline"
                size={40}
                color={WimitiColors.white}
              />
              <Text style={{...styles.text, textAlign: 'center', fontSize: 20}}>
                {videoObj.likes}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Icon2
                name="ios-heart-dislike-outline"
                size={40}
                color={WimitiColors.white}
              />
              <Text style={{...styles.text, textAlign: 'center', fontSize: 20}}>
                {videoObj.dislikes}
              </Text>
            </View>
            <View style={{marginVertical: 5}}>
              <Icon3 name="comment" size={40} color={WimitiColors.white} />
              <Text style={{...styles.text, textAlign: 'center', fontSize: 20}}>
                {videoObj.comments}
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <Icon4 name="send" size={40} color={WimitiColors.white} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 50,
    padding: 10,
  },
  text: {color: WimitiColors.white, fontWeight: 'bold'},
});

export default VideoItem;
