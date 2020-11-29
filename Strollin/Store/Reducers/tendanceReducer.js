const EXEMPLE = {
  tendanceList: [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      tag: ['game', 'bar', 'movie', 'geek'],
      name: 'Geek Route',
      budget: '25 ~ 30€',
      period: "Fin d'après-midi",
      destinations: ['Starbucks', 'Reset', 'Cinéma']
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      tag: ['show', 'bar', 'opera', 'dance'],
      name: 'Bar Route',
      budget: '38 ~ 42€',
      period: "Fin d'après-midi",
      destinations: ['Bistrot Opéra', 'Jhin Dance', 'Paname']
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      tag: ['restaurant', 'food', 'diabete'],
      name: 'Full Bouffe',
      budget: '25 ~ 45€',
      period: 'Toujours',
      destinations: ['Macdo', 'Sushi Land', 'Flunch']
    }
  ],
};

const initialState = {
  tendanceList: EXEMPLE['tendanceList'],
  sortedTendanceList: []
};

function tendanceReducer(state = initialState, action) {
  let nextState;
  // console.log("\n\ngalleryReducer:\n")
  // console.log(action)
  switch (action.type) {
    case 'SET_TENDANCE_LIST':
      nextState = {
        ...state,
        tendanceList: action.value
      };
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
