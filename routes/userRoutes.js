const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const isAuth = require('../middleware/isAuthenticated');

router.get('/listar', isAuth, user.listarForm);
router.get('/api/usuarios', isAuth, user.getAll);
router.post('/api/usuarios', isAuth, user.create);
router.put('/api/usuarios/editar/:id', isAuth, user.edit);
router.post('/api/usuarios/borrar/:id', isAuth, user.delete); 
module.exports = router;
