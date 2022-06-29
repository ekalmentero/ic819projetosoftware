import express from 'express'

const usersRouter = express();

//import * as StudentsController from '../controllers/studentsController'

/* GET users listing. */

usersRouter
  .get('/users', function(req, res, next) {
    //res.send(StudentsController.getStudents());
    res.send("OK users");
  });

export default usersRouter;