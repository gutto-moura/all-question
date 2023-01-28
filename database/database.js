const Sequelize = require("sequelize");

const connection = new Sequelize('all_question', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;