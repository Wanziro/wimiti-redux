import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Keyboard,
  ToastAndroid,
  Alert,
} from 'react-native';
import WimitiColors from '../WimitiColors';
import RNOtpVerify from 'react-native-otp-verify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import RNRestart from 'react-native-restart';
import {backendUrl} from '../Config';

function LoginCode({route, navigation}) {
  const {phone, loginCode} = route.params;

  console.log('login code: ' + loginCode);

  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [appHash, setAppHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const codeRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (!isVerifying) {
        codeRef.current.focus();
      }
    }, 2000);
    // getHash();
    //RNOtpVerify.getOtp()
      //.then(p => RNOtpVerify.addListener(otpHandler))
    //  .catch(p => console.log(p));

    // handleVerify2();

    return () => RNOtpVerify.removeListener();
  }, []);

  const getHash = () => {
    RNOtpVerify.getHash()
      .then(hash => {
        console.log(hash[0]);
        setAppHash(hash[0]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const otpHandler = message => {
    try {
      const otp = /(\d{6})/g.exec(message)[1];
      setCode(otp);
      handleVerify();
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const saveCredential = async (
    id,
    fname,
    lname,
    email,
    phone,
    username,
    image,
  ) => {
    await AsyncStorage.setItem('user_id', id);
    await AsyncStorage.setItem('user_fname', fname);
    await AsyncStorage.setItem('user_lname', lname);
    await AsyncStorage.setItem('user_email', email);
    await AsyncStorage.setItem('user_phone', phone);
    await AsyncStorage.setItem('user_image', image);
    await AsyncStorage.setItem('username', username);

    RNRestart.Restart();
  };

  const handleVerify = () => {
    if (code.trim() !== '' && code.length == 6) {
      setIsVerifying(true);
      Axios.post(backendUrl + '/verifyCode', {code})
        .then(res => {
          // console.log(res.data);
          if (res.data.type == 'success') {
            const {id, fname, lname, email, phone, username, image} =
              res.data.user;
            saveCredential(id, fname, lname, email, phone, username, image);
          } else {
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
            setIsVerifying(false);
          }
        })
        .catch(error => {
          console.log(error);
          setIsVerifying(false);
          alert('Something went wrong, try again later after some time.');
        });
    } else {
      // console.log('code is not full');
      codeRef.current.focus();
    }
  };

  const handleVerify2 = () => {
    if (loginCode.trim() !== '' && loginCode.length == 6) {
      setIsVerifying(true);
      Axios.post(backendUrl + '/verifyCode', {loginCode})
        .then(res => {
          console.log(res.data);
          if (res.data.type == 'success') {
            const {id, fname, lname, email, phone, username, image} =
              res.data.user;
            saveCredential(id, fname, lname, email, phone, username, image);
            RNRestart.Restart();
          } else {
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
            setIsVerifying(false);
          }
        })
        .catch(error => {
          console.log(error);
          setIsVerifying(false);
          alert('Something went wrong, try again later after some time.');
        });
    } else {
      console.log('login code is not full');
      codeRef.current.focus();
    }
  };

  const handleRequestCode = () => {
    Keyboard.dismiss();
    setModalVisible(true);
    Axios.post(backendUrl + '/login', {phone, appHash})
      .then(res => {
        console.log(res.data.msg);
        // ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
        setModalVisible(false);
        setCode('');
        codeRef.current.focus();
      })
      .catch(error => {
        console.log(error);
        // ToastAndroid.show(
        //   'Something went wrong, Try again after some time',
        //   ToastAndroid.SHORT,
        // );
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
        setModalVisible(false);
        setIsVerifying(false);
      });
  };
  return (
    <>
    <StatusBar backgroundColor={WimitiColors.blue} />
      <View
      style={{
        height: '100%',
        backgroundColor: WimitiColors.blue,
        padding: 10,
      }}>
          <SafeAreaView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: WimitiColors.white,
              fontSize: 30,
              marginTop: 50,
              marginBottom: 10,
            }}>
            Login code
          </Text>
          <Text style={{color: WimitiColors.darkWhite}}>
            We have sent a login code to {phone}
          </Text>
          <Text style={{color: WimitiColors.darkWhite}}>
            Please do not share it with anyone.
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={{color: WimitiColors.white, fontSize: 18}}>
            Enter your code
          </Text>
          <View
            style={{
              marginTop: 15,
              width: '50%',
              borderBottomColor: WimitiColors.darkWhite,
              borderBottomWidth: 1,
            }}>
            {isVerifying ? (
              <Text style={styles.code}>{code}</Text>
            ) : (
              <TextInput
                style={styles.code}
                placeholder="------"
                placeholderTextColor={WimitiColors.darkWhite}
                value={code}
                onChangeText={text => setCode(text)}
                maxLength={6}
                keyboardType="number-pad"
                ref={codeRef}
              />
            )}
          </View>
          <View style={{marginTop: 20, width: '50%'}}>
            {isVerifying ? (
              <View
                style={{
                  borderColor: WimitiColors.white,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <ActivityIndicator color={WimitiColors.white} />
                <Text style={{color: WimitiColors.white, paddingLeft: 10}}>
                  Verifying...
                </Text>
              </View>
            ) : (
              <TouchableOpacity onPress={() => handleVerify()}>
                <View
                  style={{
                    borderColor: WimitiColors.white,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{color: WimitiColors.white, textAlign: 'center'}}>
                    Verify
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginTop: 40}}>
            <TouchableOpacity onPress={() => handleRequestCode()}>
              <View style={{padding: 5}}>
                <Text style={{color: WimitiColors.white}}>
                  Didn't receive the code? Resend
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View
          style={{
            // backgroundColor: 'rgba(0,0,0,0.5);',
            backgroundColor: WimitiColors.blue,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color={WimitiColors.white} size={100} />
          <Text style={{color: WimitiColors.darkWhite, marginTop: 10}}>
            Requesting the code...
          </Text>
          <Text style={{color: WimitiColors.darkWhite, marginTop: 10}}>
            Please wait.
          </Text>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  code: {
    textAlign: 'center',
    fontSize: 30,
    letterSpacing: 10,
    color: WimitiColors.darkWhite,
  },
});

export default LoginCode;
