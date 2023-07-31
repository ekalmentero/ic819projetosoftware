"use client"
import "./Cadastro_Form.css"
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";

const { useRouter } = require('next/navigation');
import { useState, useContext } from "react";

import DOMPurify from "dompurify";

import { UsuarioContext } from '../../contexts/usuarioContext'

const validations = require('../validacoes');
import { userProfilePath } from '../../helpers/paths';

export default function Cadastro_Form() {
  // Next Router
  const router = useRouter();

  // contexto usuario
  const { cpfUsuario, setCpfUsuario } = useContext(UsuarioContext);

  // states do usuário
  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");
  const [cpf, setCpf] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  // Aqui chamamos o controlador cadastro que é nosso middleware antes de passarmos nossos dados para as rotas
  const handleSubmit = (e)=> {
    console.log('[handleSubmit]');

    e.preventDefault();

    //! sanitizar as entradas
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

    //! validar as entradas
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

    console.log('fetch para /createUser');

    const postData = async () => {
      console.log("[postData]");

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
        // Após tudo okay passamos para o componente do perfil do usuário.
        
        // setar contexto UserOl123asdas
        setCpfUsuario(userData.cpf);
      }
    });
            
    setTimeout(() => {
      console.log(`[novoUsuario][setTimeout] context cpfUsuario = ${cpfUsuario}`);
      
      // redirecionar pra profile com o next router
      console.log('[novoUsuario][setTimeout] redirecionar para o perfil');
      router.push(userProfilePath);
    }, 3000);
  }
  
  return(
    <div className="form_All" >
      <Header/>
      <h2>Cadastre-se e comece a cuidar dos seus pets </h2>
      <div className="form_Flex">
      <div class="campos">
          <div className="first_div" >
            <label htmlFor="name" >Nome Completo</label>
            <input id="name" name="name" value={userName} onChange={(e)=> setUserName(e.target.value)}  required  placeholder="Seu nome" type="text"/>

            <label htmlFor="cpf" >CPF (somente números) </label>
            <input id="cpf" name="cpf" value={cpf} onChange={(e)=> setCpf(e.target.value)} required  placeholder="XXX-XXX-XXX-XX" type="number"/>

            <label htmlFor="dataNasc" >Data de nascimento </label>
            <input  id="dataNasc" name="dataNasc" value={birthDate} onChange={(e)=> setBirthDate(e.target.value)}  placeholder="DD/MM/AAAA" type="date"/>

            <label htmlFor="phoneNumber" >Celular (somente números)</label>
            <input id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} required  placeholder="(XX)XXXXX-XXXX " type="number"/>
          </div>

        <div className="second_div">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder="email@exemplo.com" type="email"/>

          <label htmlFor="password" >Senha</label>
          <input  id="password" name="password" value={pw} onChange={(e)=> setPw(e.target.value)} required type="password"/>

          <div className="form_button cadastro" >
            <button className="submit_google" type="submit">CADASTRAR COM GOOGLE </button>
            <button onClick={(e) => { handleSubmit (e) }} className="submit_trad"> CADASTRAR </button>
          </div>
        </div>  

        </div>
      </div>
      <Footer/>
    </div>
  )
}