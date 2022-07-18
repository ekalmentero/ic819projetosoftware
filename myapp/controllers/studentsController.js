const Models = require('../models/studentsModel');

async function getStudentById(id){
    const student = await Models.Student.getById(id);
	return student;         	
}

async function getAllStudents(){
	const allStudents = await Models.Student.getAll();
	return allStudents;
}

async function getStudentHistoric(id){
	const studentHistoric = await Models.Student.getHistoric(id);
	return studentHistoric;
}

async function getStudentCR(id){
	const studentCR = await Models.Student.calculateCR(id);
    return studentCR;
}

async function addStudent(studentData) {
	return await Models.Student.add(studentData);
}

async function addCourseToStudentHistoric(id_student, id_course, grade) {
	return await Models.Student.addCourseToStudentHistoric(id_student, id_course, grade);
}

module.exports = {
	getAllStudents, 
	getStudentById,
	addStudent,
	addCourseToStudentHistoric, 
	getStudentHistoric, 
	getStudentCR 
}
