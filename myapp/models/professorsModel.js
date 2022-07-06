import { Sequelize } from 'sequelize';
import db from '../db/db.js';

class Professor{

}

const ProfessorsModel = db.define('professor', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

export {ProfessorsModel, Professor};