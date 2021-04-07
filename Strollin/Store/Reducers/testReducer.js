
const initialState = {
    itemA: [],
    itemB: {},
    itemC: 'item'
};

function TestReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'SET_ITEM_A':
            nextState = {
                ...state,
                itemA: action.value
            };
            return nextState;
        case 'SET_ITEM_B':
            nextState = {
                ...state,
                itemB: action.value
            };
            return nextState;
        case 'SET_ITEM_C':
            nextState = {
                ...state,
                itemC: action.value
            };
            return nextState;
        default:
            return state;
    }
}

export default TestReducer;
