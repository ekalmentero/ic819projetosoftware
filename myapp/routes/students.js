const express = require ('express');

const student = express.Router();

const studentsController = require ('../controllers/studentsController');

student.get('/:id', async function(req, res, next) {
	res.send(await studentsController.getStudentById(req.params.id));
    
})

student.post('/:id_student/course/:id_course/:grade', async function(req, res, next) {
	res.send(await studentsController.addCourseToStudentHistoric(req.params.id_student, req.params.id_course, req.params.grade ));
 
})

student.get('/:id/cr', async function(req, res, next) {
	res.send(await studentsController.getStudentCR(req.params.id));
})

student.get('/:id/historic', async function(req, res, next) {
	res.send(await studentsController.getStudentHistoric(req.params.id));
})

student.route('/')
	.get(async function(req, res, next) {
    	res.send(await studentsController.getAllStudents());
    	
  	})

  	.post(async function(req, res, next) {
    	res.send(await studentsController.addStudent(req.body));
    	
  	})

  	.patch(async function(req, res) {
    	res.send("student HTTP patch not implemented");
  	})

  	.delete(async function(req, res) {
    	res.send("student HTTP delete not implemented");
  	})
  
  module.exports = student;
