const EXEMPLE = {
  conversationList: [
    {
      _id: 'uskfdsfsd',
      participants: ['userId1TEST', 'userId2TEST'],
      name: "",
      message_list: ["message_id", "message_id"],
      recent_messages: [{ expeditor: "", conversation_id: "", creation_date: new Date(), type: "message", message: "" }, ]
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
  currentConversation: "id",
  conversationList: []
};

function ConversationReducer(state = initialState, action) {
  let nextState;
  // console.log("\n\ngalleryReducer:\n")
  // console.log(action)
  switch (action.type) {
    case 'ADD_CONVERSATION':
      nextState = {
        ...state,
      };
      nextState[action.value._id] = action.value;
      nextState.conversationList = [action.value._id ,...nextState.conversationList]
      return nextState;
    case 'SET_CURRENT_CONVERSATION':
      nextState = {
        ...state,
        currentConversation: action.value.id
      };
      return nextState;
    case 'ADD_MESSAGE_ID':

      nextState = {
        ...state,
      };
      nextState[action.value._id].message_list = [ ...nextState[action.value._id].message_list, action.value.message_id];
      return nextState;
    default:
      return state;
  }
}

export default ConversationReducer;
