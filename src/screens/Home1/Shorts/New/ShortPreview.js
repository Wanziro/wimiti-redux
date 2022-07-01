import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import Video from 'react-native-video';
import WimitiColors from '../../../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UploadModal from './UploadModal';
import {uploadShort} from '../../../../helpers/fileUploads';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {backendUrl} from '../../../../Config';
import {fetchShorts, setCurrentViewingIndex} from '../../../../actions/shorts';
import RNFS from 'react-native-fs';
import {RNFFmpeg} from 'react-native-ffmpeg';
const {width, height} = Dimensions.get('window');

function ShortPreview({route, navigation}) {
  const dispatch = useDispatch();
  const {videoFile} = route.params;
  const {username, id} = useSelector(state => state.currentUser);
  const [loadingThumbnail, setLoadingThumbnail] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSavingShort, setIsavingShort] = useState(false);
  const [caption, setCaption] = useState('');

  const videoRef = useRef(null);

  function processVideo(videoUrl, callback) {
    const finalVideo = `${RNFS.CachesDirectoryPath}/audioVideoFinal.mp4`;

    cacheResourcePath(videoUrl).then(rVideoUrl => {
      const str_cmd = `-y -i ${rVideoUrl} -c:v -i ${videoFile.uri} -c:v mp4  ${finalVideo}`;

      RNFFmpeg.execute(str_cmd).then(result => {
        if (result === 0) {
          RNFS.unlink(rVideoUrl);

          callback({
            videoPath:
              Platform.OS === 'android' ? 'file://' + finalVideo : finalVideo,
          });
        }
      });
    });
  }

  async function cacheResourcePath(sourcePath) {
    const uriComponents = sourcePath.split('/');
    console.log('uri components');
    console.log(uriComponents);
    const fileNameAndExtension = uriComponents[uriComponents.length - 1];

    const destPath = `${RNFS.CachesDirectoryPath}/${fileNameAndExtension}`;

    await RNFS.copyFile(sourcePath, destPath);
    console.log('destination path:');
    console.log(destPath);
    return destPath;
  }

  const handleUploadVideo = async () => {
    setShowModal(true);
    setIsavingShort(false);
    // RNFFmpeg.execute(`-i ${videoFile.uri} -c:v mpeg4 resultimage.\mp4`).then(
    //   res => {
    //     console.log('compression results');
    //     console.log(JSON.parse(res));
    //   },
    // );

    processVideo(videoFile.uri, data => {
      console.log('data here!');
      console.log(data);
    });

    // const newUri = await RNVideoHelper.compress(sourceUri, {
    //   startTime: 10, // optional, in seconds, defaults to 0
    //   endTime: 100, //  optional, in seconds, defaults to video duration
    //   quality: 'low', // default low, can be medium or high
    //   defaultOrientation: 0, // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
    // })
    //   .progress(value => {
    //     console.warn('progress', value); // Int with progress value from 0 to 1
    //   })
    //   .then(compressedUri => {
    //     console.warn('compressedUri', compressedUri); // String with path to temporary compressed video
    //   });

    // uploadShort(videoFile, username)
    //   .then(response => {
    //     console.log(response);
    //     setIsavingShort(true);
    //     const {fileName} = response;
    //     const date = new Date();

    //     Axios.post(backendUrl + '/saveShort', {
    //       video: fileName,
    //       width: videoFile.width,
    //       height: videoFile.height,
    //       username,
    //       userId: id,
    //       caption,
    //       date: date,
    //     })
    //       .then(res => {
    //         console.log(res.data);
    //         if (res.data.type == 'success') {
    //           dispatch(fetchShorts());
    //           dispatch(setCurrentViewingIndex(0));
    //           navigation.navigate('Shorts');
    //         } else {
    //           setShowModal(false);
    //           alert(res.data.msg);
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         setShowModal(false);
    //         try {
    //           alert(err.msg);
    //         } catch (e) {
    //           alert(err.message);
    //         }
    //       });
    //   })
    //   .catch(error => {
    //     setShowModal(false);
    //     try {
    //       alert(error.msg);
    //     } catch (err) {
    //       alert(error.message);
    //     }
    //   });
  };

  useEffect(() => {
    let sub = true;
    if (sub) {
      createThumbnail({
        url: videoFile.uri,
        timeStamp: 10000,
      })
        .then(res => {
          if (sub) {
            setThumbnail(res.path);
            setLoadingThumbnail(false);
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
      setPaused(true);
    };
  }, []);
  return (
    <KeyboardAwareScrollView extraHeight={50}>
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
        {loadingThumbnail ? (
          <View
            style={{height, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={WimitiColors.white} size={50} />
          </View>
        ) : (
          <View
            style={{
              position: 'relative',
              height,
            }}>
            <Pressable onPress={() => setPaused(!paused)}>
              <View style={{position: 'relative'}}>
                <Video
                  onEnd={() => {
                    setPaused(true);
                    setCurrentTime(0);
                  }}
                  repeat={true}
                  paused={paused}
                  currentTime={currentTime}
                  ref={videoRef}
                  source={{
                    uri: videoFile.uri,
                  }}
                  poster={thumbnail}
                  posterResizeMode="cover"
                  volume={10}
                  style={{
                    width,
                    height: videoFile.height,
                  }}
                  resizeMode="cover"
                />
                {paused && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width,
                      height,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon name="play" size={50} color={WimitiColors.white} />
                    </View>
                  </View>
                )}
              </View>
            </Pressable>
            <View
              style={{
                width,
                position: 'absolute',
                bottom: 10,
                left: 0,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 10,
              }}>
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: 10,
                  color: WimitiColors.white,
                  borderRadius: 10,
                  maxHeight: 200,
                  minHeight: 50,
                }}
                multiline={true}
                maxLength={70}
                placeholderTextColor={WimitiColors.gray}
                placeholder="Add caption (optional)"
                value={caption}
                onChangeText={text => setCaption(text)}
              />
              <View style={{marginLeft: 10, width: 90}}>
                <Pressable onPress={() => handleUploadVideo()}>
                  <View
                    style={{
                      height: 50,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: WimitiColors.blue,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: WimitiColors.white,
                      }}>
                      Upload
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
      <Modal transparent={true} visible={showModal}>
        <UploadModal navigation={navigation} isSavingShort={isSavingShort} />
      </Modal>
    </KeyboardAwareScrollView>
  );
}

export default ShortPreview;
