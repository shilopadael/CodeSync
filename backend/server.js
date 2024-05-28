const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const path = require('path'); // Still using path for compatibility
const cors = require('cors'); // Import CORS

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Use environment variable or default to localhost
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Define the CodeBlock model
const CodeBlock = require('./models/CodeBlock');

// Routes
const codeBlockRoutes = require('./routes/codeBlockRoutes');
app.use('/api/codeblocks/', codeBlockRoutes);

// Lobby route to serve the list of code blocks
app.get('/api/lobby', async (req, res) => {
  try {
    const codeBlocks = await CodeBlock.find({}, 'title'); // Fetch only the titles
    res.json(codeBlocks); // Send the list of titles to the client
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get a specific code block by title
app.get('/api/codeblocks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const codeBlock = await CodeBlock.findById(id);
    if (codeBlock) {
      res.json(codeBlock);
    } else {
      res.status(404).send('Code block not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Fallback to serve the React app for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

// Track the connected users and roles
let mentorSocketId = null;
console.log('mentorSocketId', mentorSocketId);

// Real-time connection with Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  console.log('mentorSocketId', mentorSocketId);
  // Assign the first connected client as the mentor
  if (!mentorSocketId) {
    mentorSocketId = socket.id;
    socket.emit('role', 'mentor');
  } else {
    socket.emit('role', 'student');
  }

  // Example event listener for receiving code changes
  socket.on('codeChange', (data) => {
    if (socket.id !== mentorSocketId) {
      // Broadcast the code change to all connected clients except the sender
      socket.broadcast.emit('codeUpdate', data);
    } else {
      socket.emit('permissionError', 'Mentors cannot change the code.');
    }
  });

  // Event listener for saving code to the database
  socket.on('saveCode', async (data) => {
    try {
      await CodeBlock.findByIdAndUpdate(data.id, { code: data.code });
      socket.emit('saveSuccess', 'Code saved successfully');
    } catch (err) {
      socket.emit('saveError', 'Error saving code');
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
    // If the mentor disconnects, reset the mentorSocketId
    if (socket.id === mentorSocketId) {
      mentorSocketId = null;
    }
  });
});

// add here 4 example of Code block to the database, with solution and title
// const codeBlocks = [
//   {
//     title: 'Hello World',
//     code: 'console.log("Hello, World!");',
//     solution: 'console.log("Hello, World!");',
//   },
//   {
//     title: 'Add Two Numbers',
//     code: 'const sum = 2 + 2;',
//     solution: 'const sum = 2 + 2;',
//   },
//   {
//     title: 'Filter Even Numbers',
//     code: 'const numbers = [1, 2, 3, 4, 5];\nconst evenNumbers = numbers.filter(num => num % 2 === 0);',
//     solution: 'const numbers = [1, 2, 3, 4, 5];\nconst evenNumbers = numbers.filter(num => num % 2 === 0);',
//   },
//   {
//     title: 'Fetch Data from API',
//     code: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));',
//     solution: 'fetch("https://api.example.com/data")\n  .then(response => response.json())\n  .then(data => console.log(data));',
//   },
// ];

// CodeBlock.insertMany(codeBlocks)
//   .then(() => console.log('Code blocks added successfully'))
//   .catch(err => console.log(err));



// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
