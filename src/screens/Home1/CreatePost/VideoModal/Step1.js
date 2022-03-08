import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import WimitiColors from '../../../../WimitiColors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function Step1({
  selectedVideo,
  videoMainThumbnail,
  playedVideo,
  setPlayedVideo,
  setShowVideoUploadModal,
  setCurrentStep,
}) {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [forwardOverlayVisible, setForwardOverlayVisible] = useState(false);
  const [backwardOverlayVisible, setBackwardOverlayVisible] = useState(false);

  const videoRef = useRef();

  let forwardOverlayTimer = null;
  let backwardOverlayTimer = null;

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const forward = () => {
    setForwardOverlayVisible(true);
    const seek = currentTime + 5;
    videoRef.current.seek(seek);
    setCurrentTime(seek);
    clearTimeout(forwardOverlayTimer);
    forwardOverlayTimer = setTimeout(() => {
      setForwardOverlayVisible(false);
    }, 300);
  };

  const backward = () => {
    setBackwardOverlayVisible(true);
    const seek = currentTime - 5;
    videoRef.current.seek(seek);
    setCurrentTime(seek);
    clearTimeout(backwardOverlayTimer);
    forwardOverlayTimer = setTimeout(() => {
      setBackwardOverlayVisible(false);
    }, 300);
  };

  return (
    <>
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableWithoutFeedback
          onPress={() => setShowVideoUploadModal(false)}>
          <View style={{paddingRight: 10}}>
            <Icon name="close" size={30} color={WimitiColors.black} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={{color: WimitiColors.black}}>1/3</Text>
        <TouchableWithoutFeedback onPress={() => setCurrentStep(2)}>
          <View>
            <Text style={{color: WimitiColors.blue, fontSize: 18}}>Next</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {playedVideo && videoMainThumbnail != null ? (
        <View style={{position: 'relative'}}>
          <Video
            style={{
              width,
              height:
                videoMainThumbnail != null
                  ? videoMainThumbnail.height > height - 50
                    ? height - 50
                    : videoMainThumbnail.height
                  : 300,
              backgroundColor: WimitiColors.black,
            }}
            poster={videoMainThumbnail != null ? videoMainThumbnail.path : ''}
            resizeMode={
              videoMainThumbnail != null
                ? videoMainThumbnail.height > height - 50
                  ? 'contain'
                  : 'cover'
                : 'contain'
            }
            //  onEnd={onEnd}
            //  onLoad={onLoad}
            //  onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={videoRef}
            source={{
              uri: selectedVideo.uri,
            }}
            volume={10}
            repeat={true}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              height: '100%',
              width,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: width / 3 - 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback onPress={() => backward()}>
                <View
                  style={{
                    height: '100%',
                    width: width / 3 - 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {backwardOverlayVisible && (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        padding: 10,
                        borderRadius: 100,
                      }}>
                      <Icon
                        name="play-back"
                        size={15}
                        color={WimitiColors.white}
                      />
                      <Text style={{color: WimitiColors.white}}>5 sec</Text>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
              <View
                style={{
                  height: '100%',
                  width: width / 3,
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
            <TouchableWithoutFeedback onPress={() => forward()}>
              <View
                style={{
                  height: '100%',
                  width: width / 3 - 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {forwardOverlayVisible && (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: 10,
                      borderRadius: 100,
                    }}>
                    <Icon
                      name="play-forward"
                      size={15}
                      color={WimitiColors.white}
                    />
                    <Text style={{color: WimitiColors.white}}>5 sec</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      ) : (
        <>
          {videoMainThumbnail != null && (
            <View
              style={{
                height:
                  videoMainThumbnail.height > height - 50
                    ? height - 50
                    : videoMainThumbnail.height,
                position: 'relative',
              }}>
              <Image
                source={{uri: videoMainThumbnail.path}}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  height:
                    videoMainThumbnail.height > height - 50
                      ? height - 50
                      : videoMainThumbnail.height,
                  width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setPlayedVideo(true);
                    setPaused(false);
                  }}>
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
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
}

export default Step1;
