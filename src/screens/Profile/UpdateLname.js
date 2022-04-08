import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import WimitiColors from '../../WimitiColors';
import Axios from 'axios';
import {backendUrl} from '../../Config';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUserLname} from '../../actions/currentUser';

function UpdateLname({navigation}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const [fname, setFname] = useState('');
  const [isSaving, setisSaving] = useState(false);

  const fnameRef = useRef();

  useEffect(() => {
    if (currentUser.lname != '' && currentUser.lname != null) {
      setFname(currentUser.lname);
    }
  }, []);

  const handleSave = () => {
    if (!isSaving && fname.trim() != '') {
      setisSaving(true);
      Axios.post(backendUrl + '/updateLname', {
        fname,
        username: currentUser.username,
        userId: currentUser.id,
      })
        .then(res => {
          console.log(res.data);
          if (res.data.type == 'success') {
            dispatch(setCurrentUserLname(fname));
            navigation.navigate('Profile');
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
              placeholder="Enter your firstname"
              value={fname}
              onChangeText={text => setFname(text)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: WimitiColors.black,
                paddingVertical: 2,
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

export default UpdateLname;
