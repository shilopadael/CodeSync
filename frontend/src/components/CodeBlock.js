import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useParams, useLocation  } from 'react-router-dom';
import 'highlight.js/styles/default.css';
import { Container, Row, Col, Card, Modal  } from 'react-bootstrap';
import './CodeBlock.css'; // Import the custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';



const socket = io(`${process.env.REACT_APP_SERVER_URL}`); // Adjust the URL if needed

const CodeBlock = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const location = useLocation();
  const { role , block} = location.state; // Access the role from the state
  const textareaRef = useRef(null);
  const [solution, setSolution] = useState(''); // State to store the solution
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [title, setTitle] = useState(''); // State to store the code block title

  console.log(id)

  useEffect(() => {
    setCode(block.code);
    setSolution(block.solution);
    setTitle(block.title);


    console.log(code)

    // Listen for code updates from the server
    socket.on('codeUpdate', (newCode) => {
      setCode(newCode);
    });

    // Handle save success and error messages
    socket.on('saveSuccess', (message) => {
      alert(message);
    });
    socket.on('saveError', (message) => {
      alert(message);
    });

    // Clean up the effect
    return () => {
      socket.off('codeUpdate');
      socket.off('saveSuccess');
      socket.off('saveError');
    };
  }, [id]);

  // Compare the current code with the solution each time the code changes
  useEffect(() => {
    console.log('Code:', code);
    console.log('Solution:', solution);
    if (code === solution) {
      setShowModal(true); // Show the modal when the code matches the solution
    } else {
      setShowModal(false); // Hide the modal if the code doesn't match
    }
  }, [code, solution]);


  console.log(role);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);

    // Send code change to the server
    socket.emit('codeChange', newCode);
  };

  const handleSave = () => {
    console.log('Save code', code)
    // Send save request to the server
    socket.emit('saveCode', { id, code });
  };





  return (
    <div className="background">
      <Container className="codeblock-content">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center mb-4 main-container">
              <Card.Body>
                <Card.Title as="h1">
                  Program: {title}
                </Card.Title>
                <div className="textarea-container" style={{ position: 'relative' }}>
                  {/* {isMatch && <div style={{ color: 'green', marginTop: '50%',  }}>🎉 The code matches the solution!</div>} */}
                  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Body style={{ textAlign: 'center', fontSize: '4rem' }}>
                      😃
                    </Modal.Body>
                  </Modal>
                  { role === 'student' && (
                    <textarea
                    className='codeblock-textarea'
                    ref={textareaRef}
                    value={code}
                    onChange={handleCodeChange}
                    rows="20"
                    readOnly={role === 'mentor'}
                    style={{

                    }}
                  ></textarea>
                   )
                  }
                  
                  <SyntaxHighlighter
                    className="highlighter-textarea"
                    language="javascript"
                    style={docco}
                    customStyle={{
                        textAlign: 'left',
                        position:'relative',
                        
                    }     
                    }    
                  >
                    {code}
                  </SyntaxHighlighter>
                  {role === 'student' && (
                    <button
                      onClick={handleSave}
                      style={{ position: 'relative', zIndex: 3 }}
                    >
                      Save
                    </button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default CodeBlock;
