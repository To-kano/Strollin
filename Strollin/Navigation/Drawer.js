import React, { useState } from 'react';

import { Button } from 'react-native';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
 } from '@react-navigation/drawer';

import Profile from '../Components/ProfileScreen';

import FriendList from '../Components/FriendList';
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
import Personal_trip from '../Components/Personal_trip';
import TagSelection from '../Components/TagSelection';

import ChangeImageProfileForm from '../Components/ChangeImageProfileForm';

import Chat from './Chat';
import Home from './Home';
import Trip from './Trip';

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
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="historic" component={HistoryNav} />
      <Drawer.Screen name="New trip" component={Trip} />
      <Drawer.Screen name="Friends" component={FriendList} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Profile" component={ChangeImageProfileForm} />
      <Drawer.Screen name="Partenaire" component={PartenaireScreen} />
      <Drawer.Screen name="Settings" component={SettingPartenaire} />
      <Drawer.Screen name="Personal_trip" component={Personal_trip} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
