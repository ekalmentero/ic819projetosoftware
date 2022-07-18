const Sequelize = require ('sequelize'); 

const dbName = 'ic819ps'; // passar os dados do .env para as constantes
const dbUser = 'root';
const dbHost = 'localhost';
const dbPassword = '';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: "mysql", 
  	host: dbHost, 
});

module.exports = sequelize;



/*
Criar arquivo de configuração no futuro
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "ic819ps",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  */