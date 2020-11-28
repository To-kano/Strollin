const EXEMPLE = {
  conversationParticipants: ["sfjze1331d", "drgk435"]
};

const initialState = {
  conversationParticipants: []
};

function createConversationReducer(state = initialState, action) {
  let nextState;
  // console.log("\n\ngalleryReducer:\n")
  // console.log(action)
  switch (action.type) {
    case 'ADD_PARTICIPANT_TO_CONVERSATION':
      nextState = {
        ...state,
      };
      nextState.conversationParticipants.push(action.value.participant)
      return nextState;
    case 'DELETE_PARTICIPANT_OF_CONVERSATION':
      nextState = {
        ...state,
      };
      for (let i in nextState.conversationParticipants) {
        if (nextState.conversationParticipants[i] == action.value.participant) {
          nextState.conversationParticipants.splice(i, 1);
          break;
        }
      }
      return nextState;
    case 'RESET_PARTICIPANT_OF_CONVERSATION':
      nextState = {
        ...state,
        conversationParticipants: [],
      };
      return nextState;

    default:
      return state;
  }
}

export default createConversationReducer;
