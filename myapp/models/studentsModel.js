import { Sequelize } from 'sequelize';
import {CoursesModel} from './coursesModel.js'

import db from '../db/db.js';

class Student{

  constructor(name, registration) {
    this.name = name;
    this.registration = registration;
  }

  static calculateCR(id){

  }
}

const HistoricModel = db.define('historic',{
  grade: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
})

const StudentsModel = db.define('student', {
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


// mapeando o relacionamento n para n entre estudante e disciplina

StudentsModel.belongsToMany(CoursesModel, { through: 'historic' });
CoursesModel.belongsToMany(StudentsModel, { through: 'historic' });



export {StudentsModel, HistoricModel, Student};