const {Sequelize} = require('sequelize');

// require("dotenv").config();

const sequelize = new Sequelize("vetDor", "root", "2103", {
  host: "localhost",
  dialect: "mariadb",
  port: 3306,
  define:{
    timestamps: false
  }
});

try {
  sequelize.authenticate();
  console.log("coneção estabelecida");
} catch (error) {
  console.error("Não foi possível estabelecer conexão", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db


db.AniPend = require("./AniPend.js")(sequelize, Sequelize);
