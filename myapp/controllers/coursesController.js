const Models = require('../models/coursesModel')

async function getCourseById(id){
	return await Models.Course.getById(id);
}

async function getAllCourses(){
	return await Models.Course.getAll();
}

async function addCourse(courseData) {
	return await Models.Course.add(courseData);
}

module.exports = {
	getAllCourses, 
	getCourseById,
	addCourse	
}