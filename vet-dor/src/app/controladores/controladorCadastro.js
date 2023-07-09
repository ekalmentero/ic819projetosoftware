// imports
import DOMPurify from "dompurify";
const validations = require('./../validacoes');

// Controlador cadastro que vai receber os dados do nosso front e trata-los, sanitizando e validando nossos dados antes de enviar para o front end.
export default function controladorCadastro(params) {
  console.log('[controladorCadastro]');
  try {
    console.log(`params = ${JSON.stringify(params)}`);
    
    const { nome, cpf, celular, email, senha } = params; 

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

    // funções de validações
    if(!validations.nameValidation(nomeLimpo)) {
      throw new Error("nome inválido");
    }

    if(!validations.cpfValidation(cpfLimpo)) {
      throw new Error("cpf inválido");
    }

    if(!validations.phoneValidation(celularLimpo)) {
      throw new Error("celular inválido");
    }
    
    if(!validations.passwordValidation(senhaLimpo)) {
      throw new Error("senha inválida");
    }

    if(!validations.emailValidation(emailLimpo)) {
      throw new Error("email inválido");
    }

    console.log("[ctrlCad] tudo válido");
    
    // se tudo ok

    const data = {
      nomeLimpo,
      cpfLimpo,
      celularLimpo,
      emailLimpo,
      senhaLimpo
    }

    const postData = async () => {
      console.log("[postData]");

      console.log(`[postData] data = ${JSON.stringify(data)}`);
      
      const response = await fetch("http://localhost:8080/createUser", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      
      return response.json();
    };

    postData().then((data) => {
      console.log(`Usuário cadastrado no banco`);
    });
      
  } catch (error) {
    // tratar o erro
    console.log(`error message = ${error.message}`);
  }
}
