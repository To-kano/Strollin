const initialState = {
    waypoints: [],
    historic: []
};


function mapNavigationReducer(state = initialState, action) {
    let nextState
    //console.log("\n\ngalleryReducer:\n")
    switch (action.type) {
        case 'SET_WAYPOINTS':
            nextState = {
                ...state,
                waypoints: action.value,
            }
            return nextState;
        case 'ADD_HISTORIC':
            const history = {
                id: Date.parse(new Date()),
                waypoints: action.value
            }
            nextState = {
                ...state,
                historic: [history],
            }
            console.log(nextState);

            return nextState;
        default:
            return state;
    }
}

export default mapNavigationReducer;