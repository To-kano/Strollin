import { IP_SERVER, PORT_SERVER } from '../env/Environement';

async function loginUser(props, newMail, newPassword) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/login`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      mail: newMail,
      password: newPassword,
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then(async (answer) => {
      if (answer.access_token) {
        await profileUser(props, answer.access_token);
        await conversationUser(props, answer.access_token);
        const action = { type: 'CONNECTION', value: answer.access_token };
        props.dispatch(action);
      } else {
        console.log('login user faile: ', answer);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.loginUser = loginUser;

async function profileUser(props, access_token) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/profile`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then(async (answer) => {
      if (answer.profile) {
        const action = { type: 'SET_USER', value: answer.profile };
        props.dispatch(action);
      } else {
        console.log(answer.status);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.profileUser = profileUser;

async function messageUser(props, access_token, message_id) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/message/get_message`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
      message_id: message_id,
    },
    method: 'GET',
  }).then((answer) => answer.json())
  .then(async function (answer) {

    console.log("answer get message = ", answer);

    const action = { type: "ADD_MESSAGE", value: answer }
    props.dispatch(action);

    return answer;

  })
}

exports.messageUser = messageUser;

async function conversationUser(props, access_token) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/conversation/get_conversation`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
    },
    method: 'GET',
  })
    .then((answer) => answer.json())
    .then(async (answer) => {
      if (answer) {
        console.log("answer = ", answer);
        let action;
        for (let i in answer) {
          action = { type: "ADD_CONVERSATION", value: answer[i] };

          for (let y in answer[i].message_list) {
             await messageUser(props, access_token, answer[i].message_list[y]);
          }
          props.dispatch(action);
        }
      } else {
        console.log(answer.status);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.profileUser = conversationUser;

async function registerUser(props, newPseudo, newPassword, newMail) {
  console.log("registerUser");
  const bodyRequest = JSON.stringify({
    pseudo: newPseudo,
    password: newPassword,
    mail: newMail,
  });

  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/register`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: bodyRequest,
  })
    .then((response) => response.json())
    .then(async (answer) => {
      console.log(" answer = " , answer);
      if (answer.access_token) {
        await profileUser(props, answer.access_token);
        const action = { type: 'CONNECTION', value: answer.access_token };
        props.dispatch(action);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.registerUser = registerUser;

async function registerUserTag(props, newPseudo, newPassword, newMail) {
  const bodyRequest = JSON.stringify({
    pseudo: newPseudo,
    password: newPassword,
    mail: newMail,
  });

  fetch(`https://${IP_SERVER}:${PORT_SERVER}/users/register`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: bodyRequest,
  })
    .then((response) => response.json())
    .then(async (answer) => {
      if (answer.access_token) {
        await profileUser(props, answer.access_token);
        const action = { type: 'CONNECTION', value: answer.access_token };
        props.dispatch(action);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.registerUserTag = registerUserTag;