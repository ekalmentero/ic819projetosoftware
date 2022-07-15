import express from 'express'

const student = express.Router();

import StudentsController from '../controllers/studentsController.js'

student.get('/:id', async function(req, res, next) {
    res.send(await StudentsController.getById(req.params.id));
    
})


student.post('/:id_student/course/:id_course/:grade', async function(req, res, next) {
  res.send(await StudentsController.addCourseToStudentHistoric(req.params.id_student, req.params.id_course, req.params.grade ));
 
})

student.get('/:id/cr', async function(req, res, next) {
  res.send(await (await StudentsController.getCR(req.params.id)));
})

student.get('/:id/historic', async function(req, res, next) {
  res.send(await StudentsController.getHistoric(req.params.id));
})

student.route('/')
  .get(async function(req, res, next) {
    res.send(await StudentsController.getAll());
    //res.send("get all students");
  })

  .post(async function(req, res, next) {
    res.send(await StudentsController.add(req.body));
    //res.send("get all students");
  })

  .patch(async function(req, res) {
    res.send("student HTTP patch");
  })
  .delete(async function(req, res) {
    res.send("student HTTP delete");
  })
  ;

export default student;
