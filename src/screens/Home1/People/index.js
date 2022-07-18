import React, {useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFollowers, fetchPeople} from '../../../actions/people';
import {backendUserImagesUrl} from '../../../Config';
import WimitiColors from '../../../WimitiColors';
import WimitiFonts from '../../../WimitiFonts';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Skeleton from './Skeleton';
function People() {
  const dispatch = useDispatch();
  const {people, isLoadingPeople, followers} = useSelector(
    state => state.peopleReducer,
  );

  useEffect(() => {
    dispatch(fetchPeople());
    dispatch(fetchFollowers());
  }, []);

  const getUserStatus = user => {
    if (followers.find(item => item.follower == user.username)) {
      return 'follower';
    } else if (followers.find(item => item.following == user.username)) {
      return 'following';
    } else {
      return '';
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: WimitiColors.backgroundWhite2}}>
      {isLoadingPeople && people.length == 0 ? (
        <Skeleton />
      ) : (
        <View>
          {people.map((item, i) => (
            <View
              key={i}
              style={{
                padding: 15,
                borderBottomColor: WimitiColors.textGray,
                borderBottomWidth: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              {item.image !== '' ? (
                <Image
                  source={{uri: backendUserImagesUrl + item.image}}
                  style={{width: 60, height: 60, borderRadius: 100}}
                />
              ) : (
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: WimitiColors.black,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}>
                  <Icon name="user" color={WimitiColors.white} size={25} />
                </View>
              )}
              <View style={{flex: 1, marginHorizontal: 10}}>
                <Text
                  style={{
                    color: WimitiColors.black,
                    fontFamily: WimitiFonts.sfPro,
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  {item.fname} {item.lname}
                </Text>
                <Text
                  style={{
                    color: WimitiColors.gray,
                    fontFamily: WimitiFonts.sfPro,
                    fontWeight: '600',
                    fontSize: 14,
                  }}>
                  @{item.username}
                </Text>
              </View>
              {getUserStatus(item) == 'follower' ||
              getUserStatus(item) == 'following' ? (
                <Text style={{color: WimitiColors.blue}}>
                  {getUserStatus(item)}
                </Text>
              ) : (
                <View
                  style={{
                    backgroundColor: WimitiColors.blue,
                    padding: 10,
                    borderRadius: 20,
                  }}>
                  <Text style={{color: WimitiColors.white}}>Follow</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default People;
