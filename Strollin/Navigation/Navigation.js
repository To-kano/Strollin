import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import UserRegister from '../Components/UserRegister';
import PartnerRegister from '../Components/PartnerRegister';
import LoginPage from '../Components/LoginPage';
import PartenaireScreen from '../Components/PartenairePage';



import MyDrawer from './Drawer'

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
    //console.log('echec store profile ', e);
  }
};

function MyStack(props) {
  if (!props.profil.access_token) {
    getProfilCache(props);
    //console.log('nav props: ', props.profil);
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {props.profil.access_token == null ? (
          <>
            <Stack.Screen
              name="userLogin"
              component={LoginPage}
              options={{
                title: 'Loging',
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="userRegister"
              component={UserRegister}
              options={{
                title: 'inscription',
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="PartnerRegister"
              component={PartnerRegister}
              options={{
                title: 'partner inscription',
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="SettingPartenaire"
              component={PartnerRegister}
              options={{
                title: 'partner settings',
                animationEnabled: false,
              }}
            />
            {/* <Stack.Screen
              name="Connection"
              component={ConnectionScreen}
              options={{
                title: 'connection',
                ...TransitionPresets.RevealFromBottomAndroid,
              }}
            /> */}
          </>
        ) : (
          props.profil.partner == true ? (
            <>
              <Stack.Screen
                name="partner"
                component={MyDrawer}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="normal user"
                component={MyDrawer}
              />
            </>
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(MyStack);


//<Stack.Screen
//name="Connection"
//component={ConnectionScreen}
//options={{ title: 'connection' }}
///>


/*<>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                title: 'Homepage',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Notation"
              component={Notation}
              options={{
                title: 'Notation',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Position"
              component={Position}
              options={{ title: 'Position' }}
            />
            <Stack.Screen
              name="historicUser"
              component={HistoryNav}
              options={{
                title: 'historic',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="CommentScreen"
              component={CommentScreen}
              options={{
                title: 'comment screen',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="FriendList"
              component={FriendList}
              options={{
                title: 'Friend',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Comment"
              component={Comment}
              options={{
                title: 'comment',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="MenuChat"
              component={MenuChat}
              options={{
                title: 'menuchat',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="ScreenChat"
              component={ScreenChat}
              options={{
                title: 'screenchat',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="CourseEvaluation"
              component={CourseEvaluation}
              options={{
                title: 'course evaluation' ,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="CourseSettings"
              component={CourseSettings}
              options={{
                title: 'Course Settings',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="NewConversation"
              component={NewConversation}
              options={{
                title: 'New Conversation',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="TagSelection"
              component={TageSelection}
              options={{
                title: 'tag selection',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Home',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="TripSuggestion"
              component={TripSuggestion}
              options={{
                title: 'TripSuggestion',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="TripNavigation"
              component={TripNavigation}
              options={{
                title: 'TripNavigation',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: 'Profile',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Socket"
              component={Socket}
              options={{
                title: 'Socket',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="PartenaireScreen"
              component={PartenaireScreen}
              options={{
                title: 'PartenaireScreen',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="SettingPartenaire"
              component={SettingPartenaire}
              options={{
                title: 'SettingPartenaire',
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title: 'Menu',
                ...TransitionPresets.SlideFromRightIOS,
                gestureDirection: 'horizontal-inverted',
              }}
            />
          </>*/
