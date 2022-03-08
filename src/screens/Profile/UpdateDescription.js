import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert,
} from 'react-native';
import {UserMainContext} from '../Context/UserContext';
import WimitiColors from '../../WimitiColors';
import Axios from 'axios';
import {backendUrl} from '../../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function UpdateDescription({navigation}) {
  const context = useContext(UserMainContext);
  const [fname, setFname] = useState('');
  const [isSaving, setisSaving] = useState(false);

  const fnameRef = useRef();

  useEffect(() => {
    if (context.userDescription != '' && context.userDescription != null) {
      setFname(context.userDescription);
    }
  }, []);

  const saveChanges = async () => {
    await AsyncStorage.setItem('user_description', fname);
    await context.setUserDescription(fname);
    navigation.navigate('Profile');
  };

  const handleSave = () => {
    if (!isSaving && fname.trim() != '') {
      setisSaving(true);
      Axios.post(backendUrl + '/updateDescription', {
        description: fname,
        username: context.username,
        userId: context.userId,
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
