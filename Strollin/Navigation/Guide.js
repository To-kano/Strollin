import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TutorialPage from '../Components/tuto/TutorialPage';
import Profile from '../Components/ProfileScreen';

const Tab = createBottomTabNavigator();

function GuideTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="GuideTags" component={TutorialPage} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
}

export default GuideTabs;