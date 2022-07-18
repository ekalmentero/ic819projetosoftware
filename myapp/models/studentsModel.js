const Sequelize = require ('sequelize'); 
const coursesModel = require ('./coursesModel');

const db = require ('../db/db');

class Student{

	constructor(name, registration) {
		this.name = name;
		this.registration = registration;
	}

	static async add(studentData) {
		return await studentsSeqModel.create({
			name: studentData.name,
			registration: studentData.registration,
		});
	}

	static async getById(id){
		const student = await studentsSeqModel.findByPk(id);
		return student;         
		
	}

	static async getAll(){
		const students = await studentsSeqModel.findAll();
		return students;
	}

	static async getHistoric(id){
		const studentHistoric = await studentsSeqModel.findAll({
			include: ['courses'],
			where: {
				id: id
			},		
		});
		const studentHistoricJSON = JSON.parse(JSON.stringify(studentHistoric))[0].courses;
		return studentHistoricJSON;
	}
	
	static async addCourseToStudentHistoric(id_student, id_course, grade) {
		return await Models.HistoricModel.create({
			studentId: id_student,
			courseId: id_course,
			grade: grade,
		});
	}

	static async calculateCR(id){
		const studentCourses = await this.getHistoric(id);      
		var somaNotas = 0;
		var somaPesos = 1;
		for (var i=0; i<studentCourses.length; i++) {
			somaNotas += studentCourses[i].historic.grade*studentCourses[i].credits;
			somaPesos += studentCourses[i].credits;
		}
		if (somaNotas!= 0 & somaPesos!= 0){
			//arredonda o cálculo para 2 casas decimais
			var cr = Math.round(((somaNotas/somaPesos) + Number.EPSILON) * 100) / 100;

			// garante que o retorno será uma string
			return ''+cr;
		}
		return 'erro'+0;
 	}
}

const historicModel = db.define('historic',{
	grade: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
})

const studentsSeqModel = db.define('student', {
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

studentsSeqModel.belongsToMany(coursesModel.courseSeqModel, { through: 'historic' });
coursesModel.courseSeqModel.belongsToMany(studentsSeqModel, { through: 'historic' });


module.exports = {
	studentsSeqModel, 
	historicModel, 
	Student
}

