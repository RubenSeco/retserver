const { Router } = require('express');
const { check } = require('express-validator');
// const { login, googleSignIn } = require('../controllers/auth');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, borrarCategoria, actualizarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - publico

router.get('/', obtenerCategorias);


router.get("/:id", [
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(existeCategoriaPorId),
  validarCampos,
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token válido
router.post("/", [
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos
], crearCategoria);

// Actualizar registro por id - privado - cualquiera con un token válido
router.put("/:id", [
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("id").custom(existeCategoriaPorId),
  validarCampos
], actualizarCategoria);


// Borrar una categoria - Admin
router.delete("/:id", [
  validarJWT,
  esAdminRole,
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(existeCategoriaPorId),
  validarCampos
], borrarCategoria);

module.exports = router;
