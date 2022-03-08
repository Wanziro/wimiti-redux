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
import WimitiColors from '../../../WimitiColors';

import Icon from 'react-native-vector-icons/dist/EvilIcons';
import ConnectedFriends from './ConnectedFriends';

const height = Dimensions.get('window').height;

function People({navigation}) {
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
              source={require('../../../../assets/images/person2.jpg')}
              style={{width: 180, height: 130}}
            />
            <View style={{alignItems: 'flex-end'}}>
              <Icon name="close" color={WimitiColors.black} size={50} />
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Balance')}>
                <View
                  style={{
                    marginTop: 15,
                    borderColor: WimitiColors.lightGray,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                  }}>
                  <Text style={{color: WimitiColors.black}}>
                    Top up account
                  </Text>
                </View>
              </TouchableWithoutFeedback>
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
                    borderRadius: 100,
                    borderColor: WimitiColors.black,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                  }}>
                  <Text
                    style={{
                      color: WimitiColors.black,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    Go live
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: WimitiColors.white}}>
          <ConnectedFriends />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default People;
