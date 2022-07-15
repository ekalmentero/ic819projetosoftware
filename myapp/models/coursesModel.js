import { Sequelize } from 'sequelize';

import db from '../db/db.js';

class Course{

}

const CoursesModel = db.define('course', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  credits: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  
});


export {CoursesModel, Course};