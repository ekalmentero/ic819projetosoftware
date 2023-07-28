const { database } = require('./../db/db');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const validations = require('../validacoes');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

async function getUserByCpf(cpf) {
  const userRef = database.collection('users').doc(cpf);
  const doc = await userRef.get();
  
	// se não há um usuário cadastrado com o cpf, retorna false
  if(!doc.exists) {
		console.log('[getUserByCpf] cpf não cadastrado');
    return false;
  }

  // se há um usuário cadastrado com o cpf, retorna os dados do usuário
	console.log(`[getUserByCpf] usuário cadastrado = ${JSON.stringfy(doc.data())}`);
	return doc.data();
}

// /getUser - Rota do backend para resgatar os dados de um usuário do BD
async function getUser(req, res) {
	try {
    console.log("[/getUser]");
    const cpf = req.body.cpf;
    
    // sanitizar cpf
    const cpfLimpo = DOMPurify.sanitize(cpf);

    // validar cpf
    if(!validations.cpfValidation(cpfLimpo)) {
      console.log('[/getUser] cpf inválido');

      res.status(400).send({
        code: "CPF_INVALIDO",
        message: "cpf inválido",
        result: null
      });
      return;
    };

    // se retorna false, o cpf não está cadastrado
    const userResult = await getUserByCpf(cpfLimpo);

    if(!userResult) {
      console.log("usuário não cadastrado");
      res.status(404).send({
        code: "NOT_FOUND",
        message: "usuário não cadastrado",
        result: null
      });
    };
    
    console.log(`usuário encontrado = ${userResult}`);
    res.status(200).send({
      code: "OK",
      message: "usuário encontrado",
      result: userResult
    });

  } catch (error) {
    console.log(`/getUser error = ${error}`);
    res.status(500).send({
      code: "ERRO_INESPERADO",
      message: "Um erro inesperado aconteceu.",
      result: error,
    });
  }
}

// /createUser - rota do backend para criar um usuário no banco de dados
async function createUser(req, res) {
  console.log('[/createUser]');
  try {
    const {
      nome,
      cpf,
      celular,
      email,
      senha
    } = req.body;

    // sanitizar as entradas (backend)
    const nomeLimpo = DOMPurify.sanitize(nome);
    const cpfLimpo = DOMPurify.sanitize(cpf);
    const celularLimpo = DOMPurify.sanitize(celular);
    const emailLimpo = DOMPurify.sanitize(email);
    const senhaLimpo = DOMPurify.sanitize(senha);

    console.log(`nomeLimpo = ${nomeLimpo}`);
    console.log(`cpfLimpo = ${cpfLimpo}`);
    console.log(`celularLimpo = ${celularLimpo}`);
    console.log(`emailLimpo = ${emailLimpo}`);
    console.log(`senhaLimpo = ${senhaLimpo}`);    

    // Validar as entradas (backend)
    if(!validations.nameValidation(nomeLimpo)) {
      console.log('[/createUser] nome inválido');

      res.status(400).send({
        code: "NOME_INVALIDO",
        message: "nome inválido",
        result: null
      });
      return;
    }

    if(!validations.cpfValidation(cpfLimpo)) {
      console.log('[/createUser] cpf inválido');

      res.status(400).send({
        code: "CPF_INVALIDO",
        message: "cpf inválido",
        result: null
      });
      return;
    }
    
    if(!validations.phoneValidation(celularLimpo)) {
      console.log('[/createUser] numero de celular inválido');

      res.status(400).send({
        code: "NUMEROCELULAR_INVALIDO",
        message: "Número de celular inválido",
        result: null
      });
      return;
    }

    if(!validations.emailValidation(emailLimpo)) {
      console.log('[/createUser] email inválido');

      res.status(400).send({
        code: "EMAIL_INVALIDO",
        message: "email inválido",
        result: null
      });
      return;
    }

    if(!validations.passwordValidation(senhaLimpo)) {
      console.log('[/createUser] senha inválida');

      res.status(400).send({
        code: "SENHA_INVALIDA",
        message: "senha inválida",
        result: null
      });
      return;
    }

    console.log('tudo válido');

    // estrutura para salvar no banco de dados
    const dbData = {
      name: nomeLimpo,
      pass: senhaLimpo,
      cpf: cpfLimpo,
      cel: celularLimpo,
      email: emailLimpo
    }
    

    console.log(`[/createUser] dbData = ${dbData}`);

    console.log('criar usuário no bd');

    //! criar o usuário no banco de dados, ou seja faz o contato com o firebase
    const userRef = await database.collection('users').doc(dbData.cpf).set(dbData);

    console.log(`[/createUser] userRef = ${userRef}`);

    console.log('[/createUser] sucesso');

    // retorna para o frontend (Cadastro_Form)
    res.status(200).send({
      code: "OK",
      message: "cadastro bem sucedido",
      result: userRef
    });
  } catch(error) {
    console.log(`/createUser error = ${error}`);
    res.status(500).send({
      code: "ERRO_INESPERADO",
      message: "Um erro inesperado aconteceu.",
      result: error,
    });
  }
}

// async function getProfile(req, res) {
//   try {
//     const cpf = req.params["cpf"];
//     console.log(`getProfile cpf = ${cpf}`);

    // const { cpf } = req.params
    // pegar os dados do usuário pela url com Get
    
//     const userRef = database.collection("users").doc(cpf);
//     const doc = await userRef.get();

//     if (!doc.exists) {
//       res.status(404).send({
//         code: "NOT_FOUND",
//         message: "usuário não existe",
//         message: null,
//       })
//       return;
//     }

//     console.log(`profile ok`);
    
    
//   } catch (error) {
//     console.log(`getProfile error = ${error}`);
//   }
// }

module.exports = {
	getUser,
  createUser,
}