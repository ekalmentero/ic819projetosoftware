const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const {  getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const admin = require("firebase-admin");
const ServiceAccount = require("./projetovet-dor-firebase-adminsdk-jddnl-8f04ade30e.json");

const express = require("express");
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  // databaseURL: "https://projetovet-dor-default-rtdb.firebaseio.com"
});

const database = getFirestore();

// definimos que nossa rota vai usar json
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const PORT = 8080;


// app.post('/create', async (req, res) =>{
//   try {
//       const Jsondata = {
//         name: req.body.name,
//         pass: req.body.pass
//       };
//       console.log(req.body);
//       const userRef = await database.collection('users').doc(Jsondata.name).set(Jsondata);
//       res.send(userRef)
//     } catch (error) {
//       res.send(error);
//   }
// })


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
