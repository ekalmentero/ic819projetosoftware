const Sequelize = require ('sequelize'); 

const db = require ('../db/db');

class Course {
	static async getById(id){
		const course = await courseSeqModel.findByPk(id);
		return course;   
	}

	static async add(courseData){
		return await courseSeqModel.create({
			code: courseData.code,
			name: courseData.name,
			credits: courseData.credits,
		});
	}

	static async getAll(){
		const courses = await courseSeqModel.findAll();
		return courses;
	}
}

const courseSeqModel = db.define('course', {
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

module.exports = {
	courseSeqModel, 
	Course
}

