const EXEMPLE = {
    conversation: [
        {
            id: "uskfdsfsd",
            usersId: ["hytr", "sfza"],
            messages: ["jskfzk", "sjfnzleq"],
        }, {}
    ],
    currentConversation : {
        id: "uskfdsfsd",
        usersId: ["hytr", "sfza"],
        messages: ["jskfzk", "sjfnzleq"],
    }
};

const initialState = {
    conversation: [],
    currentConversation : {}
};


function ConversationReducer(state = initialState, action) {
    let nextState
    //console.log("\n\ngalleryReducer:\n")
    //console.log(action)
    switch (action.type) {
      case 'ADD_CONVERSATION':
        nextState = {
            ...state,
            conversation: [ ...state.conversation, action.value]
        }
        return nextState
      case 'SET_CURRENT_CONVERSATION':
        nextState = {
          ...state,
          currentConversation: action.value
        }
        return nextState
    default:
      return state
    }
  }

export default ConversationReducer;