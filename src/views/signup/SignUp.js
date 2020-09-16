import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import illustration from "../../assets/images/undraw_team_work_k80m.svg";
import logo from '../../assets/images/logo_2.png'
import "./signup.css";

const SignUp = () => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <Container fluid className="h-100 auth-container">
      <Row className="h-100">
        <Col md="6" className="pt-5">
          <div className="auth-box mx-auto">
            <Link to="/">
              <img src={logo} alt="bloodnation logo" className="img-fluid mb-5"/>
            </Link>
            <h2 className="display-4">
              Sign up to <br />
              BloodNation
            </h2>
            <p className="text-danger">Follow the easy step to get started with bloodnation</p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" className="pt-4 pb-4" />
              </Form.Group>

              <Form.Group controlId="formBasicComfirmPassword">
                <Form.Control type="password" placeholder="Confirm Password" className="pt-4 pb-4" />
              </Form.Group>

              <Button variant="danger" type="submit" className="mb-3 pt-2 pb-2" block>
                Create Account
              </Button>
              <p className="text-center">Or Sign up with an email</p>
              <Button variant="outline-danger" className="pt-2 pb-2" block>
                Sign up with Google
              </Button>
              <Button variant="outline-danger" className="mb-3 pt-2 pb-2" block>
                Sign up with Facebook
              </Button>
              <p>
                By signing up, i agree to the BloodNation Privacy Policy
                <br /> and Terms of Servcie
              </p>
            </Form>
            <h5>
              Have an account? <NavLink to="/signin"> Sign in</NavLink>
            </h5>
          </div>
        </Col>
        <Col md="6" className="text-white text-center d-flex signup-red-box">
          <div className="signupbox one d-none d-md-block"></div>
          <div className="signupbox two d-none d-md-block"></div>
          <div className="signupbox five"></div>
          <div className="signupbox six"></div>
          <div className="signup-illustration-signupbox my-auto mx-auto pt-3 pb-5">
            <h1 className="display-4 mt-4 mb-3">
              Register to be a<br /> Blood Donor
            </h1>
            <img src={illustration} className="img-fluid illustration mb-3" alt="sign up" />
            <p className="mb-4 text-white">Give blood, do something amazing and save lives</p>
            <hr className="border" />
            <h5 className="mt-4">Have an account?</h5>
            <Button variant="light" as={NavLink} to="/signin" className="mb-3 pt-2 pb-2" block>
              Sign In
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
