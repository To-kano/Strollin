  import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./LoginArea.module.css";

function LoginArea() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (password != passwordConf) {
      alert(`Password confirmation error! ip : ${IP_SERVER}:${PORT_SERVER}`);
    } else {
      const bodyRequest = JSON.stringify({
        pseudo: username,
        password: password,
        mail: email,
        partner: false,
      });
      console.log("bodyrequest = ", bodyRequest)
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
            alert(`Submitted Email: ${email} Username: ${username}`);
          } else {
            console.log('login user faile: ', answer);
            alert(`Submission failed`);
          }
          })
        .catch((error) => {
          console.error('error :', error);
          alert(`Submission failed`);
        });
    }
    document.getElementById("inscription").reset();
  }
  
  return (
    <>
    
      <div className={styles.backgroundImage}>
        <div> 
          <div className={styles.form}>
            <h3>Register now for some bonus!</h3>
            <form onSubmit={handleSubmit} id="inscription">
            <h4 >Email</h4>
              <input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={e => setEmail(e.target.value)} />
              <h4 >Username</h4>
              <input type="username" name="username" id="exampleUsername" placeholder="Username" onChange={e => setUsername(e.target.value)} />
              <h4>Password</h4>
              <input type="password" name="password" id="examplePassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              <h4>Password confirmation</h4>
              <input type="password" name="password" id="examplePassword" placeholder="Password" onChange={e => setPasswordConf(e.target.value)} />
              <label check>
                <input type="checkbox" name="check" id="exampleCheck" required/>
                  I agree to the Terms and Conditions
              </label>
              <br/>
              <input style={{backgroundColor: '#5cb85c', color: 'white', fontSize: '15px', fontWeight: 'bold' }} type="submit" value="Register" />
            </form>
          </div>
          <div className={styles.row}>
              <h1 >Go out with Strollin'!</h1>
              <h2 className={styles.row}>
                No need for plan anymore, Strollin' take care of everything!
              </h2>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default LoginArea;
