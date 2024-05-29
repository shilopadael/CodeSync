
<body>
    <h1>CodeSync</h1>
    <p>CodeSync is an online coding web application that allows a mentor and a student to collaborate on code blocks in real-time. The application features a lobby page to select code blocks and a code block page where real-time code editing takes place.</p>

    <h2>Features</h2>
    <ul>
        <li><strong>Lobby Page:</strong> Contains the title “Choose code block” and a list of code blocks. Each code block is represented by a name (e.g., “Async case”). Clicking on a code block takes the user to the code block page.</li>
        <li><strong>Code Block Page:</strong>
            <ul>
                <li>The first user to open the page is designated as the mentor and sees the code in read-only mode.</li>
                <li>Subsequent users are designated as students and can edit the code.</li>
                <li>Code changes are displayed in real-time using WebSockets.</li>
                <li>Syntax highlighting is implemented using Highlight.js.</li>
                <li>If the student's code matches the solution, a smiley face is displayed.</li>
            </ul>
        </li>
    </ul>

    <h2>Deployment Links</h2>
    <ul>
        <li><strong>Server:</strong> <a href="https://codesyncserver-alj7.onrender.com">https://codesyncserver-alj7.onrender.com</a></li>
        <li><strong>Client:</strong> <a href="https://codesync1.onrender.com">https://codesync1.onrender.com</a></li>
        <li><strong>GitHub Repository:</strong> <a href="https://github.com/yourusername/codesync">https://github.com/yourusername/codesync</a></li>
    </ul>

    <h2>Setup and Installation</h2>
    <ol>
        <li>Clone the repository: <code>git clone https://github.com/yourusername/codesync.git</code></li>
        <li>Navigate to the project directory: <code>cd codesync</code></li>
        <li>Install the server dependencies: <code>cd backend && npm install</code></li>
        <li>Install the client dependencies: <code>cd ../frontend && npm install</code></li>
        <li>Start the server: <code>cd ../backend && npm start</code></li>
        <li>Start the client: <code>cd ../frontend && npm start</code></li>
    </ol>

    <h2>Usage</h2>
    <p>To use the application:</p>
    <ol>
        <li>Navigate to the <a href="https://codesync1.onrender.com">Client URL</a>.</li>
        <li>Select a code block from the lobby page.</li>
        <li>The first user to open the code block page will be the mentor. The mentor sees the code in read-only mode.</li>
        <li>Subsequent users will be students and can edit the code.</li>
        <li>Code changes will be displayed in real-time for all users.</li>
    </ol>

    <h2>Code Blocks</h2>
    <p>The application comes with pre-defined code blocks. Each code block has a title and a code snippet. You can add more code blocks manually in the code.</p>

    <h2>Technologies Used</h2>
    <ul>
        <li>Frontend: React</li>
        <li>Backend: Node.js, Express, Mongoose</li>
        <li>Database: MongoDB Atlas</li>
        <li>Real-time Communication: Socket.IO</li>
        <li>Deployment: Render </li>
    </ul>

    <h2>Contact</h2>
    <p>If you have any questions or need further information, please contact me at [Your Email Address].</p>
</body>
</html>
