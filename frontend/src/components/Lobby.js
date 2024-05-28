
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import './Lobby.css';
import io from 'socket.io-client';


const socket = io(process.env.REACT_APP_SERVER_URL); // Adjust the URL if needed

const Lobby = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/codeblocks/`)
      .then(response => response.json())
      .then(data => setCodeBlocks(data));

    // Get the role from the server
    socket.on('role', (assignedRole) => {
      // Store the role in localStorage
      localStorage.setItem('role', assignedRole);
    });

    // Clean up the effect
    return () => {
      socket.off('role');
    };

  }, []);

  return (
    <div className='background'> 
        <Container className="mt-5">
        <Row className="justify-content-center">
            <Col md={8}>
            <Card className="text-center mb-4">
                <Card.Title as="h1" className="card-header-custom">
                    <span className="font-weight-bold">Choose</span> 
                    <span className="text-uppercase"> a </span> 
                    <span className="font-italic">Code Block</span>
                </Card.Title>
                <Card.Body>
                <ListGroup variant="list-group-flush">
                    {codeBlocks.map((block, index) => (
                    <ListGroup.Item
                     key={block._id}
                     className={`list-group-item-custom ${
                        index % 2 === 0 ? 'list-group-item-even' : 'list-group-item-odd'
                     }`}>
                        { localStorage.getItem('role') ? (
                                <Link to={`/codeblock/${block._id}`}  state={{ role: localStorage.getItem('role') , block: block}} className="text-decoration-none">
                                {block.title}
                                </Link>
                        ) : (
                        <span>Loading...</span>
                      )}
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    </div>
    
  );
};
export default Lobby;
