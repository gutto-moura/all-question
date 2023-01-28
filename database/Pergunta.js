const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define( 'perguntas', {
  titulo:{
    type: Sequelize.STRING,
    allownull: false
  },
  descricao:{
    type: Sequelize.TEXT,
    allownull: false
  }
});

Pergunta.sync({force: false}).then(() => {

});

module.exports = Pergunta;