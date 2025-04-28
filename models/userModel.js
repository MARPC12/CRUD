const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {
  getAll(cb) {
    db.query('SELECT * FROM usuarios', cb);
  },

  getById(id, cb) {
    db.query('SELECT * FROM usuarios WHERE ID = ?', [id], cb);
  },

  getByEmail(email, cb) {
    db.query('SELECT * FROM usuarios WHERE EMAIL = ?', [email], cb);
  },

  checkEmailExists(email, cb) {
    db.query('SELECT * FROM usuarios WHERE EMAIL = ?', [email], (err, results) => {
      if (err) return cb(err);
      if (results.length > 0) {
        return cb(null, results[0]);
      }
      cb(null, null);
    });
  },

  create(email, pass, cb) {
    console.log('Intentando crear usuario con email:', email); 

    const hash = bcrypt.hashSync(pass, 10);
    console.log('Contraseña encriptada:', hash); 
    db.query('INSERT INTO usuarios (EMAIL, PASSWORD) VALUES (?, ?)', [email, hash], (err, results) => {
      if (err) {
        console.error('Error al crear el usuario:', err); 
        return cb(err); 
      }
      console.log('Usuario creado exitosamente:', results); 
      cb(null, results); 
    });
  },

  update(id, email, pass, cb) {
    const hash = bcrypt.hashSync(pass, 10);

    db.query('UPDATE usuarios SET EMAIL = ?, PASSWORD = ? WHERE ID = ?', [email, hash, id], cb);
  },

  delete(id, cb) {
    db.query('DELETE FROM usuarios WHERE ID = ?', [id], cb);
  },

  comparePassword(inputPassword, storedPassword, cb) {
    bcrypt.compare(inputPassword, storedPassword, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }
};
