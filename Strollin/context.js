import React, { createContext } from "react"; 
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://82.226.234.122:3002';

const SocketContext = createContext(); 

export default SocketContext;