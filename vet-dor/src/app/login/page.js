"use client"
import "./Login_Form.css"
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";

const { useRouter } = require('next/navigation');
const { useState, useContext } = require("react");

import DOMPurify from "dompurify";


import { UsuarioContext } from '../../contexts/usuarioContext'
import { userProfilePath, cadastroPath } from '../../helpers/paths';
const validations = require('../validacoes');

// function Login_form ==> verificar onde está criada e onde será utilizada
export default function Login_Form(){
	// Next Router
  const router = useRouter();

  // contexto usuario
  const { cpfUsuario, setCpfUsuario } = useContext(UsuarioContext);

	// criando agora os estados da função de validação
  const [ cpf, setCpf] = useState(null);
  const [ pw, setPw] = useState(null);

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
		console.log("[Login] [handleSubmit]");
		e.preventDefault();

		const objUser = {
			cpf,
			senha: pw,
		}

		// sanitizar
		const cpfLimpo = DOMPurify.sanitize(objUser.cpf);
		const senhaLimpo = DOMPurify.sanitize(objUser.senha);

		// validar
		if(!validations.cpfValidation(cpfLimpo)) {
			window.alert("CPF inválido");
      return;
		}

		if(!validations.passwordValidation(senhaLimpo)) {
			window.alert("Senha Inválida");
      return;
		}

    const userData = {
      cpf: cpfLimpo,
      senha: senhaLimpo
    }
		
		// fetch para o controlador
		const login = async () => {
			console.log(`[login]`);

			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			});

			return response.json();
		}

		login().then((resData) => {
			console.log(`[login.then] resData = ${JSON.stringify(resData)}`);

			if(resData.code !== "OK") {
				console.log(`login.then erro`);
				window.alert(resData.message);
				return;
				
			} else {
        // setar contexto User
        setCpfUsuario(userData.cpf);

        console.log(`ok`);
			}
		});

    setTimeout(() => {
      console.log(`[Login] [setTimeout] context cpfUsuario = ${cpfUsuario}`);
      
      // redirecionar pra profile com o next router
      console.log('[Login] [setTimeout] redirecionar para o perfil');
      router.push(userProfilePath);
    }, 3000);
  }
  return (
  <div className="form_All"> 
  <Header/>
    <h2>Login </h2>

    <div className="form_Flex form login">
      <form>
        <div className="first_div" >
          <label htmlFor="cpf">CPF do Usuário</label>
          <input id="cpf" name="cpf" value={cpf} onChange={(e)=> setCpf(e.target.value)} required placeholder="seu cpf" type="text"/>

          <label htmlFor="password">Senha</label>
          <input id="password" name="password" value={pw} onChange={(e)=> setPw(e.target.value)} required placeholder="sua senha" type="password"/>
        </div>

        <div className="second_div">
          <div className="form_button" >
            <button className="submit_password botao verde normal" onClick={(e)=>{handleSubmit(e)}} className="submit_password" type="submit">ENVIAR </button>
            <a className="link texto button-sign-u" onClick={()=>{router.push(cadastroPath)}}  >Ainda não é cadastrado?</a>
          </div>
        </div>
      </form>
    </div>

    <Footer/>
  </div>
  )
}