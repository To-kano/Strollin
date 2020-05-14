import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from "../Components/HomeScreen";
import Profile from "../Components/ProfileScreen";
import ConnectionScreen from '../Components/ConnectionScreen'
import LoginPage from '../Components/LoginPage'
import HomePage from '../Components/HomePage'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
