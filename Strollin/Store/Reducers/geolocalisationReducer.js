const initialState = {
    permission: false,
    asked: false,
    update : false,
    position: {
        latitude: 48.815641,
        longitude: 2.363224,
    },
    region : {
        latitude: 48.815641,
        longitude: 2.363224,
        latitudeDelta: 0.1622,
        longitudeDelta: 0.1021
    }
};


function geolocalisationReducer(state = initialState, action) {
    let nextState
    //console.log("\n\ngalleryReducer:\n")
    //console.log(action);
    switch (action.type) {
        case 'SET_PERMISSION':
            //console.log("mdr");

            nextState = {
                ...state,
                permission: action.value,
                asked: true
            }
            return nextState;
        case 'SET_POSITION':
            //console.log("lol");
            nextState = {
                ...state,
                update : true,
                position: action.value
            }
            return nextState;
        case 'SET_REGION':
            //console.log("lol");
            nextState = {
                ...state,
                region: action.value
            }
            return nextState;
        default:
            return state;
    }
}

export default geolocalisationReducer;