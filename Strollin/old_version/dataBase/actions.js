import { fire } from './config';

function readUserData(UserId) {
  return new Promise((resolve, reject) => {
    console.log(`USEazezaeazeR ID ==============${UserId}`);
    fire.database().ref(`UsersTest/${UserId}`).once('value', (snapshot) => snapshot.val()).then((tmp) => {
      resolve(tmp);
    });
  });
}

function getTags(UserId) {
  return new Promise((resolve, reject) => {
    console.log(`USER ID ==============${UserId}`);
    readUserData(UserId).then((tmp) => {
      const arr = [];
      console.log(`TMP ==============${typeof (arr)}`);
      const array = tmp.val().tagList;
      array.forEach((element) => {
        arr.push(element);
      });
      resolve(arr);
    });
  });
}

export { getTags };
