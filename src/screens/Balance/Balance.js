import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import WimitiColors from '../../WimitiColors';
import Icon from 'react-native-vector-icons/dist/EvilIcons';

const height = Dimensions.get('window').height;

function Balance({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height,
            backgroundColor: WimitiColors.lightGray,
            marginBottom: 50,
          }}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Wimiti</Text>
          </View>
          <View
            style={{
              backgroundColor: WimitiColors.white,
              paddingHorizontal: 10,
              paddingVertical: 20,
              position: 'relative',
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 30,
                  color: WimitiColors.black,
                  marginBottom: 10,
                }}>
                My account
              </Text>
              <Image
                source={require('../../../assets/images/person3.jpg')}
                style={{width: 180, height: 150}}
              />
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 30,
                  color: WimitiColors.black,
                }}>
                Frederic ian
              </Text>
              <Text style={{fontSize: 18}}>Lives at Kimironko</Text>
            </View>

            <View style={{position: 'absolute', top: 15, left: 0, padding: 10}}>
              <Icon name="close" size={40} />
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              backgroundColor: WimitiColors.white,
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: WimitiColors.black,
                textAlign: 'center',
              }}>
              My balance : 258,000 RWF
            </Text>
          </View>

          <View
            style={{
              backgroundColor: WimitiColors.white,
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: WimitiColors.black,
                textAlign: 'center',
                fontSize: 25,
                marginBottom: 10,
              }}>
              Top up your balance
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <Text style={{color: WimitiColors.black, fontSize: 16}}>
                Amount to add
              </Text>
              <TextInput
                style={{
                  width: '50%',
                  borderColor: WimitiColors.lightGray,
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}
                placeholder="Enter amount to add"
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <Text style={{color: WimitiColors.black, fontSize: 16}}>
                Payment Method
              </Text>
              <TextInput
                style={{
                  width: '50%',
                  borderColor: WimitiColors.lightGray,
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}
                placeholder="Payment Method"
              />
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                marginTop: 10,
              }}>
              <TouchableNativeFeedback
                onPress={() => navigation.navigate('ToppedUp')}>
                <View
                  style={{
                    backgroundColor: WimitiColors.blue,
                    width: '50%',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: WimitiColors.white,
                      textAlign: 'center',
                      fontSize: 20,
                    }}>
                    Recharge
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Balance;
