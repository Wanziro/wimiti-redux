import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {backendUrl, backendUserImagesUrl} from '../../Config';
import WimitiColors from '../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentUserImage} from '../../actions/currentUser';

function Profile({navigation}) {
  const dispatch = useDispatch();
  const {image, username, id, fname, lname, phone, email, description, work} =
    useSelector(state => state.currentUser);

  const [isSavingImage, setIsSavingImage] = useState(false);

  const updateDetails = async userImage => {
    try {
      dispatch(setCurrentUserImage(userImage));
    } catch (error) {
      console.log('Error occured while updating user image: ' + error);
    }
  };

  const saveImage = async image => {
    const upload = await uploadFile(image);
    Axios.post(backendUrl + '/saveProfileImage', {
      username: username,
      image: upload.fileName,
      userId: id,
    })
      .then(res => {
        setIsSavingImage(false);
        if (res.data.type == 'success') {
          updateDetails(upload.fileName);
        } else {
          alert(res.data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        setIsSavingImage(false);
      });

    setIsSavingImage(false);
  };

  const handleImageSelect = () => {
    if (!isSavingImage) {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      })
        .then(image => {
          setIsSavingImage(true);
          const img = {
            uri: image.path,
            type: image.mime,
            name: 'profile_image.jpg',
          };
          saveImage(img);
        })
        .catch(error => {
          console.log(error);
          setIsSavingImage(false);
        });
    }
  };

  const uploadFile = image => {
    return new Promise((resolve, reject) => {
      var url = backendUrl + '/uploadProfileImage';
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
      xhr.onprogress = function () {
        console.log('LOADING', xhr.status);
      };

      xhr.onload = function () {
        console.log(xhr.response);
        const response = JSON.parse(xhr.response);
        if (response.type == 'success') {
          resolve(response);
        } else {
          reject(response.type);
        }
      };
      // xhr.setRequestHeader('authorization', this.state.token);
      xhr.send(formData);
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: WimitiColors.white}}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <View>
              {image != '' && image != null ? (
                <View>
                  <Image
                    source={{uri: backendUserImagesUrl + image}}
                    style={{width: 100, height: 100, borderRadius: 100}}
                  />
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: WimitiColors.black,
                    borderRadius: 100,
                    padding: 10,
                  }}>
                  <Icon name="user" size={70} color="white" />
                </View>
              )}
            </View>
            <View>
              <Text
                style={{
                  color: WimitiColors.black,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                0
              </Text>
              <Text
                style={{
                  color: WimitiColors.black,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Posts
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: WimitiColors.black,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                0
              </Text>
              <Text
                style={{
                  color: WimitiColors.black,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Follower
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: WimitiColors.black,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                0
              </Text>
              <Text
                style={{
                  color: WimitiColors.black,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Following
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 20,
            }}>
            {isSavingImage ? (
              <>
                <View
                  style={{
                    borderColor: WimitiColors.black,
                    borderWidth: 1,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <ActivityIndicator size={15} color={WimitiColors.black} />
                  <Text style={{color: WimitiColors.black, marginLeft: 5}}>
                    Saving...
                  </Text>
                </View>
              </>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  handleImageSelect();
                }}>
                <View
                  style={{
                    borderColor: WimitiColors.black,
                    borderWidth: 1,
                    padding: 10,
                  }}>
                  <Text style={{color: WimitiColors.black}}>Change image</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback>
              <View
                style={{
                  borderColor: WimitiColors.black,
                  borderWidth: 1,
                  padding: 10,
                  width: '65%',
                }}>
                <Text style={{textAlign: 'center', color: WimitiColors.black}}>
                  Start offering free drink
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('UpdateFname')}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: WimitiColors.black,
                  marginVertical: 10,
                  paddingBottom: 5,
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={{color: WimitiColors.gray}}>First name</Text>
                  <Text style={{color: WimitiColors.black, marginTop: 5}}>
                    {fname}
                  </Text>
                </View>
                <View>
                  <Icon2 name="edit" color={WimitiColors.black} size={20} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('UpdateLname')}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: WimitiColors.black,
                  marginVertical: 10,
                  paddingBottom: 5,
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={{color: WimitiColors.gray}}>Last name</Text>
                  <Text style={{color: WimitiColors.black, marginTop: 5}}>
                    {lname}
                  </Text>
                </View>
                <View>
                  <Icon2 name="edit" color={WimitiColors.black} size={20} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                // borderBottomWidth: 1,
                // borderBottomColor: WimitiColors.black,
                marginVertical: 10,
                paddingBottom: 5,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={{color: WimitiColors.gray}}>Username</Text>
                <Text style={{color: WimitiColors.black, marginTop: 5}}>
                  {username}
                </Text>
              </View>
              {/* <View>
              <Icon2 name="edit" color={WimitiColors.black} size={20} />
            </View> */}
            </View>
            <View
              style={{
                // borderBottomWidth: 1,
                // borderBottomColor: WimitiColors.black,
                marginVertical: 10,
                paddingBottom: 5,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={{color: WimitiColors.gray}}>Phone number</Text>
                <Text style={{color: WimitiColors.black, marginTop: 5}}>
                  {phone}
                </Text>
              </View>
              {/* <View>
              <Icon2 name="edit" color={WimitiColors.black} size={20} />
            </View> */}
            </View>
            <View
              style={{
                // borderBottomWidth: 1,
                // borderBottomColor: WimitiColors.black,
                marginVertical: 10,
                paddingBottom: 5,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={{color: WimitiColors.gray}}>Email</Text>
                <Text style={{color: WimitiColors.black, marginTop: 5}}>
                  {email}
                </Text>
              </View>
              {/* <View>
              <Icon2 name="edit" color={WimitiColors.black} size={20} />
            </View> */}
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: WimitiColors.black,
                marginVertical: 10,
                paddingBottom: 5,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={{color: WimitiColors.gray}}>Location</Text>
                <Text style={{color: WimitiColors.black, marginTop: 5}}></Text>
              </View>
              <View>
                <Icon2 name="edit" color={WimitiColors.black} size={20} />
              </View>
            </View>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('UpdateDescription')}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: WimitiColors.black,
                  marginVertical: 10,
                  paddingBottom: 5,
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={{color: WimitiColors.gray}}>Description</Text>
                  <Text style={{color: WimitiColors.black, marginTop: 5}}>
                    {description}
                  </Text>
                </View>
                <View>
                  <Icon2 name="edit" color={WimitiColors.black} size={20} />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('UpdateWork')}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: WimitiColors.black,
                  marginVertical: 10,
                  paddingBottom: 5,
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={{color: WimitiColors.gray}}>Work</Text>
                  <Text style={{color: WimitiColors.black, marginTop: 5}}>
                    {work}
                  </Text>
                </View>
                <View>
                  <Icon2 name="edit" color={WimitiColors.black} size={20} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Profile;
