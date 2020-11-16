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
import SocketContext from './socket-context'
import io from 'socket.io-client'
import Socket from "./Components/Socket"

const socket = io(process.env.REACT_APP_API_BASE_URL, {
  secure: true,
  rejectUnauthorized: false,
  path: '/chat/socket.io'
})

function App() {
  return (
      <Provider store={Store}>
        <SocketContext.Provider value={socket}>
          <Socket/>
          <Navigation />
        </SocketContext.Provider>

      </Provider>
  );
}

export default App;
