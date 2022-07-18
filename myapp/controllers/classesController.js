const Models = require('../models/classesModel')

async function getClassById(id){
    return await Models.CourseClass.getById(id);       
}

async function getClassByCode(classCode){
    return await Models.CourseClass.getByCode(classCode);          
}

async function getAllClasses(){
    return await Models.CourseClass.getAll();
}

async function addClass(classData) {
    return await Models.CourseClass.add(classData);
}

async function addStudentToClass(id_class, id_student) {
    return await Models.CourseClass.addStudent(id_class, id_student);
}

module.exports = {
	getClassById, 
	getClassByCode, 
	getAllClasses,
    addClass,
    addStudentToClass
}
