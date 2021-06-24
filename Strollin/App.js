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

function App() {

  React.useEffect(() => {
     SplashScreen.hide();
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
