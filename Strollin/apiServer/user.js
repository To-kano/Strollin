import { IP_SERVER, PORT_SERVER } from '../env/Environement';

async function loginUser(props, newMail, newPassword, setLoading, setError, setPopup) {

  console.log("mail", newMail, "password", newPassword);

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
      console.log("answer", answer);
      if (answer.access_token) {
      //console.log("AccessToken: ", answer.access_token);
        await profileUser(props, answer.access_token);
        await conversationUser(props, answer.access_token);
        await setTendance(props, answer.access_token);
        await setCourseHistoric(props, answer.access_token);
        const action = { type: 'CONNECTION', value: answer.access_token };
        props.dispatch(action);
      } else {
        console.log('login user faile: ', answer);
        await setError(answer.error_code)
        await setPopup(true)
      }
    })
    .then(setLoading(false))
    .catch((error) => {
      console.error('error :', error);
      setLoading(false);
    });
}

exports.loginUser = loginUser;


async function logoutUser(props, access_token, setLoading) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/logout`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then(async (answer) => {
      if (answer.status) {
        console.log("Discon: ", answer);
        const action = { type: 'DECONNECTION' };
        props.dispatch(action);
      } else {
        console.log('Discon: ', answer);
      }
    })
    .then(setLoading(false))
    .catch((error) => {
      console.error('error :', error);
      setLoading(false);
    });
}

exports.logoutUser = logoutUser;



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
        console.log("\n_______________________________\n", answer.profile);
        props.dispatch(action);
        setFriendPseudo(props, access_token, answer.profile);
        await setFavorites(props, access_token);
        await setTendance(props, access_token);
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

exports.setFriendPseudo = setFriendPseudo;

async function getUserProfile(access_token, UserId) {

  let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/get_user_profile`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
      user_id: UserId,
    },
    method: 'GET',
  })

  answer = await answer.json();

  if (answer?.profile) {
    return answer.profile;
  }

  return {};
}

exports.getUserProfile = getUserProfile;

async function setTendance(props, access_token) {
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_course`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
      sort: 'tendency',
      tendency_range: 5000
    },
    method: 'GET',
  }).then((answer) => answer.json())
  .then(async function (answer) {
    const action = { type: "SET_TENDANCE_LIST", value: answer["courses_list"] }
    props.dispatch(action);
    return answer;
  })
}

exports.messageUser = setTendance;

async function setFavorites(props, access_token) {
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_course`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
      sort: 'favorites',
    },
    method: 'GET',
  }).then((answer) => answer.json())
  .then(async function (answer) {
    const action = { type: "SET_FAVORITES_LIST", value: answer["courses_list"] }
    props.dispatch(action);
    return answer;
  })
}

exports.messageUser = setFavorites;

async function setCourseHistoric(props, access_token) {
  fetch(`http://${IP_SERVER}:${PORT_SERVER}/course/get_user_historic`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
      size: 10
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .then(async (answer) => {
      const action = { type: 'SET_COURSE_OBJECT_HISTORIC', value: answer.course_historic };
      props.dispatch(action);
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.messageUser = setCourseHistoric;

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

exports.conversationUser = conversationUser;

async function registerUser(props, newPseudo, newPassword, newMail, setMessage, setModalVisible, partner, setLoading, setError, setPopup) {
  const bodyRequest = JSON.stringify({
    pseudo: newPseudo,
    password: newPassword,
    mail: newMail,
    partner: partner,
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
    //console.log("okkkk")
      console.log(" answer = " , answer);
      if (answer.access_token) {
        await profileUser(props, answer.access_token);
        await setFavorites(props, answer.access_token);
        await setTendance(props, answer.access_token);
        const action = { type: 'CONNECTION', value: answer.access_token };
        props.dispatch(action);
      } else if (answer.error_code) {
        await setMessage(answer.status);
        await setModalVisible(true);
        await setError(answer.error_code)
        await setPopup(true)
        console.log("zqddddd")
      }
    })
    .then()
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.registerUser = registerUser;

async function resetUserPassword(mail) {

  console.log(mail);
  const bodyRequest = JSON.stringify({
    mail: mail,
  });

  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/reset_password`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: bodyRequest,
  })
    .then((response) => response.json())
    .then(async (answer) => {
    //console.log("okkkk")
      console.log(" answer reset mail = " , answer);
      if (answer.status) {
        //setMessage(answer.status);
        //setPopup(true);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

exports.resetUserPassword = resetUserPassword;

async function addUserHistoric(access_token, courseId) {

  console.log("addUserHistoric: ", courseId);
  const bodyRequest = JSON.stringify({
    course: courseId
  });

  fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_historic`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: access_token,
    },
    method: 'post',
    body: bodyRequest,
  })
    .then((response) => response.json())
    .then(async (answer) => {
      //console.log(" answer = " , answer);
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
//console.log("upload image ", access_token, image);
  let answer = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_image_profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token: access_token,
      },
      method: 'POST',
      body: createFormData(image, {}),
    })

  //answer = await answer.text();
//console.log("upload image answer", result);
  return answer;
}

exports.uploadImageProfile = uploadImageProfile;

async function addFavorite(props) {
  const bodyRequest = JSON.stringify({
    course: props.data.id
  });
//console.log("sent id = ", props.data.id);
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/add_favorite`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: props.profil.access_token,
    },
    method: 'POST',
    body: bodyRequest,
  }).then((answer) => answer.json())
  .then(async function (answer) {
  //console.log("add answer = ", answer);
    if (answer.course_favorites) {
      const action = {type: 'SET_FAVORITES_LIST', value: answer.course_favorites};
      props.dispatch(action);
      const action2 = {type: 'ADD_TO_PROFILE_FAVORITES', value: answer.course_favorites}
      props.dispatch(action2);
    }

  })
  .catch((error) => {
    console.error('error :', error);
  });
}

exports.addFavorite = addFavorite;

async function removeFavorite(props) {
//console.log("remove props.data.id = ", props.data.id);
  const bodyRequest = JSON.stringify({
    course_id: props.data.id
  });
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/remove_favorite`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: props.profil.access_token,
    },
    method: 'POST',
    body: bodyRequest,
  }).then((answer) => answer.json())
  .then(async function (answer) {
  //console.log("remove answer = ", answer);
    if (answer.course_favorites) {
      const action = {type: 'SET_FAVORITES_LIST', value: answer.course_favorites};
      props.dispatch(action);
    }
  })
  .catch((error) => {
    console.error('error :', error);
  });
}

exports.removeFavorite = removeFavorite;
