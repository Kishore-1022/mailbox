import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch,useSelector } from 'react-redux';
import { mailAction,inboxAction } from './Store';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


const Compose = () => {
  const [editorState, setEditorState] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const dispatch=useDispatch()
  const navigate=useNavigate()
 
  const email=useSelector(state=>state.mail.email)
  const indianTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
 
  
 
  const handleSend = (e) => {
    const content = editorState.getCurrentContent().getPlainText();
    const id = uuidv4();
    dispatch(mailAction.itemhandler({
      id:id.slice(0,8),
      recipient:recipient,
      sender:email,
      subject:subject,
      content:content,
      time:indianTime,
      seen:false
    }));
    dispatch(inboxAction.itemhandler({
      id:id.slice(0,8),
      recipient:recipient,
      sender:email,
      subject:subject,
      content:content,
      time:indianTime,
      seen:false
    }));
    navigate('/inbox')
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col>
          <Form>
            <Form.Group controlId="formRecipient" className="mb-0 border-bottom-0">
              <Form.Label>Recipient</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter recipient email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="border-0"
              />
            </Form.Group>

            <Form.Group controlId="formSubject" className="mb-0 border-bottom-0">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="border-0"
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-0">
              <Form.Label>Message</Form.Label>
              <Editor
                editorState={editorState}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
                onEditorStateChange={setEditorState}
                placeholder='write ...'
                recipient={recipient} 
                subject={subject} 
              />
            </Form.Group>

            <div className="text-center mt-3">
              <Button variant="primary" onClick={handleSend}>
                Send
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Compose;
