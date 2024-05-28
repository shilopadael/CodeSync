import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';
// import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/default.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './CodeBlock.css'; // Import the custom CSS file

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

//register the languages you need
// hljs.registerLanguage('javascript', javascript);

const socket = io(`${process.env.REACT_APP_SERVER_URL}`); // Adjust the URL if needed

const CodeBlock = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [role, setRole] = useState('student'); // Default to student
  const textareaRef = useRef(null);
  console.log(id)

  useEffect(() => {
    // Fetch the code block data
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/codeblocks/${id}`)
      .then(response => response.json())
      .then(data => setCode(data.code));

    console.log(code)

    // Listen for code updates from the server
    socket.on('codeUpdate', (newCode) => {
      setCode(newCode);
    //   highlightCode();
    });

    // Get the role from the server
    socket.on('role', (assignedRole) => {
      setRole(assignedRole);
      
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
      socket.off('role');
      socket.off('saveSuccess');
      socket.off('saveError');
    };
  }, [id]);

  console.log(role);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);

    // Send code change to the server
    socket.emit('codeChange', newCode);
    // highlightCode();
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
                <Card.Title as="h1">Code Block</Card.Title>
                <div className="textarea-container" style={{ position: 'relative' }}>
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
