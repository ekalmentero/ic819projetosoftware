// import react from "react";

const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");


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
  Raca:{
    type: DataTypes.STRING,
    allowNull: false
  },
  Sexo:{
    type: DataTypes.STRING,
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

  FotoAni:{
    type: DataTypes.BLOB("long"),
    allowNull: true,
  }
}) 

const Ani = AniPend.build({Nome: "Cravinho Rizzo Cravo"});

console.log(Ani instanceof AniPend);
console.log(Ani.Nome);
