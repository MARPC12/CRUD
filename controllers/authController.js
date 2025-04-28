const path = require('path');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.loginForm = (req, res) => {
  const loginPath = path.join(__dirname, '..', 'public', 'login.html');
  res.sendFile(loginPath);
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log('Intentando login con email:', email);

  userModel.getAll((err, results) => {
    if (err) {
      console.log('Error en la base de datos:', err);
      return res.status(500).send('Error en la base de datos');
    }

    const user = results.find(u => u.EMAIL === email);

    if (!user) {
      console.log('No se encontró el usuario con el email:', email);
      return res.redirect('/login?err=1');
    }

    console.log('Usuario encontrado:', user);

    if (!bcrypt.compareSync(password, user.PASSWORD)) {
      console.log('Contraseña incorrecta');
      return res.redirect('/login?err=1');
    }

    console.log('Login exitoso');
    
    req.session.user = { id: user.ID, email: user.EMAIL };

    return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    console.log('Sesión cerrada');
    res.redirect('/login');
  });
};
