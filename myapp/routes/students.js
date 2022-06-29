import express from 'express'

const studentRouter = express();

import StudentsController from '../controllers/studentsController.js'


studentRouter
  .get('/students', function(req, res, next) {
    res.send(StudentsController.getStudents());
    //res.send("OK students");
  });

export default studentRouter;
