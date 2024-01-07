const mongoose = require('mongoose');

const uri = 'mongodb+srv://santiagoquintanacriado:zoGxtW3AzCLEEmZR@trazer.dakq9yk.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
