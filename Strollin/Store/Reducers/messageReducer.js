const EXEMPLE = {
    MessageList: [
      {
        _id: 'uskfdsfsd',
        participants: ['userId1TEST', 'userId2TEST'],
        name: "",
        message_list: ["message_id", "message_id"],
        recent_messages: [{ expeditor: "", Message_id: "", creation_date: new Date(), type: "message", message: "" }, ]
      },
      {
  
      }
    ],
  };
  
  const initialState = {
  };
  
  function MessageReducer(state = initialState, action) {
    let nextState = {};
    // console.log("\n\ngalleryReducer:\n")
    // console.log(action)
    switch (action.type) {
      case 'ADD_MESSAGE':
        nextState = {
          ...state,
        };

        nextState[action.value._id] = action.value;
        return nextState;
      default:
        return state;
    }
  }
  
  export default MessageReducer;
  