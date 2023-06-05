// declarando os regex de validação
  const { useState, useEffect, useRef } = require("react");
// usuario precisa começar com letras e ser seguidos por letras, podendo conter, hifen ou underline.
  const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// Usuário precisa ter senha com letra minuscula, letra maiuscula e de tamanho entre 4 a 10.
  const user_PW = /^(?=.*[a-z](?=.*[A-Z])(?=.*[0-9])).{4,10}/;
// criando agora os estados da função de validação

export default function register() {
 

}; 
