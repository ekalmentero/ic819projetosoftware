// Rotas do Usuário

const { getFirestore } = require('firebase-admin/firestore');
const express = require('express');

const database = getFirestore();
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    console.log(req.body);

    const jsonData = {
      name: req.body.nomeLimpo,
      pass: req.body.senhaLimpo,
      cpf: req.body.cpfLimpo,
      cel: req.body.celularLimpo,
      email: req.body.emailLimpo
    }

    const userRef = await database.collection('users').doc(jsonData.name).set(jsonData);

    console.log(`userRef = ${userRef}`);
    res.send(userRef)
  } catch (error) {
    res.send(error);
  }
});

router.get('/getOne', async (req, res) => {

}); 

module.exports = router;