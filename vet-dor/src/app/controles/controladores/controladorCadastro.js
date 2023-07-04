// imports
import DOMPurify from "dompurify";

export default function controladorCadastro(params) {
  const { nome, cpf, celular, email, senha } = params; 

  const nomeLimpo = DOMPurify.sanitize(nome);
  const cpfLimpo = DOMPurify.sanitize(cpf);
  const celularLimpo = DOMPurify.sanitize(celular);
  const emailLimpo = DOMPurify.sanitize(email);
  const senhaLimpo = DOMPurify.sanitize(senha);
  
  // validar


  // se tudo ok
  

  const postData = async () => {
    const data = {
      nomeLimpo,
      cpfLimpo,
      celularLimpo,
      emailLimpo,
      senhaLimpo
    } 

    const response = await fetch("/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    
    return response.json();
  };

  postData().then((data) => {
    console.log(data.message);
  });
}

console.log(params);
