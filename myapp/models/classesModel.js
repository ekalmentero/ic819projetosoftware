const Sequelize = require ('sequelize'); 
const studentsModel = require ('./studentsModel');
const db = require ('../db/db');


class CourseClass{
	static async add(classData){
		return await classesModel.create({
			code: classData.code,
			local: classData.local,
		});
	}

	static async getById(id){
		return await classesModel.findByPk(id);
    }

	static async getByCode(code){
		return await classesModel.findAll({
			include: ['students'],
					
			where: {
				code: code
			}
		});
	}

	static async getAll(){
		return await classesModel.findAll();
    }

	static async addStudent(id_class, id_student){
		await classStudentModel.create({
			studentId: id_student,
			classId: id_class,
		});
	}
}

const classStudentModel = db.define('class_students')

const classesModel = db.define('class', {
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

studentsModel.studentsSeqModel.belongsToMany(classesModel, { through: 'class_students' });
classesModel.belongsToMany(studentsModel.studentsSeqModel, { through: 'class_students' });

module.exports = {
	classesModel, 
	classStudentModel, 
	CourseClass
}
