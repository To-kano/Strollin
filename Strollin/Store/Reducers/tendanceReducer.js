const EXEMPLE_non_traité = {
  tendanceList: [
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

const location_ex = { 
  "status": 'true',
  "locations_list": [ 
    {
      "id": "14334G",
      "name": "Tour Eiffel"
    },
    {
      "id": "1afzzeqf",
      "name": "Macdo"
    },
  ]
}
const EXEMPLE_after_treatment = {
  tendanceList: [
    {
      "locations_list": [
        {
          "id": "14334G",
          "name": "Gaumont & Pathé"
        },
        {
          "id": "1afzzeqf",
          "name": "Macdo"
        },
      ],
      "score": "3.25",
      "number_used": "5",
      "timetable": "Matin",
      "price_range": [
        "42€",
        "64€"
      ],
      "comments_list": [
          "60142ad8fe6240001e3061c1",
          "60142b29223c3a001e93e2af",
          "60142b44223c3a001e93e2b0",
          "60142b5b223c3a001e93e2b1"
      ],
      "tags_list": ["cinema", "pathé", "macdo"],
      "time_spent": [],
      "id": "60141df8457c17001fed9aa1",
      "name": "Cinéma",
      "author": "It's me !",
      "creation_date": "2021-01-29T14:38:48.530Z",
      "__v": 0
    },

    {
      "locations_list": [
        {
          "id": "14334G",
          "name": "Tour Eiffel"
        },
        {
          "id": "1afzzeqf",
          "name": "Macdo"
        },
      ],
      "score": "3.25",
      "number_used": "5",
      "timetable": "Après-midi",
      "price_range": [
        "42€",
        "64€"
      ],
      "comments_list": [
          "60142ad8fe6240001e3061c1",
          "60142b29223c3a001e93e2af",
          "60142b44223c3a001e93e2b0",
          "60142b5b223c3a001e93e2b1"
      ],
      "tags_list": ["eiffel", "tour", "macdo"],
      "time_spent": [],
      "id": "60141df8457c17001fed9aa1",
      "name": "Eiffel visite",
      "author": "It's me !",
      "creation_date": "2021-01-29T14:38:48.530Z",
      "__v": 0
    },
    {
      "locations_list": [
        {
          "id": "14334G",
          "name": "Grec"
        },
        {
          "id": "1afzzeqf",
          "name": "Macdo"
        },
      ],
      "score": "3.25",
      "number_used": "5",
      "timetable": "Soir",
      "price_range": [
          "12€",
          "30€"
      ],
      "comments_list": [
          "60142ad8fe6240001e3061c1",
          "60142b29223c3a001e93e2af",
          "60142b44223c3a001e93e2b0",
          "60142b5b223c3a001e93e2b1"
      ],
      "tags_list": ["restaurant", "bouffe", "macdo"],
      "time_spent": [],
      "id": "60141df8457c17001fed9aa1",
      "name": "Full bouffe!",
      "author": "It's me !",
      "creation_date": "2021-01-29T14:38:48.530Z",
      "__v": 0
    },
  ],
};

const initialState = {
  tendanceList: [],//EXEMPLE_after_treatment["tendanceList"],
  sortedTendanceList: [],
};

function tendanceReducer(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'DECONNECTION':
      return initialState;
    case 'SET_TENDANCE_LIST':
      nextState = {
        ...state,
        tendanceList: action.value
      };
      return nextState;
    case 'SET_TENDANCE_LIST_FAVORITES':
      nextState = {
        ...state,
      };
      for (let i = 0; i < nextState.tendanceList.length; i++) {
        for (let j = 0; j < action.value.length; j++) {
          if (action.value[j] == nextState.tendanceList[i].id) {
            nextState.tendanceList.favorite = true;
          } else {
            nextState.tendanceList.favorite = false;
          }
        }
      }
      return nextState;
    case 'SET_SORTED_TENDANCE_LIST':
      nextState = {
        ...state,
        sortedTendanceList: action.value
      };
      return nextState;
    default:
      return state;
  }
}

export default tendanceReducer;
