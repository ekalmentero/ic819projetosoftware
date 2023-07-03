// Rotas do Usuário
const express = require("express");
const app = express();

const { getFirestore } = require('firebase-admin/firestore'); 
const database = getFirestore();


app.post('/create', async (req, res) =>{
  try {
      const Jsondata = {
        name: req.body.name,
        pass: req.body.pass
      };
      console.log(req.body);
      const userRef = await database.collection('users').doc(Jsondata.name).set(Jsondata);
      res.send(userRef)
    } catch (error) {
      res.send(error);
  }
})

app.get('/user', (req,res)=>{
  admin.firestore().collection('users').get().then(snapshot =>{
    const data = snapshot.docs.map(doc=>({
      ...doc.data(),
      uid: doc.id
    }))
    res.json(data);
  })
});


export default app;