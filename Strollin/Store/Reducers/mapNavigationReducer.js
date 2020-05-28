const initialState = {
    waypoints: [],
    historic: []
};


function mapNavigationReducer(state = initialState, action) {
    let nextState
    //console.log("\n\ngalleryReducer:\n")
    console.log(action);
    switch (action.type) {
        case 'SET_WAYPOINTS':
            nextState = {
                ...state,
                waypoints: action.value,
            }
            return nextState
        case 'ADD_HISTORIC':
            nextState = {
                ...state,
                historic: state.historic + action.value,
            }
            return nextState
        default:
            return state
    }
}

export default mapNavigationReducer;