import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import WimitiColors from '../../../../WimitiColors';
import SuggestionsPlaceHolder from './SuggestionsPlaceHolder';
import Axios from 'axios';
import {backendUrl, backendUserImagesUrl} from '../../../../Config';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserSuggestions} from '../../../../actions/userSuggestions';

const width = Dimensions.get('window').width;

function UsersList({navigation}) {
  const dispatch = useDispatch();
  const suggestions = useSelector(state => state.userSuggestions);
  const {username, id} = useSelector(state => state.currentUser);

  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  // const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(fetchUserSuggestions(username, id));
  }, []);

  return (
    <View style={{backgroundColor: WimitiColors.white, flex: 1}}>
      <SafeAreaView>
        <View style={{marginTop: 10, padding: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{color: WimitiColors.black, fontSize: 20}}>
              Suggestions
            </Text>
            {suggestions.loading && suggestions.users.length == 0 ? (
              <>
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
                <SuggestionsPlaceHolder />
              </>
            ) : (
              <View>
                {suggestions.users.map((user, index) => (
                  <Pressable
                    key={index}
                    onPress={() => navigation.navigate('ChattRoom', {user})}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginVertical: 10,
                      }}>
                      <View>
                        {user?.image.trim() != '' && user.image != null ? (
                          <Image
                            source={{uri: backendUserImagesUrl + user.image}}
                            style={{width: 50, height: 50, borderRadius: 100}}
                          />
                        ) : (
                          <View
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 100,
                              backgroundColor: WimitiColors.black,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Icon
                              name="user"
                              size={40}
                              color={WimitiColors.white}
                            />
                          </View>
                        )}
                      </View>
                      <View
                        style={{
                          marginLeft: 10,
                          width: width - 80,
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{color: WimitiColors.black}}>
                          {user.fname} {user.lname}
                        </Text>
                        <Text numberOfLines={1}>@{user.username}</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default UsersList;
