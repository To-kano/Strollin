import React from 'react';


import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// import Home from "../Components/HomeScreen";
import Profile from '../Components/ProfileScreen';
// import ConnectionScreen from '../Components/ConnectionScreen';
import UserRegister from '../Components/UserRegister';
import PartnerRegister from '../Components/PartnerRegister';
import TagSelection from '../Components/TagSelection';
import LoginPage from '../Components/LoginPage';
import FriendList from '../Components/FriendList';
import HomePage from '../Components/HomePage';
import TripSuggestion from '../Components/TripSuggestion';
import TripNavigation from '../Components/TripNavigation';
import HistoryNav from '../Components/HistoryNav';
import CommentScreen from '../Components/CommentScreen';
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

const Stack = createStackNavigator();



function Home() {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            }}

        >
            <Stack.Screen
                  name="HomePage"
                  component={HomePage}
            />
            <Stack.Screen
                  name="CommentScreen"
                  component={CommentScreen}
            />
            <Stack.Screen
                  name="TagSelection"
                  component={TagSelection}
            />
            <Stack.Screen
                  name="SettingPartenaire"
                  component={SettingPartenaire}
            />
        </Stack.Navigator>
    );
}

export default Home;
