// src/components/CodeBlock.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io(`${process.env.REACT_APP_SERVER_URL}`); // Adjust the URL if needed

const CodeBlock = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [role, setRole] = useState('student'); // Default to student

  useEffect(() => {
    // Fetch the code block data
    fetch(`/api/codeblocks/${id}`)
      .then(response => response.json())
      .then(data => setCode(data.code));

    // Listen for code updates from the server
    socket.on('codeUpdate', (newCode) => {
      setCode(newCode);
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

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);

    // Send code change to the server
    socket.emit('codeChange', newCode);
  };

  const handleSave = () => {
    // Send save request to the server
    socket.emit('saveCode', { id, code });
  };

  return (
    <div>
      <h1>Code Block</h1>
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows="20"
        cols="100"
        readOnly={role === 'mentor'}
      ></textarea>
      {role === 'student' && <button onClick={handleSave}>Save</button>}
    </div>
  );
};

export default CodeBlock;
