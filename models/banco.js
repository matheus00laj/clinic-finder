const Sequelize = require('sequelize');

const bancoDeDados = new Sequelize('cfinder', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

module.exports = bancoDeDados