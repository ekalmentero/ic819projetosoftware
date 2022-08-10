const express = require ('express');
const bodyParser = require('body-parser');

//Dependências para autenticação
const passport = require('passport');
const session = require('express-session')
const LocalStrategy = require('passport-local');

// ---------- exemplo uso de sessão
const cookieParser = require("cookie-parser");
const maxAge = 1000 * 60 * 60 * 24; // um dia
//-----------

const app = express()

// ---------- exemplo uso de sessão
app.use(cookieParser());
const myusername = 'Eduardo'
const mypassword = 'senha'
var mySession;
//-----------

app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

app.use(session({
    secret: "fdasjkhfjkadshfjkhdasjkfhjaksdf",
    saveUninitialized:true,
    cookie: { maxAge: maxAge },
    resave: false
}))

app.use(passport.initialize()) // init passport on every route call.
app.use(passport.session()) // allow passport to use "express-session". 
app.use(passport.authenticate('session'));  

//const utilsAuth = require('./utils/auth');

// ---------- exemplo uso de sessão
app.get('/mylogin', function(req, res) {
	mySession=req.session;
	console.log(mySession);
    if(mySession.username){
        res.send("Bem-vindo "+mySession.username+"! Você já está autenticado.<a href=\'/logout'>Clique para fazer o logout</a>");
    }else
		res.send("Usuário não autenticado");

});

app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.post('/dologin',  function(req, res){
	if(req.body.username == myusername && req.body.password == mypassword){
        mySession=req.session;
        mySession.username=req.body.username;
        console.log(req.session)
        res.send("Bem-vindo "+mySession.username+" <a href=\'/logout'>Clique para fazer o logout</a>");
    }
    else{
        res.send('Nome de usuário e/ou senha inválido(s)');
    }
})
// ----------

app.get("/loginpassport", function(req, res, next) {
	res.render('loginpassport');
});

app.post("/loginpassport/password", function(req, res, next) {
	res.send("blá");

});

/*	
app.get("/loginpassport",
	passport.authenticate('local', { 
		failureRedirect: 'login.html', 
		failureMessage: true,
		successRedirect: 'index.html'  		
	}));
*/

const  student = require ('./routes/students');
const  user = require ('./routes/users');
const courseClass = require ('./routes/classes');
const  course = require ('./routes/courses');

const  auth = require ('./routes/auth');

//import userRouter from './routes/users.js'

const routes = require('./routes/index');
const db = require('./db/db');


routes.use('/student', student);
routes.use('/user', user);
routes.use('/class', courseClass);
routes.use('/course', course);

routes.use('/auth', auth);

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

//Exemplo pug
app.set('views', './views/templates');
app.set('view engine', 'pug');

app.get('/exemplopug', async function(req, res) {
	res.render('exemploTemplate', { title: 'Exemplo de Template', message: 'Este é um exemplo de renderização de template pug' })
})

//Permite acesso estático aos recursos da camada de visão dentro da pasta views
app.use(express.static('views'));


// sincronizando Sequelize
db.sync(() => console.log('Banco de dados conectado: ${process.env.DB_NAME}'));

app.listen(3000, function() {
	console.log("MYAPP : INICIADO NA PORTA 3000");
})