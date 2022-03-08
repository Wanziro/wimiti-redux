import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import WimitiColors from '../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const height = Dimensions.get('window').height;

function ToppedUp({navigation}) {
  return (
    <SafeAreaView>
      <View style={{backgroundColor: WimitiColors.lightGray, height}}>
        <View
          style={{
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: WimitiColors.black, fontSize: 25}}>Wimiti</Text>
        </View>
        <View
          style={{
            backgroundColor: WimitiColors.white,
            padding: 10,
            marginBottom: 20,
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../../assets/images/person3.jpg')}
              style={{width: 180, height: 130}}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Icon name="close" color={WimitiColors.black} size={50} />
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <View>
              <Text style={{fontSize: 35, color: WimitiColors.gray}}>
                Eric larryson
              </Text>
              <Text style={{marginTop: 5}}>Lives at Kimironko</Text>
            </View>
            <View>
              <TouchableOpacity>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: WimitiColors.blue,
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                  }}>
                  <Text
                    style={{
                      color: WimitiColors.white,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    start chatting
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: WimitiColors.white,
            paddingHorizontal: 10,
            paddingVertical: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon2 name="database-check" color={WimitiColors.blue} size={150} />
          <Text
            style={{
              marginTop: 15,
              fontSize: 20,
              paddingHorizontal: 30,
              textAlign: 'center',
              color: WimitiColors.black,
            }}>
            Money have been deposited successfully
          </Text>
          <View style={{marginVertical: 20}}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('HomeTabs1', {screen: 'Home'})
              }>
              <View
                style={{
                  backgroundColor: WimitiColors.blue,
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                }}>
                <Text style={{color: WimitiColors.white}}>Home</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ToppedUp;
