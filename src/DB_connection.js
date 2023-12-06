require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;
const modeloProducto = require("./models/Producto");
const modeloCategoria = require("./models/Categoria");
const modeloUser = require('../src/models/User');

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   { logging: false, native: false }
// );

const sequelize = new Sequelize(DB_DEPLOY, { logging: false, native: false });

modeloProducto(sequelize);
modeloCategoria(sequelize);
modeloUser(sequelize);

const { Producto, Categoria, User } = sequelize.models;
Producto.belongsToMany(Categoria, { through: "ProductoCategoria" });
Categoria.belongsToMany(Producto, { through: "ProductoCategoria" });

module.exports = {
  Producto,
  Categoria,
  User,
  sequelize,
  ...sequelize.models,
};
