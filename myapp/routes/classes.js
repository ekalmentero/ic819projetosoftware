const express = require ('express');

const courseClass = express.Router();

const classesController = require('../controllers/classesController')

courseClass.get('/:id', async function(req, res, next) {
  	res.send(await classesController.getClassById(req.params.id));
})

courseClass.post('/:id_class/student/:id_student', async function(req, res, next) {
  	res.send(await classesController.addStudentToClass(req.params.id_class, req.params.id_student));
})

courseClass.get('/bycode/:class_code', async function(req, res, next) {
  	res.send(await classesController.getClassByCode(req.params.class_code));
})


courseClass.route('/')
	.get(async function(req, res, next) {
    	res.send(await classesController.getAllClasses());
    })
	.post(async function(req, res, next) {
    	res.send(await classesController.addClass(req.body));
  	})
  	.patch(async function(req, res) {
    	res.send("class HTTP patch not implemented");
  	})
  	.delete(async function(req, res) {
		res.send("class HTTP delete not implemented");
  	})
  
module.exports = courseClass;
