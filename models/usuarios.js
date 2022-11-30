const Sequelize = require('sequelize');
const BancoDeDados = require('./banco.js');

const tabelaUsuarios = BancoDeDados.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
     cep:{
          type: Sequelize.STRING,
          allowNull: false
    },
     rua:{
          type: Sequelize.STRING,
          allowNull: false
      },
      numero:{
          type: Sequelize.STRING,
          allowNull: false
      },
      bairro:{
          type: Sequelize.STRING,
          allowNull: false
      },
      cidade:{
          type: Sequelize.STRING,
          allowNull: false
      },
      estado:{
          type: Sequelize.STRING,
          allowNull: false
      }

});


module.exports = tabelaUsuarios