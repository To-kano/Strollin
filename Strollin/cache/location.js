import Store from '../Store/configureStore';

function saveNewLocation(newLocation) {
    const store = Store.getState();
    if (!store.location[newLocation.id]) {
        const action = {
            type: 'ADD_LOCATION',
            value: newLocation
        };
        Store.dispatch(action);
    }
}

exports.saveNewLocation = saveNewLocation;

function getLocationCacheById(idLocation) {
    const store = Store.getState();

    if (store.location[idLocation]) {
        return store.location[idLocation];
    }
    return null;
}

exports.getLocationCacheById = getLocationCacheById;