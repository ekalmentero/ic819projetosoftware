import { Sequelize } from 'sequelize';
import {StudentsModel} from './studentsModel.js'
import db from '../db/db.js';

class Class{

}

const ClassStudentModel = db.define('class_students')

const ClassesModel = db.define('class', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  local: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

// mapeando o relacionamento n para n entre estudante e turma

StudentsModel.belongsToMany(ClassesModel, { through: 'class_students' });
ClassesModel.belongsToMany(StudentsModel, { through: 'class_students' });

export {ClassesModel, ClassStudentModel, Class};