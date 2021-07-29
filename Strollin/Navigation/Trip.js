import React from 'react';


import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// import Home from "../Components/HomeScreen";
// import ConnectionScreen from '../Components/ConnectionScreen';
import TripSuggestion from '../Components/TripSuggestion';
import TripNavigation from '../Components/TripNavigation';
import CourseEvaluation from '../Components/CourseEvaluation';
import CourseSettings from '../Components/CourseSettings';
import LocationPage from '../Components/LocationPage';

const Stack = createStackNavigator();


function Trip() {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            }}
        >
            <Stack.Screen
                  name="CourseSettings"
                  component={CourseSettings}
            />
            <Stack.Screen
                  name="TripSuggestion"
                  component={TripSuggestion}
            />
            <Stack.Screen
                  name="TripNavigation"
                  component={TripNavigation}
            />
            <Stack.Screen
                  name="CourseEvaluation"
                  component={CourseEvaluation}
            />
            <Stack.Screen
              name="LocationPage"
              component={LocationPage}
              options={{
                title: 'Location Page',
                animationEnabled: false,
              }}
            />
        </Stack.Navigator>
    );
}

export default Trip;