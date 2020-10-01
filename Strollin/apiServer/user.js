import {IP_SERVER, PORT_SERVER} from '../env';

async function loginUser(props, newMail, newPassword) {
    fetch('http://' + IP_SERVER + ':' + PORT_SERVER + '/users/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        mail: newMail,
        password: newPassword,
      },
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then(async (answer) => {
        if (answer.accessToken) {
            await profileUser(props, answer.accessToken);
            const action = {type: 'SET_USER', value: {accessToken : answer.accessToken}};
            props.dispatch(action);
        } else {
        }
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }
  
  exports.loginUser = loginUser;

  async function profileUser(props, accessToken) {
    fetch('http://' + IP_SERVER + ':' + PORT_SERVER + '/users/profile', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then(async (answer) => {
        if (answer.profile) {
          const action = {type: 'SET_USER', value: answer.profile};
          props.dispatch(action);
        } else {
          setInfo(answer.status);
        }
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }
  
  exports.profileUser = profileUser;
  
  async function registerUser(props, newPseudo, newPassword, newMail) {
    const bodyRequest = JSON.stringify({
      pseudo: newPseudo,
      password: newPassword,
      mail : newMail,
    });
  
    fetch('http://' + IP_SERVER + ':' + PORT_SERVER + '/users/register', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: bodyRequest,
    })
      .then((response) => {
        return response.json();
      })
      .then(async (answer) => {
        if (answer.accessToken) {
            await profileUser(props, answer.accessToken);            
          const action = {type: 'SET_USER', value: {accessToken : answer.accessToken}};
          props.dispatch(action);
        }
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }
  
  exports.registerUser = registerUser;