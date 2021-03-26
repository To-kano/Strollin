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
};

const initialState = {
  currentConversation: "id",
  conversationList: []
};

function ConversationReducer(state = initialState, action) {
  let nextState;
  // //console.log("\n\ngalleryReducer:\n")
  // //console.log(action)
  switch (action.type) {
    case 'ADD_CONVERSATION':
      nextState = {
        ...state,
      };
      nextState[action.value.id] = action.value;
      nextState.conversationList = [action.value.id, ...nextState.conversationList]
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
      nextState[action.value.id].messages_list = [ ...nextState[action.value.id].messages_list, action.value.message_id];
      return nextState;
      case 'CONVERSATION_TO_TOP':

        nextState = {
          ...state,
        };
        for (let i in conversationList) {
          if (conversationList[i] == action.value.id) {
            conversationList.splice(i, 1);
            break;
          }
        }
        nextState.conversationList = [action.value.id, ...nextState.conversationList]

        return nextState;
    default:
      return state;
  }
}

export default ConversationReducer;
