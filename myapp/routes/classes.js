import express from 'express'

const routeClass = express.Router();


import ClassesController from '../controllers/classesController.js'

routeClass.get('/:id', async function(req, res, next) {
  res.send(await ClassesController.getById(req.params.id));
})


routeClass.post('/:id_class/student/:id_student', async function(req, res, next) {
  res.send(await ClassesController.addStudent(req.params.id_class, req.params.id_student));
})

routeClass.get('/bycode/:class_code', async function(req, res, next) {
  res.send(await ClassesController.getByCode(req.params.class_code));
})


routeClass.route('/')
  .get(async function(req, res, next) {
    res.send(await ClassesController.getAll());
    //res.send("get all students");
  })

  //todo
  .post(async function(req, res, next) {
    res.send(await ClassesController.add(req.body));
    //res.send("get all students");
  })
  
   .patch(async function(req, res) {
    res.send("class HTTP patch");
  })
  .delete(async function(req, res) {
    res.send("class HTTP delete");
  })
  ;

export default routeClass;
