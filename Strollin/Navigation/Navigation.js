import React from 'react';

import { Button, Text, View} from 'react-native';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import Home from "../Components/HomeScreen";
import Profile from "../Components/ProfileScreen";
import ConnectionScreen from '../Components/ConnectionScreen'
import UserRegister from '../Components/UserRegister';
import TageSelection from '../Components/TagSelection';
import LoginPage from '../Components/LoginPage';
import Home from '../Components/Home';
import HomePage from '../Components/HomePage';
import TripSuggestion from '../Components/TripSuggestion';
import TripNavigation from '../Components/TripNavigation';
import HistoryNav from '../Components/HistoryNav';
import CommentScreen from '../Components/CommentScreen';

const Stack = createStackNavigator();

function LogoTitle(props) {
    console.log("logo ", props)
    return (
      <View>
          <Text>title</Text>
      </View>
    );
  }

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
          
        <Stack.Screen
            name="userLogin"
            component={LoginPage}
            options={{title: 'Loging'}}
        />
        <Stack.Screen
            name="historicUser"
            component={HistoryNav}
            options={{
                title: 'historic',
            }}
        />
        <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Homepage'}}
        />
        <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{title: 'Homepage'}}
        />
        <Stack.Screen
            name="TripSuggestion"
            component={TripSuggestion}
            options={{title: 'TripSuggestion'}}
        />
        <Stack.Screen
            name="TripNavigation"
            component={TripNavigation}
            options={{title: 'TripNavigation'}}
        />
        <Stack.Screen
            name="userRegister"
            component={UserRegister}
            options={{title: 'inscription'}}
        />
        <Stack.Screen
            name="TagSelection"
            component={TageSelection}
            options={{title: 'tag selection'}}
        />

        <Stack.Screen
            name="Connection"
            component={ConnectionScreen}
            options={{title: 'connection'}}
        />
        <Stack.Screen
            name="CommentScreen"
            component={CommentScreen}
            options={{title: 'comment screen'}}
        />
        <Stack.Screen
            name="Comment"
            component={CommentScreen}
            options={{title: 'comments'}}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
