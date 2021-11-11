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
import TutorialPage from '../Components/tuto/TutorialPage';
import Subscription from '../Components/SubscriptionPage';


import Chat from './Chat';
import Home from './Home';
import Trip from './Trip';
import { FriendSelection } from '../Components/FriendSelection';
import I18n from '../Translation/configureTrans';

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
      <Drawer.Screen name={I18n.t("Menu.home")} component={Home} />
      <Drawer.Screen name={I18n.t("Menu.historic")} component={HistoryNav} />
      <Drawer.Screen name={I18n.t("Menu.newTrip")} component={Trip} />
      <Drawer.Screen name={I18n.t("Menu.friends")} component={FriendList} />
      <Drawer.Screen name={I18n.t("Menu.chat")} component={Chat} />
      <Drawer.Screen name={I18n.t("Menu.profile")} component={Profile} />
      <Drawer.Screen name={I18n.t("Menu.partenaire")} component={PartenaireScreen} />
      <Drawer.Screen name={I18n.t("Menu.settings")} component={SettingPartenaire} />
      <Drawer.Screen name={I18n.t("Menu.favorites")} component={Favorites} />
      <Drawer.Screen name={I18n.t("Menu.personalTrip")} component={Personal_trip} />
      <Drawer.Screen name="TripNavigation" component={TripNavigation} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
