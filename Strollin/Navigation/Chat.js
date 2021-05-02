import React from 'react';


import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// import Home from "../Components/HomeScreen";
import Profile from '../Components/ProfileScreen';
// import ConnectionScreen from '../Components/ConnectionScreen';
import UserRegister from '../Components/UserRegister';
import PartnerRegister from '../Components/PartnerRegister';
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
import Menu from '../Components/Menu';
import Socket from '../Components/Socket';
import CourseEvaluation from '../Components/CourseEvaluation';
import CourseSettings from '../Components/CourseSettings';
import PartenaireScreen from '../Components/PartenairePage';
import SettingPartenaire from '../Components/SettingPartenaire';
import SendCourseScreen from '../Components/reactChatScreen/SendCourseScreen';


const Stack = createStackNavigator();


function Trip() {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            }}
            
        >
            <Stack.Screen
                  name="MenuChat"
                  component={MenuChat}
            />
            <Stack.Screen
                  name="ScreenChat"
                  component={ScreenChat}
            />
            <Stack.Screen
                  name="NewConversation"
                  component={NewConversation}
            />
            <Stack.Screen
                  name="SendCourseScreen"
                  component={SendCourseScreen}
            />
        </Stack.Navigator>
    );
}

export default Trip;