"use client"
import "./Cadastro_Form.css"

const { useRouter } = require('next/navigation');
import { useState, useContext } from "react";

import DOMPurify from "dompurify";

// imports referentes a implementação do firebase
import { getDatabase } from "@firebase/database";
import { database } from "@/app/controles/Firebase";

import { UsuarioContext } from '../../../contexts/usuarioContext'

const validations = require('./../../validacoes');
import { userProfilePath } from '../../../helpers/paths';

export default function Cadastro_Form() {
  // Next Router
  const router = useRouter();

  // states do usuário
  const [userName, setUserName] = useState(null);
  const [pw, setPw] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [birthDate, setBirthDate] = useState(null)
  const [email, setEmail] = useState(null)

  // Aqui chamamos o controlador cadastro que é nosso middleware antes de passarmos nossos dados para as rotas
  const handleSubmit = (e)=> {
    /*
      sanitizar as entradas
      validar as entradas
      criar objeto com as infrormações do usuário
      fetch para /createUser
    */
    console.log('[handleSubmit]');

    e.preventDefault();

    // sanitizar as entradas
    const nomeLimpo = DOMPurify.sanitize(userName);
    const cpfLimpo = DOMPurify.sanitize(cpf);
    const celularLimpo = DOMPurify.sanitize(phoneNumber);
    const emailLimpo = DOMPurify.sanitize(email);
    const senhaLimpo = DOMPurify.sanitize(pw);

    console.log(`nomeLimpo = ${nomeLimpo}`);
    console.log(`cpfLimpo = ${cpfLimpo}`);
    console.log(`celularLimpo = ${celularLimpo}`);
    console.log(`emailLimpo = ${emailLimpo}`);
    console.log(`senhaLimpo = ${senhaLimpo}`);

    // validar as entradas
    if(!validations.nameValidation(nomeLimpo)) {
      window.alert("Nome Inválido");
    }

    if(!validations.cpfValidation(cpfLimpo)) {
      window.alert("CPF inválido");
    }
    
    if(!validations.phoneValidation(celularLimpo)) {
      window.alert("Número de celular Inválido");
    }

    if(!validations.emailValidation(emailLimpo)) {
      window.alert("Email Inválido");
    }

    if(!validations.passwordValidation(senhaLimpo)) {
      window.alert("Senha Inválida");
    }

    console.log('tudo válido');

    const userData = {
      nome: nomeLimpo,
      cpf: cpfLimpo,
      celular: celularLimpo,
      email: emailLimpo,
      senha: senhaLimpo
    };

    const postData = async () => {
      console.log("[postData] fetch para /createUser");

      console.log(`[postData] userData = ${JSON.stringify(userData)}`);
        
      const response = await fetch("http://localhost:8080/createUser", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
        
      return response.json();
    };

    postData().then((resData) => {
      console.log(`[postData.then] resData = ${resData}`);

      if(resData.code !== "OK") {
        window.alert(resData.message);
        return;
      } else {
        console.log('[handleSubmit] redirecionar para o perfil');
        // Após tudo okay passamos para o componente do perfil do usuário.

        // setar contexto User
        const { cpfUsuario, setCpfUsuario } = useContext(UsuarioContext);
        setCpfUsuario(userData.cpf);
        console.log(`[handleSubmit] context cpfUsuario = ${cpfUsuario} `);
          
        // redirecionar pra profile com o next router
        router.push(userProfilePath);
      }
    });
  }
  
  return(
    <div className="form_All" >
      <h2>Cadastre-se e comece a cuidar dos seus pets </h2>

      <div className="form_Flex">
        <form action="/create" method="POST" >
          <div className="first_div" >
            <label for="name" >Nome Completo</label>
            <input id="name" name="name" value={userName} onChange={(e)=> setUserName(e.target.value)}  required  placeholder="Seu nome" type="text"/>

            <label for="cpf" >CPF (somente números) </label>
            <input id="cpf" name="cpf" value={cpf} onChange={(e)=> setCpf(e.target.value)} required  placeholder="XXX-XXX-XXX-XX" type="number"/>

            <label for="dataNasc" >Data de nascimento </label>
            <input  id="dataNasc" name="dataNasc" value={birthDate} onChange={(e)=> setBirthDate(e.target.value)}  placeholder="DD/MM/AAAA" type="date"/>

            <label for="phoneNumber" >Celular (somente números)</label>
            <input id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} required  placeholder="(XX)XXXXX-XXXX " type="number"/>
          </div>

          <div className="second_div">
            <label for="email" >E-mail</label>
            <input id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder="email@exemplo.com" type="email"/>

            <label for="password" >Senha</label>
            <input  id="password" name="password" value={pw} onChange={(e)=> setPw(e.target.value)} required type="password"/>

            <div className="form_button" >
              <button className="submit_google" type="submit">CADASTRAR COM GOOGLE </button>
              <button onClick={(e) => { handleSubmit (e) }} className="submit_trad"> CADASTRAR </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}