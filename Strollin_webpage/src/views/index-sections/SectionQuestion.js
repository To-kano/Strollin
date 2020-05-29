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

function SectionQuestion() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Email: ${email} Question: ${question}`)
      return false;
  }

  return (
    <>
      <div class="container">
          <div class="row d-flex justify-content-center">
                <div class="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Any questions?<br/><br/></span>
                </div>
          </div>
          <br/>
          <div class="row">
            <Container>
              <Row>
              <Col className="mx-auto" lg="100" md="100">
                  <Card className="question-register">
                    <Form className="register-form" onSubmit={handleSubmit}>
                      <h4 className="form-letter">Email</h4>
                      <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                      <h4 className="form-letter">Question</h4>
                      <textarea style={{ height: "400px", width: "640px"}} type="question" name="question" id="exampleQuestion" placeholder="Question" onChange={e => setQuestion(e.target.value)}/>
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

export default SectionQuestion;
