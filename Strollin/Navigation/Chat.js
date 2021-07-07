import React from 'react';


import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import MenuChat from '../Components/reactChatScreen/MenuScreen';
import ScreenChat from '../Components/reactChatScreen/ChatScreen';
import NewConversation from '../Components/reactChatScreen/NewConversation';
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
