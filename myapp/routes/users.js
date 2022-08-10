const express = require ('express');

const user = express.Router();

const usersController = require ('../controllers/usersController');
/*
user.get('/:email', async function(req, res) {
    res.send(await usersController.getUserByEmail(req.params.email));
})
*/
user.get('/validate', async function(req, res) {
    res.send(await usersController.validateUser('t@gmail.com','teste'));
})


user.route('/')
	.get(async function(req, res, next) {
        res.send(await usersController.getAllUsers());
        //res.send("user HTTP get not implemented");
    })

  	.post(async function(req, res, next) {
    	res.send(await usersController.addUser(req.body));
    })

  	.patch(async function(req, res) {
    	res.send("user HTTP patch not implemented");
  	})

  	.delete(async function(req, res) {
    	res.send("user HTTP delete not implemented");
  	})
  

    module.exports = user;

