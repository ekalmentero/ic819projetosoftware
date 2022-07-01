import express from 'express'

const student = express.Router();

import StudentsController from '../controllers/studentsController.js'

student.get('/:id', async function(req, res, next) {
    res.send(await StudentsController.getById(req.params.id));
})


student.route('/')
  .get(async function(req, res, next) {
    res.send(await StudentsController.getAll());
    //res.send("get all students");
  })

  .post(StudentsController.add)
  

  .patch(async function(req, res) {
    res.send("student HTTP patch");
  })
  .delete(async function(req, res) {
    res.send("student HTTP delete");
  })
  ;

export default student;
