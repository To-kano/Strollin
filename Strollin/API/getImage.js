import env from '../env/Environement';

function getImage(imageHash, accessToken = null) {
  const url = `https://api.imgur.com/3/image/${imageHash}`;

  const authorization = (accessToken ? `Bearer ${accessToken}` : `Client-ID ${env.Client_ID}`);
  const optionRequest = {
    methode: 'GET',
    headers: {
      Authorization: authorization
    }
  };

  return new Promise((resolve, reject) => {
    fetch(url, optionRequest)
      .then((answer) => answer.json())
      .then((answerjson) => resolve(answerjson))
      .catch((error) => reject(error));
  });
}

export default getImage;
