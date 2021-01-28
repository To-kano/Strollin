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
        //console.log('login user faile: ', answer);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.loginUser = loginUser;

async function profileUser(props, access_token) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/get_own_profile`, {
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
        setFriendPseudo(props, access_token, answer.profile);
      } else {
        //console.log(answer.status);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.profileUser = profileUser;

async function setFriendPseudo(props, access_token, profile) {
  //console.log("profile = ", profile);
  for (let i in profile.friends_list) {
    //console.log("boucle for pour fetch");
    fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/get_user_profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token: access_token,
        user_id: profile.friends_list[i],
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then(async (answer) => {
        //console.log("answer in friendPseudo func= ", answer);
        if (answer) {
          const action = { type: 'ADD_FRIEND_TO_PSEUDO_LIST', value: {_id: profile.friends_list[i], pseudo: answer.profile.pseudo} };
          props.dispatch(action);
          const action2 = { type: 'ADD_FRIEND_TO_PSEUDO_LIST_REVERSE', value: {_id: profile.friends_list[i], pseudo: answer.profile.pseudo} };
          props.dispatch(action2);
        } else {
          //console.log(answer.status);
        }
      })
      .catch((error) => {
        console.error('error :', error);
      });
  }
}

exports.profileUser = setFriendPseudo;

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

    const action = { type: "ADD_MESSAGE", value: answer }
    props.dispatch(action);

    return answer;

  })
}

exports.messageUser = messageUser;

async function conversationUser(props, access_token) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/conversation/get_conversations`, {
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
        //console.log("answer = ", answer);
        let action;
        for (let i in answer) {
          action = { type: "ADD_CONVERSATION", value: answer[i] };

          for (let y in answer[i].messages_list) {
             await messageUser(props, access_token, answer[i].messages_list[y]);
          }
          props.dispatch(action);
        }
      } else {
        //console.log(answer.status);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.profileUser = conversationUser;

async function registerUser(props, newPseudo, newPassword, newMail) {
  //console.log("registerUser");
  const bodyRequest = JSON.stringify({
    pseudo: newPseudo,
    password: newPassword,
    mail: newMail,
    partner: false,
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
      //console.log(" answer = " , answer);
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
