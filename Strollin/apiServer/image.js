import { IP_SERVER, PORT_SERVER } from '../env/Environement';


async function getImageId(id) {

    console.log("id getImageId : ", id);
    let answer = await fetch(`https://${IP_SERVER}:${PORT_SERVER}/image/id`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            id: id,
        },
        method: 'GET',
    })

    answer = await answer.json();

    if (answer.image) {
        console.log("image answer = : ", answer);
        return answer.image;
    } else {
        console.log('fetch image by id failled: ', answer.error);
        return null;
    }
}

exports.getImageId = getImageId;

function createFormData(image, body = {}) {
    const data = new FormData();
  
    data.append('image', {
      name: image.fileName,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
}

async function uploadImageProfile(access_token, image) {
    let answer = await fetch(`https://${IP_SERVER}:${PORT_SERVER}/users/set_image_profile`, {
        method: 'POST',
        body: createFormData(image, {access_token}),
    })

    answer = await answer.json();
    return answer;
}

exports.uploadImageProfile = uploadImageProfile;


async function uploadImage(access_token, image) {
    let answer = await fetch(`https://${IP_SERVER}:${PORT_SERVER}/image/upload`, {
        method: 'POST',
        body: createFormData(image, {access_token}),
    })

    answer = await answer.json();
    return answer;
}

exports.uploadImage = uploadImage;