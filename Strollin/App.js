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

function App() {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
}

export default App;
