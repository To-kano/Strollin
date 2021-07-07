const EXEMPLE_non_traité = {
  FavoritesList: [
    {
      "locations_list": [
          "5ff31d40977cba001e801bfa",
          "5ff47553765c6f001fff5b6f",
          "5ff31d40977cba001e801bfa"
      ],
      "score": "3.25",
      "number_used": "5",
      "timetable": "",
      "price_range": [
          "",
          ""
      ],
      "comments_list": [
          "60142ad8fe6240001e3061c1",
          "60142b29223c3a001e93e2af",
          "60142b44223c3a001e93e2b0",
          "60142b5b223c3a001e93e2b1"
      ],
      "tags_list": [],
      "time_spent": [],
      "id": "60141df8457c17001fed9aa1",
      "name": "Cinéma",
      "author": "It's me !",
      "creation_date": "2021-01-29T14:38:48.530Z",
      "__v": 0
    },
  ],
};


const initialState = {
  selectedCourse: []
};

function FavoritesReducer(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'SET_COMMENTS_DISPLAY':
      nextState = {
        ...state,
      };
      nextState.selectedCourse = action.value
      return nextState;
    default:
      return state;
  }
}

export default FavoritesReducer;
