import {fire} from '../dataBase/config'

registerUSer = (firstName, lastName, email, pass) => {
    fire.database().ref('/Users/').push({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        password: pass
    }).then((data)=>{
        console.log('data ' , data)
    }).catch((error)=>{
        console.log('error ' , error)
    })
  }
  
const fireBaseLogin = (email, password) => {
    fire.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("errorcode = ", errorCode, "\n");
        console.log("error message = ", errorMessage, "\n");

      });
}

const fireBaseAuthRegister = (email, password) => {
    console.log("auth fire base register\n");
    fire.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorcode = ", errorCode, "\n");
        console.log("error message = ", errorMessage, "\n");
      });
}

export {fireBaseAuthRegister, fireBaseLogin};