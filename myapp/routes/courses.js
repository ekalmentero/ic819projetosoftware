const express = require ('express');

const coursesController = require ('../controllers/coursesController');

const course = express.Router();


course.get('/:id', async function(req, res, next) {
    res.send(await coursesController.getCourseById(req.params.id));
    
})

course.route('/')
	.get(async function(req, res, next) {
		res.send(await coursesController.getAllCourses());
	})
	.post(async function(req, res, next) {
		res.send(await coursesController.addCourse(req.body));
	})
	.patch(async function(req, res) {
		res.send("course HTTP patch not implemented");
	})
	.delete(async function(req, res) {
		res.send("course HTTP delete not implemented");
	})

module.exports = course;