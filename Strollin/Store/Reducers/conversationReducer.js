const EXEMPLE = {
  conversationList: [
    {
      _id: 'uskfdsfsd',
      participants: ['userId1TEST', 'userId2TEST'],
      name: "",
      messages_list: ["message_id", "message_id"],
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
  conversationList: [],
  currentConversation: {},
  nameTest: ''
};

function ConversationReducer(state = initialState, action) {
  let nextState;
  // console.log("\n\ngalleryReducer:\n")
  // console.log(action)
  switch (action.type) {
    case 'ADD_CONVERSATION':
      nextState = {
        ...state,
        conversationList: [...state.conversationList, action.value]
      };
      return nextState;
    case 'SET_CURRENT_CONVERSATION':
      nextState = {
        ...state,
        currentConversation: action.value
      };
      return nextState;
    case 'SET_CONVERSATION':
      nextState = {
        ...state,
        conversationList: action.value
      };
      return nextState;
    case 'ADD_MESSAGE_TO_CONVERSATION':
      nextState = {
        ...state,

      };
      nextState.currentConversation.messages = [...nextState.currentConversation.messages, action.value];
      return nextState;
    case 'TEST':
      nextState = {
        ...state,
        nameTest: action.value
      };
      return nextState;
    default:
      return state;
  }
}

export default ConversationReducer;
