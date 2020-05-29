import React from "react";
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

function IndexHeader() {
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
                  <h3 className="form-title text-center">Register now for some bonus!</h3>
                  <Form className="register-form">
                  <h4 className="form-letter">Email</h4>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" />
                    </InputGroup>
                    <h4 className="form-letter">Password</h4>
                    <InputGroup className="form-group-no-border">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" />
                    </InputGroup>
                    <Label check className="form-little-letter">
                      <Input type="checkbox" name="check" id="exampleCheck"/>
                        I agree to the Terms and Conditions
                    </Label>
                    <Button
                      block
                      className="btn-round"
                      color="success"
                      type="button"
                    >
                      Register
                    </Button>
                  </Form>
                </Card>
              </Col>
              <div className="title-brand">
                <h1 className="presentation-title">Go out with Strollin'!</h1>
              </div>
              <h2 className="presentation-subtitle text-center">
                No need for plan anymore, Strollin' take care of everything!
              </h2>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default IndexHeader;
