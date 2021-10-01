/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './Navigation/Navigation';
import Store from './Store/configureStore';
import Socket from "./Components/Socket";
import SplashScreen from  "react-native-splash-screen";

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://ad5c52fe29484925ae30e9fa78fafbac@o1021953.ingest.sentry.io/5988093', 
});


function App() {

  React.useEffect(() => {
     SplashScreen.hide();
     Sentry.nativeCrash();
   });
   
  return (
      <Provider store={Store}>
        <Socket>
          <Navigation />
        </Socket>
      </Provider>
  );
}

export default App;
