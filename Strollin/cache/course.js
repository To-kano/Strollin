import Store from '../Store/configureStore';

function saveNewcourse(newCourse) {
    const store = Store.getState();
    if (!store.course[newCourse._id]) {
        const action = {
            type: 'ADD_COURSE',
            value: newCourse
        };
        Store.dispatch(action);
    }
}

exports.saveNewcourse = saveNewcourse;

function getcourseCacheById(idCourse) {
    const store = Store.getState();

    if (store.course[idCourse]) {
        return store.course[idCourse];
    }
    return null;
}

exports.getcourseCacheById = getcourseCacheById;