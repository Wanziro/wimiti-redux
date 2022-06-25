import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeAllSetupTabs,
  closeFollowPeopleTab,
  handlecloseAccountTab,
} from '../../actions/setupPanel';
import WimitiColors from '../../WimitiColors';

const width = Dimensions.get('window').width;

function Setup({navigation}) {
  const dispatch = useDispatch();
  const {fname} = useSelector(state => state.currentUser);
  const {closeAllTabs, closeFollowTab, closeAccountTab} = useSelector(
    state => state.setupPanel,
  );
  return (
    <>
      {!closeAllTabs && (!closeFollowTab || !closeAccountTab) && (
        <View style={{marginTop: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Text style={{color: WimitiColors.black}}>
              {fname} setup your account
            </Text>
            <TouchableWithoutFeedback
              onPress={() => dispatch(closeAllSetupTabs())}>
              <Icon name="close" color={WimitiColors.black} size={25} />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              {!closeFollowTab && (
                <View
                  style={{
                    width: width - 150,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: WimitiColors.black,
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                      borderRadius: 5,
                      position: 'relative',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <Image
                        source={require('../../../assets/imageIcons/edit.png')}
                        style={{width: 40, height: 40}}
                      />
                      <Text
                        style={{
                          width: '75%',
                          paddingLeft: 10,
                          color: WimitiColors.black,
                        }}>
                        Let people know you join today and start interacting !
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        fontWeight: 'bold',
                        color: WimitiColors.black,
                      }}>
                      Fastest way to enjoy our services
                    </Text>

                    <View style={{position: 'absolute', right: 0, padding: 5}}>
                      <TouchableWithoutFeedback
                        onPress={() => dispatch(closeFollowPeopleTab())}>
                        <Icon
                          name="close"
                          color={WimitiColors.black}
                          size={20}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: WimitiColors.black,
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: WimitiColors.black,
                        }}>
                        Follow people
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {!closeAccountTab && (
                <View
                  style={{
                    width: width - 150,
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      borderColor: WimitiColors.black,
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                      position: 'relative',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Icon2 name="edit" size={40} color={WimitiColors.black} />
                      <Text
                        style={{
                          width: '70%',
                          paddingLeft: 10,
                          color: WimitiColors.black,
                        }}>
                        Let people know you join today and start interacting !
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 5,
                        fontWeight: 'bold',
                        color: WimitiColors.black,
                      }}>
                      Easy to use account
                    </Text>

                    <View style={{position: 'absolute', right: 0, padding: 5}}>
                      <TouchableWithoutFeedback
                        onPress={() => dispatch(handlecloseAccountTab())}>
                        <Icon name="close" size={20} />
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      dispatch(handlecloseAccountTab());
                      navigation.navigate('Profile');
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: WimitiColors.black,
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: WimitiColors.black,
                        }}>
                        Set up your account
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

export default Setup;
