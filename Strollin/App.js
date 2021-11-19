/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { Provider } from 'react-redux';
import Navigation from './Navigation/Navigation';
import {store, persistor} from './Store/configureStore';
import Socket from "./Components/Socket";
import SplashScreen from  "react-native-splash-screen";
import PushNotification, {Importance} from 'react-native-push-notification';
import { PersistGate } from 'redux-persist/integration/react'

  

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://ad5c52fe29484925ae30e9fa78fafbac@o1021953.ingest.sentry.io/5988093', 
});

//const {store, persistor} = configureStore();

const onBeforeLift = () => {
  SplashScreen.hide();
  // take some action before the gate lifts
}

function App() {

  React.useEffect(() => {
     //SplashScreen.hide();
     //Sentry.nativeCrash();

     PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

   },[]);
   
  return (
      <Provider store={store}>
        <PersistGate loading={null} 
        persistor={persistor}
        onBeforeLift={onBeforeLift}
         >
          <Socket  >
            <Navigation />
          </Socket>
        </PersistGate>
      </Provider>
  );
}

export default App;
