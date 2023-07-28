"use client"
import "./Login_Form.css"

const { useRouter } = require('next/navigation');
const { useState, useContext } = require("react");

import DOMPurify from "dompurify";

import { UsuarioContext } from '../../../contexts/usuarioContext'

import { userProfilePath } from '../../../helpers/paths';

// function Login_form ==> verificar onde está criada e onde será utilizada
export default function Login_Form(){
  const { cpfUsuario, setCpfUsuario } = useContext(UsuarioContext);

  const router = useRouter();

  const cpfRegex =  /^[0-9]{0,11}$/;
// Usuário precisa ter senha com letra minuscula, letra maiuscula e de tamanho entre 4 a 10.
  const user_PW = /^[a-zA-Z][a-zA-Z0-9-_]{0,16}$/;

// criando agora os estados da função de validação
  const [ cpf, setCpf] = useState(null);
  const [ pw, setPw] = useState(null);

  // Agora vamos criar uma forma de atualizar os states dos nossos inputs

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    if (id === "cpf") {
      if(cpfRegex.test(value)==true){
        setCpf(value);
      }
    }
    
    if (id === "password") {
      if (user_PW.test(value)== true) {
        setPw(value);  
      }
    }    
  }

  /*
    handleSubmit {
      sanitizar as entradas
      validar as entradas
      criar o objeto objUser = {inputs do usuário}
      fazer o fetch
      (vai pro controlador)
      depois que voltar do controlador, tratar a resposta
    }
  */
  async function handleSubmit(e) {
    try {
      console.log("[handleSubmit]")
      e.preventDefault();

      const objUser = {
        cpf,
        senha: pw,
      }

      // sanitizar
      const cpfLimpo = DOMPurify.sanitize(objUser.cpf);
      const senhaLimpo = DOMPurify.sanitize(objUser.senha);

      // validar
      
      // fetch para o controlador
      const login = async () => {
        console.log(`[login]`);

        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          body: JSON.stringify(objUser),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        });

        console.log(`[login] JSON.stringify(response) = ${JSON.stringify(response)}`);
        console.log(`[login] response = ${response}`);

        return response.json();
      }

      login().then((resData) => {
        console.log(`[login.then] resData = ${JSON.stringify(resData)}`);

        if(resData.code !== "OK") {
          console.log(`login.then erro`);
          window.alert(resData.message);
          return;
          
        } else {
          // Após tudo okay passamos para o componente do perfil do usuário.

          // setar contexto User
          setCpfUsuario(userData.cpf);
          console.log(`[handleSubmit] context cpfUsuario = ${cpfUsuario} `);

          // redirecionar pra profile com o next router
          router.push(userProfilePath);
        }
      });
    } catch (error) {
      console.log("tratar error")
      // tratar o erro
    }
  }
  return (
  <div className="form_All"> 

    <h2>Login </h2>

    <div className="form_Flex">
      <form>
        <div className="first_div" >
          <label for="cpf" >Cpf do Usuário</label>
          <input id="cpf" value={cpf} onChange={(e)=> handleInputChange(e)}  required  name="cpf" placeholder="Seu cpf" type="text"/>

          <label for="password" >Senha</label>
          <input  id="password" name="password" value={pw} onChange={(e)=> handleInputChange(e)} required type="password"/>
        </div>

        <div className="second_div">
          <div className="form_button" >
            <button onClick={(e)=>{handleSubmit(e)}} className="submit_password" type="submit">ENVIAR </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}