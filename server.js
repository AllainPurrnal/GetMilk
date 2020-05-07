const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlerware
app.use(express.json());

// DB Config
const db = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(db, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Use routes
app.use('/api/items/', require('./routes/api/items'));
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/auth/', require('./routes/api/auth'));

// Serve Static Assets if in Production
if(process.env.NODE_ENV == 'production') {
  // Set Static Folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`))