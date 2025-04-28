const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  if (req.session.user) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));  
    }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));  
});

app.use(authRoutes);
app.use(userRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
