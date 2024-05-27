// src/components/Lobby.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';

const Lobby = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/lobby`)
      .then(response => response.json())
      .then(data => setCodeBlocks(data));
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center mb-4">
            <Card.Header as="h1">Choose a Code Block</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {codeBlocks.map((block) => (
                  <ListGroup.Item key={block._id}>
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
  );
};
export default Lobby;
