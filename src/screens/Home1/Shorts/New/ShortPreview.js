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

  const handleUploadVideo = () => {
    setShowModal(true);
    setIsavingShort(false);
    uploadShort(videoFile, username)
      .then(response => {
        console.log(response);
        setIsavingShort(true);
        const {fileName} = response;
        const date = new Date();

        Axios.post(backendUrl + '/saveShort', {
          video: fileName,
          width: videoFile.width,
          height: videoFile.height,
          username,
          userId: id,
          caption,
          date: date,
        })
          .then(res => {
            if (res.data.type == 'success') {
              dispatch(fetchShorts());
              dispatch(setCurrentViewingIndex(0));
              navigation.navigate('Shorts');
            } else {
              setShowModal(false);
              alert(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
            setShowModal(false);
            try {
              alert(err.msg);
            } catch (e) {
              alert(err.message);
            }
          });
      })
      .catch(error => {
        setShowModal(false);
        try {
          alert(error.msg);
        } catch (err) {
          alert(error.message);
        }
      });
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
