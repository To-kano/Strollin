const EXEMPLE = {
  conversationList: [
    {
      id: 'uskfdsfsd',
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
  searchFriendList: [],
  searchConvList: []
};

function searchReducer(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'SET_SEARCH_FRIEND_LIST':
      nextState = {
        ...state,
        searchFriendList: action.value
      };
      return nextState;
    case 'ADD_TO_SEARCH_CONV':
      nextState = {
        ...state,
      };
      nextState.searchConvList = [action.value.id ,...nextState.searchConvList]

        return nextState;
    case 'SET_SEARCH_CONV_LIST':
      nextState = {
        ...state,
        searchConvList: action.value
      };
      return nextState;
    default:
      return state;
  }
}

export default searchReducer;
