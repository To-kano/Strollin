import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import Home from "../Components/HomeScreen";
import Profile from "../Components/ProfileScreen";
import ConnectionScreen from '../Components/ConnectionScreen'
import UserRegister from '../Components/UserRegister';
import TageSelection from '../Components/TagSelection';
import LoginPage from '../Components/LoginPage';
import Home from '../Components/Home';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Homepage'}}
        />
        <Stack.Screen
            name="userLogin"
            component={LoginPage}
            options={{title: 'Loging'}}
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
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;