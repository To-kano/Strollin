import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import Home from "../Components/HomeScreen";
import Profile from '../Components/ProfileScreen';
import ConnectionScreen from '../Components/ConnectionScreen';
import UserRegister from '../Components/UserRegister';
import TageSelection from '../Components/TagSelection';
import LoginPage from '../Components/LoginPage';
import FriendList from '../Components/FriendList';
import Home from '../Components/Home';
import HomePage from '../Components/HomePage';
import TripSuggestion from '../Components/TripSuggestion';
import TripNavigation from '../Components/TripNavigation';
import HistoryNav from '../Components/HistoryNav';
import CommentScreen from '../Components/CommentScreen';
import Comment from '../Components/Comment';
import MenuChat from '../Components/reactChatScreen/MenuScreen';
import ScreenChat from '../Components/reactChatScreen/ChatScreen';
import NewConversation from '../Components/reactChatScreen/NewConversation';
import Notation from '../Components/Notation';

const Stack = createStackNavigator();

const getProfilCache = async (props) => {
  try {
    let jsonValue = await AsyncStorage.getItem('cache_profile');

    if (jsonValue) {
      jsonValue = JSON.parse(jsonValue);

      const action = { type: 'SET_USER', value: jsonValue };
      props.dispatch(action);
    }
  } catch (e) {
    console.log('echec store profile ', e);
  }
};

function MyStack(props) {
  if (!props.profil.accessToken) {
    getProfilCache(props);
    console.log("nav props: ", props.profil);

  }
  //console.log("nav props: ", props.profil);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {props.profil.accessToken == null ? (
          <>
            <Stack.Screen
              name="userLogin"
              component={LoginPage}
              options={{ title: 'Loging' }}
            />

            <Stack.Screen
              name="userRegister"
              component={UserRegister}
              options={{ title: 'inscription' }}
            />
            <Stack.Screen
              name="Notation"
              component={Notation}
              options={{ title: 'Notation' }}
            />
            <Stack.Screen
              name="Connection"
              component={ConnectionScreen}
              options={{ title: 'connection' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ title: 'Homepage' }}
            />
            <Stack.Screen
              name="historicUser"
              component={HistoryNav}
              options={{
                title: 'historic',
              }}
            />
            <Stack.Screen
              name="CommentScreen"
              component={CommentScreen}
              options={{ title: 'comment screen' }}
            />
            <Stack.Screen
              name="FriendList"
              component={FriendList}
              options={{ title: 'Friend' }}
            />
            <Stack.Screen
              name="Comment"
              component={Comment}
              options={{ title: 'comment' }}
            />
            <Stack.Screen
              name="MenuChat"
              component={MenuChat}
              options={{ title: 'menuchat' }}
            />
            <Stack.Screen
              name="ScreenChat"
              component={ScreenChat}
              options={{ title: 'screenchat' }}
            />
            <Stack.Screen
              name="NewConversation"
              component={NewConversation}
              options={{ title: 'newConversation' }}
            />
            <Stack.Screen
              name="TagSelection"
              component={TageSelection}
              options={{ title: 'tag selection' }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Homepage' }}
            />
            <Stack.Screen
              name="TripSuggestion"
              component={TripSuggestion}
              options={{ title: 'TripSuggestion' }}
            />
            <Stack.Screen
              name="TripNavigation"
              component={TripNavigation}
              options={{ title: 'TripNavigation' }}
            />
            <Stack.Screen name="Profile" component={Profile} />
          </>

        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(MyStack);
