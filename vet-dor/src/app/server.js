require('./db/db');

const express = require("express");
const cors = require('cors');

const controladorUsuario = require('./controladores/controladorUsuario');
const controladorLogin = require('./controladores/controladorLogin');

const app = express();
const PORT = 8080;

// definimos que nossa rota vai usar json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// // rota criar usuário
// app.post('/createUser', async (req, res) =>{
//   console.log("[/createUser]");
//   console.log(`req.body = ${JSON.stringify(req.body)}`);
//   try {
//     const jsonData = {
//       name: req.body.nomeLimpo,
//       pass: req.body.senhaLimpo,
//       cpf: req.body.cpfLimpo,
//       cel: req.body.celularLimpo,
//       email: req.body.emailLimpo
//     };

//     const cpf = jsonData.cpf;

//     const userRef = await database.collection('users').doc(cpf).set(jsonData);
//     console.log(`userRef = ${JSON.stringify(userRef)}`);
//     res.send(userRef);

//   } catch (error) {
//     console.log(`/createUser error = ${error}`);
//     res.send(error);
//   }
// })

// rota pegar dados de um usuário, utilizando o CPF como chave 
app.post('/getUser', controladorUsuario.getUser);
app.post('/login', controladorLogin.fazerLogin)



app.listen(PORT, ()=>{
  console.log(`server rodando na porta ${PORT}`);
})
