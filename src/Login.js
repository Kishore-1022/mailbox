import React, { useRef, useState } from 'react';
import { Form, Button, Container, Row, Col, } from 'react-bootstrap';
import { mailAction } from './Store';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const navi=useNavigate()  
  const email = useRef();
  const password = useRef();
  const dispatch=useDispatch()
  const [loginError, setLoginError] = useState(null);
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const userDetails = {
      email: email.current.value,
      password: password.current.value,
      returnSecureToken: true,
    };

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKfv20SstO_lhJL8-jMM3NwWgnEadYPXs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.error.message);

      } else { 
        setLoginError(null);
        const data = await response.json();
      
        dispatch(mailAction.login({email:data.email}))
        navi('/inbox')   
      }
    } catch (error) {
      alert(error.message);
    }
    e.target.reset()
  };

  return (
    <>
      <Container >
        <Row className="justify-content-center mt-5 ">
          <Col xs={12} sm={8} md={6} >
            <Form onSubmit={handleLogin} className="border p-5">
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email} required />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={password} required />
              </Form.Group>

              {loginError && (
                <Form.Text className="text-danger">
                  Login failed. {loginError}
                </Form.Text>
              )}

              <div className="text-center">
                <Button variant="primary my-2" type="submit">
                  Log In
                </Button>
              </div>
              <p className='text-center'>A New User <Link to='/signup'>Click to register</Link>  </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
