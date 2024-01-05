// server.js
const express = require('express');
const app = express();

app.use(express.json()); // For parsing application/json

// Define a simple route to check server is running
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Trazer.read API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// server.js
const routes = require('./routes');
app.use('/api', routes);
