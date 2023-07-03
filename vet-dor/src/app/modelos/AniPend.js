// import react from "react";

const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, Sequelize) => {
  const AniPend = sequelize.define("AniPend", {
    idAni:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nome :{
      type: DataTypes.STRING,
      allowNull: false
    },
    Idade:{
      type: DataTypes.NUMBER,
      allowNull: true
    },
    Raça:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Sexo:{
      type: DataTypes.ENUM("Macho", "Fêmea"),
      allowNull: false
    },
    Responsavel:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Especie:{
      type: DataTypes.ENUM("GATO", "Cachorro"),
      allowNull: false
    },

    Foto:{
      type: DataTypes.BLOB("long"),
      allowNull: true,
    }
  }) 

  return AniPend;
};

