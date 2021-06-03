import React from 'react';


import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import TagSelection from '../Components/TagSelection';
import TagSelectionPart from '../Components/TagSelectionPart';
import HomePage from '../Components/HomePage';
import CommentScreen from '../Components/CommentScreen';
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
                  name="TagSelectionPart"
                  component={TagSelectionPart}
            />
            <Stack.Screen
                  name="SettingPartenaire"
                  component={SettingPartenaire}
            />
        </Stack.Navigator>
    );
}

export default Home;
