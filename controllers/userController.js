const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.listarForm = (req, res) => {
  res.sendFile(__dirname + '/../public/index.html');
};

exports.getAll = (req, res) => {
  userModel.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener usuarios' });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }

  const hash = bcrypt.hashSync(password, 10);

  userModel.checkEmailExists(email, (err, existingUser) => {
    if (err) {
      console.error('Error verificando email:', err);
      return res.status(500).json({ message: 'Error al verificar el email. Inténtalo de nuevo más tarde.' });
    }
    
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    userModel.create(email, hash, (err) => {
      if (err) {
        console.error('Error al crear el usuario:', err);
        return res.status(500).json({ message: 'Error creando el usuario. Inténtalo de nuevo más tarde.' });
      }
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    });
  });
};

exports.edit = (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;

  console.log('Body recibido en edit:', req.body);
  console.log('ID recibido en edit:', id);

  if (!id || !email || !password) {
    return res.status(400).json({ message: 'ID, email y contraseña son requeridos' });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' });
  }

  const hash = bcrypt.hashSync(password, 10);

  userModel.update(id, email, hash, (err) => {
    if (err) {
      console.error('Error editando el usuario:', err);
      return res.status(500).json({ message: 'Error editando el usuario' });
    }
    res.status(200).json({ message: 'Usuario editado correctamente' });
  });
};


exports.delete = (req, res) => {
  const { id } = req.params; 

  userModel.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  });
};
