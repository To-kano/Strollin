import { useState } from "react";

const EXEMPLE = {
  conversationList: [
    {
      id: 'uskfdsfsd',
      usersId: ['userId1TEST', 'userId2TEST'],
      messages: [{ content: 'Hello', userId: 'userId1TEST', username: 'Tony' },
        { content: 'World', userId: 'userId2TEST', username: 'Koko' }]
    },
    {

    }
  ],
  currentConversation: {
    id: 'uskfdsfsd',
    usersId: ['hytr', 'sfza'],
    messages: [{
      id: '0', content: 'Hello', userId: 'userId1TEST', username: 'Tony'
    },
    {
      id: '1', content: 'World', userId: 'userId2TEST', username: 'Koko'
    }]
  },
  currentConversation2: {
    id: 'uskfdsfsd',
    usersId: ['hytr', 'sfza'],
    messages: [{
      idExpediteur: '0', IDReceveur: '0', IDConversation: '0', Date: '0', Type: 'video', content: 'url du fichier', nom_de_conversation: 'Tony, Koko'
    }]

  }
};

const initialState = {
  socket: ""
};

function SocketReducer(state = initialState, action) {
  let nextState;
  // //console.log("\n\ngalleryReducer:\n")
  // //console.log(action)
  switch (action.type) {
    case 'SET_SOCKET':
      nextState = {
        ...state,
        socket: action.value
      };
      return nextState;
    default:
      return state;
  }
}

export default SocketReducer;
