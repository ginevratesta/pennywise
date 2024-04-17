const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = 3023;

const app = express();

const usersRoute = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use('', usersRoute);


mongoose.connect(process.env.MONGO_DB_URL); 

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));

db.once('open', () => {
  console.log('Database successfully connected');
});

app.listen(PORT, () => console.log(`Server connected to PORT: ${PORT}`));