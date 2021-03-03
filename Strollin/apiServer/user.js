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
        await setTendance(props, answer.access_token);
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
      console.log("access_token = ", access_token);
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
        console.log("answer in friendPseudo func= ", answer);
        console.log("accessToken in friendPseudo func= ", access_token);
        if (answer) {
          const action = { type: 'ADD_FRIEND_TO_PSEUDO_LIST', value: {id: profile.friends_list[i], pseudo: answer.profile.pseudo} };
          props.dispatch(action);
          const action2 = { type: 'ADD_FRIEND_TO_PSEUDO_LIST_REVERSE', value: {id: profile.friends_list[i], pseudo: answer.profile.pseudo} };
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

async function setTendance(props, access_token) {
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_course`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
      sort: 'tendency',
    },
    method: 'GET',
  }).then((answer) => answer.json())
  .then(async function (answer) {
    console.log("answer tendance = ", answer);
    console.log("token tendance = ", access_token);
    const action = { type: "SET_TENDANCE_LIST", value: answer["courses_list"] }
    props.dispatch(action);

    for (i in answer["courses_list"]) {
      console.log("answer for loop");
      await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/get_locations_by_id`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          access_token: access_token,
          locations_id_list: answer["courses_list"][i]["locations_list"]
        },
        method: 'GET',
      }).then((answer) => answer.json())
      .then(async function (answer) {
        const action = { type: "SET_LOCATION_LIST", value: answer["locations_list"], index: i }
        props.dispatch(action);
      })
      .catch((error) => {
        console.error('error :', error);
      });

      await fetch(`http://${IP_SERVER}:${PORT_SERVER}/comment/get_comment`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          access_token: access_token,
          comments_list: answer["courses_list"][i]["comments_list"]
        },
        method: 'GET',
      }).then((answer) => answer.json())
      .then(async function (answer) {
        const action = { type: "SET_COMMENT_LIST", value: answer["comments_list"], index: i }
        props.dispatch(action);
      })
      .catch((error) => {
        console.error('error :', error);
      });
    }

    return answer;

  })
}

exports.messageUser = setTendance;

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

    const action = { type: "ADD_MESSAGE", value: answer["message"] }
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
      if (answer["conversations"]) {
        //console.log("answer = ", answer);
        let action;
        for (let i in answer["conversations"]) {
          action = { type: "ADD_CONVERSATION", value: answer["conversations"][i] };

          for (let y in answer["conversations"][i].messages_list) {
             await messageUser(props, access_token, answer["conversations"][i].messages_list[y]);
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

async function addUserHistoric(props) {
  //console.log("registerUser");
  const bodyRequest = JSON.stringify({
    pseudo: newPseudo,
    password: newPassword,
    mail: newMail,
  });

  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_historic`, {
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

exports.addUserHistoric = addUserHistoric;


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
