// src/components/Lobby.js
import React, { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import './Lobby.css';

const Lobby = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/lobby`)
      .then(response => response.json())
      .then(data => setCodeBlocks(data));
  }, []);

  return (
    <div className='background'> 
        <Container className="mt-5">
        <Row className="justify-content-center">
            <Col md={8}>
            <Card className="text-center mb-4">
                <Card.Title as="h1" className="card-header-custom primary">
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
                        
                        <Link to={`/codeblock/${block._id}`} className="text-decoration-none">
                        {block.title}
                        </Link>
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
