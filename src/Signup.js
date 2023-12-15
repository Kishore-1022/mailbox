
import React, { useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const confirm = useRef();
  const navigate=useNavigate()
  const [passwordMatch, setPasswordMatch] = useState(true);

  
  const validatePasswordMatch = () => {
    setPasswordMatch(password.current.value === confirm.current.value);
  };


  const handleSubmit = async(e) => {
    e.preventDefault(); 
    let details
    if(passwordMatch){
         details = {
            email: email.current.value,
            password: password.current.value,
            returnSecureToken: true,
          };
        try{      
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKfv20SstO_lhJL8-jMM3NwWgnEadYPXs',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),  
        })

        alert('User has successfully signedup')
        navigate('/')
        }catch(err){
            alert(err.message)
            console.log(err)
        }
        e.target.reset()
    }  
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5 ">
          <Col xs={12} sm={8} md={6}>
          <h3 className='text-center'>A New User</h3>
            <Form onSubmit={handleSubmit} className="border p-4">
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email} required />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={password}
                  onBlur={validatePasswordMatch}
                  required
                
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  ref={confirm}
                  onBlur={validatePasswordMatch}
                  required
                />
                 {!passwordMatch && (
                  <Form.Text className="text-danger">
                    Password and Confirm Password do not match.
                  </Form.Text>
                )}
               
              </Form.Group>

              <div className="text-center">
                <Button variant="primary mt-1 " type="submit">
                  Sign Up
                </Button>
              </div>
             
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;


