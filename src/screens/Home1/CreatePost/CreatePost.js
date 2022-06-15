import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import WimitiColors from '../../../WimitiColors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import SlidingUpPanel from 'rn-sliding-up-panel';
import SelectedImageItem from './SelectedImageItem';
import {backendUrl} from '../../../Config';
import Axios from 'axios';
import {createThumbnail} from 'react-native-create-thumbnail';
import VideoModal from './VideoModal/VideoModal';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts} from '../../../actions/posts';

const height = Dimensions.get('window').height;
const pannelHeight = height / 2 + 50;

const CreatePost = ({navigation}) => {
  const dispatch = useDispatch();
  const {username, id} = useSelector(state => state.currentUser);
  const [selecteImages, setSelecteImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoMainThumbnail, setVideoMainThumbnail] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [postContents, setPostContents] = useState('');
  const [isUploadingImages, setisUploadingImages] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [selectedVideoThumbnail, setselectedVideoThumbnail] = useState(null);

  const selectedFilePanelRef = useRef(null);
  const postContentsRef = useRef(null);

  const handleImageSelect = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      //   for (const res of results) {
      //     console.log(
      //       res.uri,
      //       res.type, // mime type
      //       res.name,
      //       res.size,
      //     );
      //   }
      // console.log('res is :' + JSON.stringify(results));
      setSelecteImages(results);
      selectedFilePanelRef.current.show();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleVideoSelect = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.video],
      });
      //   for (const res of results) {
      //     console.log(
      //       res.uri,
      //       res.type, // mime type
      //       res.name,
      //       res.size,
      //     );
      //   }
      // console.log('res is :' + JSON.stringify(results));
      console.log(results.uri);
      createThumbnail({
        url: results.uri,
        timeStamp: 10000,
      })
        .then(response => {
          console.log(response);
          setVideoMainThumbnail(response);
        })
        .catch(err => console.log({err}));
      setSelectedVideo(results);
      setShowVideoUploadModal(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const removeImage = uri => {
    let images = selecteImages;
    for (let i = 0; i < images.length; i++) {
      if (images[i].uri == uri) {
        images.splice(i, 1);
        setSelecteImages(images);
        break;
      }
    }
  };

  const uploadFile = image => {
    return new Promise((resolve, reject) => {
      var url = backendUrl + '/uploadImage';
      var photo = {
        uri: image.uri,
        type: image.type,
        name: image.name,
      };

      var formData = new FormData();
      formData.append('file', photo);
      formData.append('username', username);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // console.log('OPENED', xhr.status);

      xhr.onprogress = function () {
        console.log('LOADING', xhr.status);
      };

      xhr.onload = function () {
        // console.log('DONE', xhr.status);
        console.log(xhr.response);
        const response = JSON.parse(xhr.response);
        if (response.type == 'success') {
          const {fileName} = response;
          let updatedUploads = uploadedImages;
          let exists = false;
          for (let i = 0; i < updatedUploads.length; i++) {
            if (updatedUploads[i] == fileName) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            updatedUploads.push(fileName);
            setUploadedImages(updatedUploads);
          }
          resolve(response.type);
        } else {
          reject(response.type);
        }
      };
      // xhr.setRequestHeader('authorization', this.state.token);
      xhr.send(formData);
    });
  };

  const uploadVideo = video => {
    return new Promise((resolve, reject) => {
      var url = backendUrl + '/uploadImage';
      var photo = {
        uri: video.uri,
        type: video.type,
        name: video.name,
      };

      var formData = new FormData();
      formData.append('file', photo);
      formData.append('username', username);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      console.log('OPENED', xhr.status);

      xhr.onprogress = function () {
        console.log('LOADING', xhr.status);
      };

      xhr.onload = function () {
        // console.log('DONE', xhr.status);
        console.log(xhr.response);
        const response = JSON.parse(xhr.response);
        if (response.type == 'success') {
          const {fileName} = response;
          resolve(response);
        } else {
          reject(response.type);
        }
      };
      // xhr.setRequestHeader('authorization', this.state.token);
      xhr.send(formData);
    });
  };

  const handlePost = async () => {
    if (postContents.trim() != '' || selecteImages.length > 0) {
      setShowModal(true);
      //start uploading files
      if (selecteImages.length > 0) {
        setisUploadingImages(true);
        for (let i = 0; i < selecteImages.length; i++) {
          try {
            const upload = await uploadFile(selecteImages[i]);
          } catch (error) {
            console.log(error);
          }
        }
      }
      //save the post
      // console.log(uploadedImages.length);
      // console.log(selecteImages.length);
      const post = {
        textContents: postContents,
        images: uploadedImages,
        videos: [],
      };

      setisUploadingImages(false);
      setIsSaving(true);
      Axios.post(backendUrl + '/savePost', {
        post: JSON.stringify(post),
        username: username,
        userId: id,
      })
        .then(res => {
          console.log(res.data);
          setisUploadingImages(false);
          setIsSaving(false);
          if (res.data.type == 'success') {
            dispatch(fetchPosts());
            navigation.navigate('HomeTabs1', {screen: 'Home'});
          } else {
            setShowModal(false);
            Alert.alert(
              'Warning!',
              res.data.msg,
              [
                {
                  text: 'Ok',
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
          }
        })
        .catch(error => {
          setShowModal(false);
          console.log(error);
          Alert.alert(
            'Awq!',
            'Something went wrong.\n' + error.message,
            [
              {
                text: 'Ok',
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
        });
    } else {
      postContentsRef.current.focus();
    }
  };

  const handlePost2 = async () => {
    if (postContents.trim() != '' || selectedVideo != null) {
      setShowVideoUploadModal(false);
      setShowModal(true);
      //start uploading files
      if (selectedVideo != null) {
        setisUploadingImages(true);

        try {
          const upload = await uploadVideo(selectedVideo);

          let upload2;
          if (selectedVideoThumbnail != null || videoMainThumbnail != null) {
            if (selectedVideoThumbnail != null) {
              const file = {
                uri: selectedVideoThumbnail.path,
                type: selectedVideoThumbnail.mime,
                name: 'thumbnail.jpg',
              };
              upload2 = await uploadFile(file);
            } else {
              const file = {
                uri: videoMainThumbnail.path,
                type: videoMainThumbnail.mime,
                name: 'thumbnail.jpg',
              };
              upload2 = await uploadFile(file);
            }
          }

          //save the post
          if (upload.type == 'success') {
            const post = {
              textContents: postContents,
              images: [],
              video: upload.fileName,
              videoThumbnail:
                uploadedImages.length > 0
                  ? uploadedImages[0]
                  : upload2.fileName
                  ? upload2.fileName
                  : '',
              videoHeight:
                videoMainThumbnail != null
                  ? selectedVideoThumbnail != null
                    ? selectedVideoThumbnail.height
                    : videoMainThumbnail.height
                  : '',
            };

            setisUploadingImages(false);
            setIsSaving(true);
            Axios.post(backendUrl + '/savePost', {
              post: JSON.stringify(post),
              username: username,
              userId: id,
            })
              .then(res => {
                console.log(res.data);
                setisUploadingImages(false);
                setIsSaving(false);
                if (res.data.type == 'success') {
                  navigation.navigate('HomeTabs1', {screen: 'Home'});
                } else {
                  setShowModal(false);
                  Alert.alert(
                    'Warning!',
                    res.data.msg,
                    [
                      {
                        text: 'Ok',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: true},
                  );
                }
              })
              .catch(error => {
                setShowModal(false);
                console.log(error);
                Alert.alert(
                  'Awq!',
                  'Something went wrong.\n' + error.message,
                  [
                    {
                      text: 'Ok',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: true},
                );
              });
          } else {
            setShowModal(false);
            Alert.alert(
              'Awq!',
              'Failed to upload all you files. try again later after sometime.',
              [
                {
                  text: 'Ok',
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
          } //failed to upload
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      postContentsRef.current.focus();
    }
  };

  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon3 name="arrow-back" size={30} color={WimitiColors.black} />
              </TouchableWithoutFeedback>
              <Text
                style={{
                  color: WimitiColors.black,
                  fontSize: 18,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Create new post
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => handlePost()}>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  backgroundColor: WimitiColors.blue,
                  borderRadius: 5,
                }}>
                <Text style={{color: WimitiColors.white}}>Post</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAwareScrollView extraHeight={50}>
          <View style={{padding: 10, marginTop: 10}}>
            <TextInput
              placeholder="What's on your mind?"
              style={{
                maxHeight: height / 2,
              }}
              multiline={true}
              value={postContents}
              onChangeText={text => setPostContents(text)}
              ref={postContentsRef}
            />
          </View>
        </KeyboardAwareScrollView>

        <View style={{paddingVertical: 10}}>
          {selecteImages.length > 0 && (
            <TouchableWithoutFeedback
              onPress={() => selectedFilePanelRef.current.show()}>
              <View
                style={{
                  backgroundColor: WimitiColors.blue,
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{color: WimitiColors.white}}>
                  Selected {selecteImages.length} Images
                </Text>
                <Icon2
                  size={30}
                  name="expand-less"
                  color={WimitiColors.white}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => handleImageSelect()}>
              <Icon name="image" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleVideoSelect()}>
              <Icon name="video" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        {/* file panels */}
        <SlidingUpPanel
          ref={selectedFilePanelRef}
          friction={0.5}
          allowMomentum={true}
          draggableRange={{bottom: 0, top: pannelHeight}}
          height={height}>
          <View
            style={{
              flex: 1,
              backgroundColor: WimitiColors.white,
              padding: 10,
              borderTopEndRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <View>
              {selecteImages.length != 0 && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: WimitiColors.black, fontSize: 18}}>
                    Selected {selecteImages.length} images
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() => selectedFilePanelRef.current.hide()}>
                    <View style={{paddingLeft: 10}}>
                      <Icon2
                        name="expand-more"
                        size={30}
                        color={WimitiColors.black}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}
            </View>
            {selecteImages.length > 0 && (
              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    {selecteImages.map((image, index) => (
                      <SelectedImageItem
                        key={index}
                        image={image}
                        removeImage={removeImage}
                      />
                    ))}
                  </View>
                </ScrollView>
                <View style={{marginTop: 50, paddingHorizontal: 10}}>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: WimitiColors.blue,
                        padding: 15,
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <Text style={{color: WimitiColors.white}}>
                        Remove all images
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </SlidingUpPanel>

        {/* modal */}
        <Modal visible={showModal}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={50} color={WimitiColors.gray} />
            <View style={{marginTop: 10}}>
              {isUploadingImages && <Text>Uploading files...</Text>}
              {isSaving && <Text>Saving your post...</Text>}
            </View>
          </View>
        </Modal>

        <Modal visible={showVideoUploadModal}>
          <VideoModal
            selectedVideo={selectedVideo}
            videoMainThumbnail={videoMainThumbnail}
            setShowVideoUploadModal={setShowVideoUploadModal}
            selectedVideoThumbnail={selectedVideoThumbnail}
            setselectedVideoThumbnail={setselectedVideoThumbnail}
            postContents={postContents}
            setPostContents={setPostContents}
            handlePost2={handlePost2}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;
