import React, { useState } from 'react';

import { Button } from 'react-native';

import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
 } from '@react-navigation/drawer';

// import Home from "../Components/HomeScreen";
import Profile from '../Components/ProfileScreen';
// import ConnectionScreen from '../Components/ConnectionScreen';
//import UserRegister from '../Components/UserRegister';
//import PartnerRegister from '../Components/PartnerRegister';
//import TageSelection from '../Components/TagSelection';
//import LoginPage from '../Components/LoginPage';
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

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <Menu {...props}/>
    );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
        openByDefault={false}
        drawerType={'front'}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="historic" component={HistoryNav} />
      <Drawer.Screen name="New trip" component={TripSuggestion} />
      <Drawer.Screen name="Friends" component={FriendList} />
      <Drawer.Screen name="Chats" component={MenuChat} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Partenaire" component={PartenaireScreen} />
      <Drawer.Screen name="Settings" component={SettingPartenaire} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;