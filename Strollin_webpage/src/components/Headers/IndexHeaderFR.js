import { IP_SERVER, PORT_SERVER } from '../../env/Environement';
import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Label
} from "reactstrap";
function IndexHeaderFR() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (password != passwordConf) {
      alert(`Password confirmation error!`);
    } else {
      const bodyRequest = JSON.stringify({
        pseudo: username,
        password: password,
        mail: email,
        partner: false,
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
        console.log(" answer = " , answer);
        if (answer.access_token) {
          alert(`Inscription réussi, Email: ${email} Username: ${username} Password: ${password}`);
        } else {
          console.log('login user faile: ', answer);
          alert(`Submission failed`);
        }
      })
      .catch((error) => {
        console.error('error :', error);
        alert(`Echec de l'inscription`);
      });
    }
    document.getElementById("inscription").reset();
  }
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/empty_street.jpg") + ")"
        }}
      >
      <div className="filter" />
        <div className="content-center">
          <Container>
            <Row>
              <Col className="mx-auto" lg="4" md="6">
                <Card className="card-register">
                  <h3 className="form-title text-center">Inscrivez-vous pour des bonus</h3>
                  <Form className="register-form" onSubmit={handleSubmit} id="inscription">
                  <h4 className="form-letter">Email</h4>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <h4 className="form-letter">Pseudo</h4>
                    <Input type="username" name="username" id="exampleUsername" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                    <h4 className="form-letter">Mot de passe</h4>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <h4 className="form-letter">Confirmation du mot de passe</h4>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={e => setPasswordConf(e.target.value)} />
                    <Label check className="form-little-letter">
                      <Input type="checkbox" name="check" id="exampleCheck" required/>
                        J'accepte les conditions d'utilisations
                    </Label>
                    <br/>
                    <Input style={{backgroundColor: '#5cb85c', color: 'white', fontSize: '15px', fontWeight: 'bold' }} type="submit" value="S'inscrire" />
                  </Form>
                </Card>
              </Col>
              <div className="title-brand">
                <h1 className="presentation-title">Sortez avec Strollin' !</h1>
              </div>
              <h2 className="presentation-subtitle text-center">
              Plus besoin de plan pour sortir, Strollin' s'occupe de tout !
              </h2>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default IndexHeaderFR;
