import React, {useState, useEffect, useRef} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert,
} from 'react-native';
import WimitiColors from '../../WimitiColors';
import Axios from 'axios';
import {backendUrl} from '../../Config';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentUserDescription} from '../../actions/currentUser';

function UpdateDescription({navigation}) {
  const dispatch = useDispatch();
  const {description, id, username} = useSelector(state => state.currentUser);

  const [fname, setFname] = useState('');
  const [isSaving, setisSaving] = useState(false);

  const fnameRef = useRef();

  useEffect(() => {
    setFname(description);
  }, []);

  const saveChanges = async () => {
    await dispatch(setCurrentUserDescription(fname));
    navigation.navigate('Profile');
  };

  const handleSave = () => {
    if (!isSaving && fname.trim() != '') {
      setisSaving(true);
      Axios.post(backendUrl + '/updateDescription', {
        description: fname,
        username,
        userId: id,
      })
        .then(res => {
          console.log(res.data);
          if (res.data.type == 'success') {
            saveChanges();
          } else {
            Alert.alert(
              'Awq!',
              res.data.msg,
              [
                {
                  text: 'Ok',
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
            setisSaving(false);
          }
        })
        .catch(error => {
          //   console.log(error)
          alert(error);
          setisSaving(false);
        });
    } else {
      fnameRef.current.focus();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: WimitiColors.white,
      }}>
      <SafeAreaView>
        <View style={{paddingTop: 20}}>
          {isSaving ? (
            <View
              style={{
                borderBottomWidth: 1,
                paddingVertical: 2,
              }}>
              <Text>{fname}</Text>
            </View>
          ) : (
            <TextInput
              placeholder="Enter description"
              value={fname}
              onChangeText={text => setFname(text)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: WimitiColors.black,
                padding: 2,
              }}
              maxLength={50}
              ref={fnameRef}
            />
          )}
        </View>
        <View style={{marginTop: 20}}>
          <TouchableWithoutFeedback onPress={() => handleSave()}>
            <View
              style={{
                backgroundColor: WimitiColors.blue,
                padding: 10,
                borderRadius: 5,
              }}>
              {isSaving ? (
                <Text style={{color: WimitiColors.white, textAlign: 'center'}}>
                  Saving changes...
                </Text>
              ) : (
                <Text style={{color: WimitiColors.white, textAlign: 'center'}}>
                  Save changes
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default UpdateDescription;
