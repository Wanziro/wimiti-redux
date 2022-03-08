// import 'react-native-gesture-handler';
import React, {useEffect, useContext} from 'react';
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
import {UserMainContext} from '../screens/Context/UserContext';

//messages
import {sendMessage, getAllMessages} from '../controller/userMessagesSync';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs1 = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: WimitiColors.blue,
        tabBarInactiveTintColor: WimitiColors.dark,
        headerShown: false,
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
        name="Edit"
        component={CreatePost}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Icon2 name="edit" color={color} size={size} />;
          },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('CreatePost');
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
  const context = useContext(UserMainContext);

  const sendAllMessages = async () => {
    const i = context.userMessagesToBeSent.length - 1;
    if (
      typeof context.userMessagesToBeSent[i] != 'undefined' &&
      context.userMessagesToBeSent[i].sent == false
    ) {
      try {
        const response = await sendMessage(context.userMessagesToBeSent[i]);
        console.log(response);
        if (response.type == 'success') {
          //remove the message from sending list
          const newMessages = [...context.userMessagesToBeSent];
          newMessages.splice(i, 1);
          context.setUserMessagesToBeSent([...newMessages]);

          //TODO
          //check if we have rendered this message else display
          //otherwise display it
        } else {
          //error trying to send the message
          console.log('message not sent');
        }
      } catch (error) {
        console.log('An error occured while sending a message ', error);
      }
    }
  };

  const getUserMessages = async () => {
    try {
      const response = await getAllMessages(context.username, context.userId);
      if (response.type == 'success') {
        context.setUserMessages(response.messages);
        // console.log(context.userMessages.length);
        getUserMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //watch for messages tobe sent
  useEffect(() => {
    sendAllMessages();
  }, [context.userMessagesToBeSent]);

  //watch user messages
  useEffect(() => {
    getUserMessages();
  });

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
