import express from 'express'

const course = express.Router();

import CoursesController from '../controllers/coursesController.js'

course.get('/:id', async function(req, res, next) {
    res.send(await CoursesController.getById(req.params.id));
    
})

course.route('/')
  .get(async function(req, res, next) {
    res.send(await CoursesController.getAll());
    //res.send("get all students");
  })

  .post(CoursesController.add)
  

  .patch(async function(req, res) {
    res.send("course HTTP patch");
  })
  .delete(async function(req, res) {
    res.send("course HTTP delete");
  })
  ;

export default course;
