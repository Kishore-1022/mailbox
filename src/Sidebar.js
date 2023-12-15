import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar">
    <Nav.Item>
        <Nav.Link as={Link} to="/compose">
          compose
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link  as={Link} to="/inbox">
          Inbox
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/sentBox">
          Sentbox
        </Nav.Link>
      </Nav.Item>  
    </Nav>
  );
};

export default Sidebar;
