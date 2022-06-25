import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StatusBar, TouchableWithoutFeedback, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WimitiColors from '../WimitiColors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home1/Home';
import People from '../screens/Home1/People/People';

import Icon4 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import Icon3 from 'react-native-vector-icons/dist/AntDesign';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import Messages from '../screens/Home1/Messages/Messages';
import Balance from '../screens/Balance/Balance';
import ToppedUp from '../screens/Balance/ToppedUp';
import CreatePost from '../screens/Home1/CreatePost/CreatePost';
import Profile from '../screens/Profile/Profile';
import UpdateFname from '../screens/Profile/UpdateFname';
import UpdateLname from '../screens/Profile/UpdateLname';
import UpdateWork from '../screens/Profile/UpdateWork';
import UpdateDescription from '../screens/Profile/UpdateDescription';
import UsersList from '../screens/Home1/Messages/NewChatt/UsersList';
import ChattRoom from '../screens/Home1/Messages/ChattRoom/ChattRoom';
import ChattRoomHeader from '../screens/Home1/Messages/ChattRoom/ChattRoomHeader/ChattRoomHeader';
import ChattFilePreview from '../screens/Home1/Messages/ChattFilePreview/ChattFilePreview';

//socket
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
import {socketIoServerUrl} from '../Config';
import {setOnlineUsers} from '../actions/onlineUsers';
import {addSingleMessage, fetchUserMessages} from '../actions/userMessages';
import {setSocket} from '../actions/socket';
import Shorts from '../screens/Home1/Shorts';
import ShortPreview from '../screens/Home1/Shorts/New/ShortPreview';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs1 = ({navigation}) => {
  const [backgroundColor, setBackgroundColor] = useState(WimitiColors.white2);
  const [activeColor, setActiveColor] = useState(WimitiColors.blue);
  const [inactiveColor, setInactiveColor] = useState(WimitiColors.dark);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {position: 'absolute', bottom: 0, backgroundColor},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            // const icon = focused ? 'settings' : 'home';
            return <Icon name="home" color={color} size={size} />;
          },
        }}
        listeners={{
          tabPress: e => {
            setBackgroundColor(WimitiColors.white2);
            setActiveColor(WimitiColors.blue);
            setInactiveColor(WimitiColors.dark);
          },
        }}
      />
      <Tab.Screen
        name="Peoples"
        component={People}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="people" color={color} size={size} />;
          },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('People');
          },
        }}
      />
      <Tab.Screen
        name="Shorts"
        component={Shorts}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon5 name="motion-play" color={color} size={size} />;
          },
        }}
        listeners={{
          tabPress: e => {
            setBackgroundColor(WimitiColors.black);
            setActiveColor(WimitiColors.white);
            setInactiveColor(WimitiColors.darkGray);
          },
        }}
      />
      <Tab.Screen
        name="Message"
        component={Messages}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon3 name="message1" color={color} size={size} />;
          },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('ChatList');
          },
        }}
      />
    </Tab.Navigator>
  );
};

const User = () => {
  const dispatch = useDispatch();
  const currentUserObj = useSelector(state => state.currentUser);
  const {socket} = useSelector(state => state.socketReducer);
  let connectToSocketInterval;

  const handleSocketConnection = () => {
    if(socket){
      if (!socket.connected) {
        console.log('Not connected to the socket');
        dispatch(setSocket(io(socketIoServerUrl)));
      }
    }
  };

  //connect to the socket io server
  useEffect(() => {
    connectToSocketInterval = setInterval(() => {
      handleSocketConnection();
    }, 10000);
    handleSocketConnection();
    return () => {
      clearInterval(connectToSocketInterval);
    };
  }, []);
  //connect to the socket io server

  useEffect(() => {
    socket?.emit('addUser', currentUserObj.username);
    socket?.on('getAllOnlineUsers', users => {
      console.log('all connected users', users);
      dispatch(setOnlineUsers(users));
    });
    socket?.on('getMessage', message => {
      // console.log('got message', message);
      dispatch(addSingleMessage(message));
      dispatch(fetchUserMessages(currentUserObj.username, currentUserObj.id));
    });

    socket?.on('getMessagesSeen', receiver => {
      //todo
      //mark all messages as seen
      dispatch(fetchUserMessages(currentUserObj.username, currentUserObj.id));
    });
  }, [socket]);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={WimitiColors.white} barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs1"
          component={HomeTabs1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="People"
          component={People}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Balance"
          component={Balance}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ToppedUp"
          component={ToppedUp}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatList"
          component={Messages}
          options={{
            title: 'Chatts',
            headerBackTitle: '',
            headerRight: () => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <View>
                  <Icon2
                    name="phone-call"
                    size={25}
                    color={WimitiColors.black}
                  />
                </View>
                <View style={{paddingLeft: 10}}>
                  <Icon5
                    name="dots-vertical"
                    size={30}
                    color={WimitiColors.black}
                  />
                </View>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({route, navigation}) => ({
            title: 'Profile',
            headerRight: () => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('CreatePost')}>
                <Icon4
                  name="add-a-photo"
                  size={30}
                  color={WimitiColors.black}
                />
              </TouchableWithoutFeedback>
            ),
          })}
        />

        <Stack.Screen
          name="UpdateFname"
          component={UpdateFname}
          options={{
            title: 'Update your firstname',
          }}
        />
        <Stack.Screen
          name="UpdateLname"
          component={UpdateLname}
          options={{
            title: 'Update your lastname',
          }}
        />

        <Stack.Screen
          name="UpdateWork"
          component={UpdateWork}
          options={{
            title: 'Update your work status',
          }}
        />

        <Stack.Screen
          name="ChattFilePreview"
          component={ChattFilePreview}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTransparent: true,
            headerTintColor: WimitiColors.white,
          }}
        />

        <Stack.Screen
          name="ShortPreview"
          component={ShortPreview}
          options={{
            title: 'Video Preview',
            headerShadowVisible: false,
            headerTransparent: true,
            headerTintColor: WimitiColors.white,
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="UpdateDescription"
          component={UpdateDescription}
          options={{
            title: 'Update Description',
          }}
        />

        <Stack.Screen
          name="UsersList"
          component={UsersList}
          options={{
            title: 'Select user',
          }}
        />

        <Stack.Screen
          name="ChattRoom"
          component={ChattRoom}
          options={({route, navigation}) => ({
            headerTitle: () => (
              <ChattRoomHeader
                navigation={navigation}
                user={route.params.user}
              />
            ),
            headerBackVisible: false,
            // headerRight: () => (
            //   <View
            //     style={{
            //       alignItems: 'center',
            //       justifyContent: 'space-between',
            //       flexDirection: 'row',
            //     }}>
            //     <View>
            //       <Icon
            //         name="videocam"
            //         size={30}
            //         color={WimitiColors.black}
            //       />
            //     </View>
            //     <View style={{marginHorizontal: 15}}>
            //       <Icon
            //         name="ios-call"
            //         size={25}
            //         color={WimitiColors.black}
            //       />
            //     </View>
            //     <View>
            //       <Icon5
            //         name="dots-vertical"
            //         size={30}
            //         color={WimitiColors.black}
            //       />
            //     </View>
            //   </View>
            // ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default User;
