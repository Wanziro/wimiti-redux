import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import WimitiColors from '../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Axios from 'axios';
import {backendUrl} from '../../Config';
import {useDispatch} from 'react-redux';
import {
  setCurrentUserFname,
  setCurrentUserLname,
  setCurrentUserEmail,
  setCurrentUserId,
  setCurrentUserImage,
  setCurrentUserPhone,
  setCurrentUserUsername,
} from '../../actions/currentUser';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const hiddenPassword = () => {
    let result = '';
    for (let i = 0; i < password.length; i++) {
      result += '*';
    }
    return result;
  };

  const handleSubmit = () => {
    setIsSendingRequest(true);
    if (password.trim() != '' && username.trim() != '') {
      Axios.post(backendUrl + '/login2', {username, password})
        .then(res => {
          console.log(res.data);
          if (res.data.type == 'success') {
            const {id, fname, lname, email, phone, username, image} =
              res.data.user;
            dispatch(setCurrentUserId(id));
            dispatch(setCurrentUserFname(fname));
            dispatch(setCurrentUserLname(lname));
            dispatch(setCurrentUserEmail(email));
            dispatch(setCurrentUserPhone(phone));
            dispatch(setCurrentUserImage(image));
            dispatch(setCurrentUserUsername(username));
          } else {
            setPassword('');
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
            setIsSendingRequest(false);
          }
        })
        .catch(error => {
          console.log(error);
          setPassword('');
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
          setIsSendingRequest(false);
        });
    } else {
      setIsSendingRequest(false);
      if (username.trim() == '') {
        usernameRef.current.focus();
      } else {
        passwordRef.current.focus();
      }
    }
  };
  return (
    <>
      <StatusBar backgroundColor={WimitiColors.blue} />
      <View
        style={{
          flex: 1,
          backgroundColor: WimitiColors.blue,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="flash" size={30} color={WimitiColors.white} />
        <Text style={{color: WimitiColors.white, fontSize: 50}}>Wimiti</Text>
        {isSendingRequest ? (
          <>
            <View style={styles.loginInput}>
              <Text style={{color: WimitiColors.darkWhite}}>{username}</Text>
            </View>
            <View style={{...styles.loginInput, marginTop: 15}}>
              <Text style={{color: WimitiColors.darkWhite}}>
                {hiddenPassword()}
              </Text>
            </View>
          </>
        ) : (
          <>
            <TextInput
              style={styles.loginInput}
              placeholder="Enter Username"
              placeholderTextColor={WimitiColors.white}
              value={username}
              onChangeText={text => setUsername(text)}
              ref={usernameRef}
            />
            <TextInput
              style={{...styles.loginInput, marginTop: 15}}
              placeholder="Enter Password"
              placeholderTextColor={WimitiColors.white}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              value={password}
              ref={passwordRef}
            />
          </>
        )}
        <View style={{width: '80%', marginTop: 25}}>
          {isSendingRequest ? (
            <View
              style={{
                padding: 15,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: WimitiColors.white,
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <ActivityIndicator color={WimitiColors.white} size={20} />
              <Text
                style={{
                  color: WimitiColors.white,
                  fontWeight: '600',
                  fontSize: 20,
                  paddingLeft: 10,
                }}>
                Logging in...
              </Text>
            </View>
          ) : (
            <TouchableNativeFeedback onPress={() => handleSubmit()}>
              <View
                style={{
                  padding: 15,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: WimitiColors.white,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: WimitiColors.white,
                    fontWeight: '600',
                    fontSize: 20,
                  }}>
                  Login
                </Text>
              </View>
            </TouchableNativeFeedback>
          )}
        </View>

        <View style={{marginTop: 100}}>
          <View style={{paddingLeft: 10, marginTop: 10}}>
            <Icon name="flash" size={15} color={WimitiColors.darkWhite} />
          </View>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Register')}>
            <View style={{paddingVertical: 5}}>
              <Text
                style={{
                  color: WimitiColors.white,
                  textDecorationLine: 'underline',
                }}>
                Don't have an account ? signup today
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginInput: {
    borderColor: WimitiColors.white,
    borderWidth: 1,
    width: '80%',
    marginTop: 80,
    padding: 10,
    borderRadius: 10,
    color: WimitiColors.darkWhite,
  },
});

export default Login;
