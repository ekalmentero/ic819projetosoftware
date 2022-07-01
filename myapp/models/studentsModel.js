import { Sequelize } from "sequelize";
import db from "../db/db.js";

export default db.define("student", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  registration: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});