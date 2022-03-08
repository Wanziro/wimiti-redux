import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WimitiColors from '../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import {backendUrl} from '../../Config';

const height = Dimensions.get('window').height;

const Register = ({navigation}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const usernamRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignUp = () => {
    setIsSubmitting(true);
    if (fname.trim() == '')
      return setIsSubmitting(false), fnameRef.current.focus();
    if (lname.trim() == '')
      return setIsSubmitting(false), lnameRef.current.focus();
    if (email.trim() == '')
      return setIsSubmitting(false), emailRef.current.focus();
    if (phone.trim() == '')
      return setIsSubmitting(false), phoneRef.current.focus();
    if (username.trim() == '')
      return setIsSubmitting(false), usernamRef.current.focus();
    if (password.trim() == '')
      return setIsSubmitting(false), passwordRef.current.focus();
    Axios.post(backendUrl + '/register', {
      fname,
      lname,
      email,
      phone,
      username,
      password,
    })
      .then(res => {
        console.log(res.data);
        if (res.data.type != 'message') {
          alert(res.data.msg);
          setPassword('');
          setIsSubmitting(false);
        } else {
          alert(res.data.msg);
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setIsSubmitting(false);
      });
  };

  return (
    <KeyboardAwareScrollView extraHeight={50}>
      <View style={{height, backgroundColor: WimitiColors.blue}}>
        <SafeAreaView>
          <ScrollView>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Icon name="flash" size={30} color={WimitiColors.white} />
              <Text style={{color: WimitiColors.white, fontSize: 30}}>
                Wimiti
              </Text>
            </View>

            <View style={{paddingHorizontal: 30, marginTop: 20}}>
              <TextInput
                placeholder="Firstname"
                placeholderTextColor={WimitiColors.black}
                style={styles.inputField}
                value={fname}
                onChangeText={text => !isSubmitting && setFname(text)}
                ref={fnameRef}
              />
              <TextInput
                placeholder="Lastname"
                placeholderTextColor={WimitiColors.black}
                style={styles.inputField}
                value={lname}
                onChangeText={text => !isSubmitting && setLname(text)}
                ref={lnameRef}
              />
              <TextInput
                placeholder="Phone"
                placeholderTextColor={WimitiColors.black}
                style={styles.inputField}
                value={phone}
                onChangeText={text => !isSubmitting && setPhone(text)}
                ref={phoneRef}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor={WimitiColors.black}
                style={styles.inputField}
                value={email}
                onChangeText={text => !isSubmitting && setEmail(text)}
                ref={emailRef}
              />
              <TextInput
                placeholder="Username"
                placeholderTextColor={WimitiColors.black}
                style={styles.inputField}
                value={username}
                onChangeText={text => !isSubmitting && setUsername(text)}
                ref={usernamRef}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={WimitiColors.black}
                style={styles.inputField}
                secureTextEntry={true}
                onChangeText={text => !isSubmitting && setPassword(text)}
                value={password}
                ref={passwordRef}
              />
              {isSubmitting ? (
                <View
                  style={{
                    ...styles.signupBtn,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <ActivityIndicator color={WimitiColors.white} size={25} />
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: '600',
                      color: WimitiColors.white,
                      marginLeft: 10,
                    }}>
                    Please wait...
                  </Text>
                </View>
              ) : (
                <TouchableNativeFeedback onPress={() => handleSignUp()}>
                  <View style={styles.signupBtn}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: '600',
                        color: WimitiColors.white,
                        textAlign: 'center',
                      }}>
                      Sign up
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )}
              <View
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  <View style={{paddingLeft: 10, marginTop: 10}}>
                    <Icon
                      name="flash"
                      size={15}
                      color={WimitiColors.darkWhite}
                    />
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Login')}>
                    <View style={{paddingVertical: 5}}>
                      <Text
                        style={{
                          color: WimitiColors.white,
                          textDecorationLine: 'underline',
                        }}>
                        Already have an account ? login now
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 5,
    backgroundColor: WimitiColors.white,
    padding: 15,
    marginVertical: 10,
  },
  signupBtn: {
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: WimitiColors.white,
  },
});
export default Register;
