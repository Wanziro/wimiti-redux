import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import WimitiColors from '../WimitiColors';

const Stack = createNativeStackNavigator();

function Client() {
  return (
    <>
      <StatusBar backgroundColor={WimitiColors.blue} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: true,
              title: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTransparent: true,
              title: '',
              headerShadowVisible: false,
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Client;
