import env from '../env/Environement'

const defaultParam = {
    section: '/hot',
    sort: '',
    pageRequest: 0,
    window: '',
    showViral: null,
    mature: null,
    album_previews: null
}

function getGallery(accessToken = null, paramObj = defaultParam) {
    let url = 'https://api.imgur.com/3/gallery' + paramObj.section + ( accessToken ? paramObj.sort : '') + paramObj.window + '/' +paramObj.pageRequest;

    if (paramObj.showViral || (paramObj.mature && accessToken ) || paramObj.album_previews) {
        url = url + '?';
    }

    if (paramObj.showViral) {
        url = url + 'showViral=' + paramObj.showViral;
    }

    if (paramObj.mature) {
        if (url.includes('=')) {
            url = url + '&';
        }
        url = url + 'mature=' + paramObj.mature;
    }

    if (paramObj.album_previews) {
        if (url.includes('=')) {
            url = url + '&';
        }
        url = url + 'album_previews=' + paramObj.album_previews;
    }

    const authorization = (accessToken ? 'Bearer ' + accessToken : 'Client-ID ' + env.Client_ID)
    const optionRequest = {
        methode: 'GET',
        headers: {
            'Authorization' : authorization
        }
    };

    return new Promise((resolve, reject) => {
        fetch(url, optionRequest)
        .then((answer) => answer.json())
        .then((answerjson) => resolve(answerjson))
        .catch((error) => reject(error))
    })
}

export default getGallery;
