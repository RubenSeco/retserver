const { Categoria, Producto } = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");



const esRoleValido = async (rol = "") => {

  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }

};


const emailExiste = async (correo = "") => {

  const buscarEmail = await Usuario.findOne({ correo });
  if (buscarEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);

  }

};

const existeUsuarioPorId = async (id) => {

  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID: ${id} no existe`);

  }

};


const existeCategoriaPorId = async (id) => {

  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El ID: ${id} no existe`);
  }
};

const existeProductoPorId = async (id) => {

  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El ID: ${id} no existe`);
  }
};



module.exports = {

  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId
};