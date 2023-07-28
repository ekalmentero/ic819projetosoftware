  // imports
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { database } = require('./../db/db');

const validations = require('./../validacoes');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

async function fazerLogin(req, res) {
  console.log("[fazerLogin]");
  try {
    const {
      cpf,
      senha
    } = req.body;

    console.log(`cpf = ${cpf}`);
    console.log(`senha = ${senha}`);

    // Sanitizar as entradas  
    const cpfLimpo = DOMPurify.sanitize(cpf);
    const senhaLimpo = DOMPurify.sanitize(senha);
    
    console.log(`[fazerLogin] cpf limpo ${cpfLimpo}`);
    console.log(`[fazerLogin] senha limpo ${senhaLimpo}`);

    // Validar as entradas
    if(!validations.cpfValidation(cpfLimpo)) {
      res.status(400).send({
        code: "CPF_INVALIDO",
        message: "cpf inválido",
        result: null
      });
      return;
    }
    
    if(!validations.passwordValidation(senhaLimpo)) {
      res.status(400).send({
        code: "SENHA_INVALIDA",
        message: "senha inválida",
        result: null
      });
      return;
    }
    
    console.log(`[fazerLogin] tudo válido`);

    // verificar se existe usuário com o cpf no bd
    const userRef = database.collection('users').doc(cpfLimpo);
    const doc = await userRef.get();
   
    //! Verifica se o usuário existe no banco de dados comparando o CPF
    if(!doc.exists) {
      res.status(404).send({   
        code: "NOT_FOUND",
        message: "Não há usuário cadastrado com este cpf",
        result: null
      });
      return;
    };

    console.log(`[fazerLogin] usuário existe - ${JSON.stringify(doc.data())}`);

    const bdUser = doc.data();

    // verificar se a senha está correta
    if (bdUser.pass !== senhaLimpo ) {
      res.status(400).send({
        code: "WRONG_PASSWORD",
        message: "Senha digitada está incorreta",
        result: null
      });
      return;
    };

    res.status(200).send({
      code: "OK",
      message: "login bem sucedido",
      result: bdUser
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
		res.status(500).send({
			code: "INTERNAL_ERROR",
      message: "erro inesperado",
			result: error,
		});
  }
}

module.exports = {
  fazerLogin,
}