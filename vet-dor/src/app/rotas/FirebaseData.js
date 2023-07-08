const admin = require("firebase-admin");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const ServiceAccount = require("./projetovet-dor-firebase-adminsdk-jddnl-8f04ade30e.json");
const cors = require('cors')

const controladorUsuario = require('../controladores/controladorUsuario');

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  // databaseURL: "https://projetovet-dor-default-rtdb.firebaseio.com"
});

const express = require("express");
const app = express();

const database = getFirestore();

// definimos que nossa rota vai usar json
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const PORT = 8080;

// rota criar usuário
app.post('/createUser', async (req, res) =>{
  console.log("[/createUser]");
  console.log(`req.body = ${JSON.stringify(req.body)}`);
  try {
    const jsonData = {
      name: req.body.nomeLimpo,
      pass: req.body.senhaLimpo,
      cpf: req.body.cpfLimpo,
      cel: req.body.celularLimpo,
      email: req.body.emailLimpo
    };

    const cpf = jsonData.cpf;

    const userRef = await database.collection('users').doc(cpf).set(jsonData);
    console.log(`userRef = ${JSON.stringify(userRef)}`);
    res.send(userRef);

  } catch (error) {
    console.log(`/createUser error = ${error}`);
    res.send(error);
  }
})

// rota pegar dados de um usuário, utilizando o CPF como chave 
app.post('/getUser', controladorUsuario.getUser);


// app.get('/user', (req,res)=>{
//   admin.firestore().collection('users').get().then(snapshot =>{
//     const data = snapshot.docs.map(doc=>({
//       ...doc.data(),
//       uid: doc.id
//     }))
//     res.json(data);
//   })
// });


app.listen(PORT, ()=>{
  console.log(`server rodando na porta ${PORT}`);
})
