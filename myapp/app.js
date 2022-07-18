const express = require ('express');
const bodyParser = require('body-parser');

const app = express()


app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

const  student = require ('./routes/students');
const courseClass = require ('./routes/classes');
const  course = require ('./routes/courses');

//import userRouter from './routes/users.js'

const routes = require('./routes/index');
const db = require('./db/db');


routes.use('/student', student);
routes.use('/class', courseClass);
routes.use('/course', course);

app.use(routes);


// teste de funções síncronas/assíncronas
/*
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getATime(){
	var test = "valor inicial";
  	await timeout(3000);
  	var test = "valor alterado";
  	return test;
}

function getSTime(){
  	var test = "valor inicial";
  	setTimeout(function(){
    	test = "valor alterado";
  	}, 2000);
  	return test;
}

app.get('/assinc', async function(req, res) {
  	res.send(await getATime());
})

app.get('/sinc', function(req, res) {  
  	res.send(getSTime());
})
*/

// sincronizando Sequelize
db.sync(() => console.log('Banco de dados conectado: ${process.env.DB_NAME}'));

app.listen(3000, function() {
	console.log("MYAPP : INICIADO NA PORTA 3000");
})