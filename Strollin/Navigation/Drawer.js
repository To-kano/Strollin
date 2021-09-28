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
import TripNavigation from '../Components/TripNavigation';
import HistoryNav from '../Components/HistoryNav';

import Notation from '../Components/Notation';
import Position_partener from '../Components/Position_partener';
import Menu from '../Components/Menu';
import PartenaireScreen from '../Components/PartenairePage';
import SettingPartenaire from '../Components/SettingPartenaire';
import Personal_trip from '../Components/Personal_trip';
import Favorites from '../Components/Favorites';


import Chat from './Chat';
import Home from './Home';
import Trip from './Trip';
import { FriendSelection } from '../Components/FriendSelection';

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
      <Drawer.Screen name="Historic" component={HistoryNav} />
      <Drawer.Screen name="New trip" component={Trip} />
      <Drawer.Screen name="Friends" component={FriendList} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Partenaire" component={PartenaireScreen} />
      <Drawer.Screen name="Settings" component={SettingPartenaire} />
      <Drawer.Screen name="Favorites" component={Favorites} />
      <Drawer.Screen name="Personal_trip" component={Personal_trip} />
      <Drawer.Screen name="TripNavigation" component={TripNavigation} />
      <Drawer.Screen name="Position_partener" component={Position_partener} />
      <Drawer.Screen name="Notation" component={Notation} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
