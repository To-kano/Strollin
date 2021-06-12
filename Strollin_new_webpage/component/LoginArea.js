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
    
      <section>
        <div className={styles.backgroundCard}> 
          <div className={styles.leftCard}>
              <h1>Go out with Strollin'!</h1>
              <h3 className={styles.row}>
                No need for plan anymore, Strollin' take care of everything!<br/>
                Strollin, your new guide to free time !
              </h3>
              <br/>
              <br/>
              <a href="#" className={styles.downloadCard}>Download now</a>
          </div>
          <div className={styles.rightCard}>
            <h2>Register now for some bonus!</h2>
            <form onSubmit={handleSubmit} id="inscription">
              <h3 >Username</h3>
              <input type="username" name="username" id="exampleUsername" placeholder="John Doe" onChange={e => setUsername(e.target.value)} />
              <h3 >Email</h3>
              <input type="email" name="email" id="exampleEmail" placeholder="john.doe@email.com" onChange={e => setEmail(e.target.value)} />
              <h3>Password</h3>
              <input type="password" name="password" id="examplePassword" placeholder="********" onChange={e => setPassword(e.target.value)} />
              <h3>Password confirmation</h3>
              <input type="password" name="password" id="examplePassword" placeholder="********" onChange={e => setPasswordConf(e.target.value)} />
              <label check>
                <input type="checkbox" name="check" id="exampleCheck" required/>
                I agree to the Terms and Conditions
              </label>
              <br/>
              <input type="submit" value="Register" />
            </form>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default LoginArea;
