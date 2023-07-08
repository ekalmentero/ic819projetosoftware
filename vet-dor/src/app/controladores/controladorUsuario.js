const { database } = require('./../db/db');

async function getUser(req, res) {
	try {
    console.log("[/getUser]");
    const cpf = req.body.cpfLimpo;

    const userRef = database.collection('users').doc(cpf);
    const doc = await userRef.get();
    
    if(doc.exists) {
      console.log(`usuário existe - ${doc.data()}`);
      res.status(200).send({
        code: "OK",
        message: "usuário encontrado",
        result: doc.data(),
      })
    } else {
      console.log("usuário não existe");
      res.status(404).send({
        code: "NOT_FOUND",
        message: "usuário não existe",
        result: null
      })
    }

  } catch (error) {
    console.log(`/getUser error = ${error}`);
  }
}

module.exports = {
	getUser,
}