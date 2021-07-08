import { IP_SERVER, PORT_SERVER } from '../../env/Environement';
import React, { useState } from "react";
import axios from "axios";

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

function SectionQuestionFR() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();

    const bodyRequest = JSON.stringify({
      mail: email,
      question: question,
      language: "fr"
    });
    fetch(`http://${IP_SERVER}:${PORT_SERVER}/faq/create_question`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          },
          body: bodyRequest,
          method: 'post',
        })
        .then((response) => response.json())
        .then(async (answer) => {
          console.log(" answer = " , answer);
          alert(`Success! Submitting Email: ${email} Question: ${question}`)
          })
        .catch((error) => {
          console.error('error :', error);
          alert(`Submission failed`);
        });

      return false;
  }

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Any questions?<br/><br/></span>
                </div>
          </div>
          <br/>
          <div className="row">
            <Container>
              <Row>
              <Col className="mx-auto" lg="100" md="100">
                  <Card className="question-register">
                    <Form className="register-form" onSubmit={handleSubmit}>
                      <h4 className="form-letter">Email</h4>
                      <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                      <h4 className="form-letter">Question</h4>
                      <textarea style={{ height: "400px", width: "640px"}} type="question" name="question" id="exampleQuestion" placeholder="Your question" onChange={e => setQuestion(e.target.value)}/>
                      <Input style={{backgroundColor: '#5cb85c', color: 'white', fontSize: '15px', fontWeight: 'bold' }} type="submit" value="Send question"/>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default SectionQuestionFR;
