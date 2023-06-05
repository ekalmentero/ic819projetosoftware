"use client"
import "./Cadastro_Form.css"
import register from "../../controles/Register.js"
import { useState } from "react";


export default function Cadastro_Form(){
  const {useState} = require("react");

// usuario precisa começar com letras e ser seguidos por letras, podendo conter, hifen ou underline.
  const user_regex = /^[a-zA-Z][a-zA-Z0-9-_ ]{0,16}$/;
// Usuário precisa ter senha com letra minuscula, letra maiuscula e de tamanho entre 4 a 10.
  const user_PW = /^[a-zA-Z][a-zA-Z0-9-_]{0,16}$/;
// criando agora os estados da função de validação

  // states do nome do usuário
  const [ userName, setUserName] = useState(null);
  const [ pw, setPw] = useState(null);
  const [ cpf, setCpf] = useState(null);
  const [number, setNumber] =useState(null)
  const [birthDate, setBirthDate] =useState(null)
  const [email, setEmail] =useState(null)

    // Agora vamos criar uma forma de atualizar os states dos nossos inputs

    const handleInputChange = (e) => {
      const {id, value} = e.target;
      if (id === "name") {
        if(user_regex.test(value)==true){
          setUserName(value);
        }
          
      }
      if (id === "cpf") {
        setCpf(value);
      }
      if (id === "dataNasc") {
        setBirthDate(value);
      }
      if (id === 'cell') {
        setNumber(value);
      }
      if (id === "mail") {
        setEmail(value);
      }
      if (id === "password") {
        if (user_PW.test(value)== true) {
          setPw(value);  
        }
        
      }    
    }

    console.log(userName,cpf,email,pw,number);

  return(

  <div className="form_All" >

  <h2>Cadastre-se e comece a cuidar dos seus pets </h2>

  <div className="form_Flex">
  <form>
    <div className="first_div" >
      <label for="name" >Nome Completo</label>
      <input id="name" value={userName} onChange={(e)=> handleInputChange(e)}  required  name="name" placeholder="Seu nome" type="text"/>

      <label for="cpf" >CPF (somente números) </label>
      <input id="cpf" name="cpf" value={cpf} onChange={(e)=> handleInputChange(e)} required  placeholder="XXX-XXX-XXX-XX" type="number"/>

      <label for="dataNasc" >Data de nascimento </label>
      <input  id="dataNasc" name="dataNasc" value={birthDate} onChange={(e)=> handleInputChange(e)} required placeholder="DD/MM/AAAA" type="date"/>

      <label for="cell" >Celular (somente números)</label>
      <input id="cell" name="cell" value={number} onChange={(e)=> handleInputChange(e)} required  placeholder="(XX)XXXXX-XXXX " type="number"/>
    </div>

    <div className="second_div">
      <label for="mail" >E-mail</label>
      <input id="mail" name="mail" value={email} onChange={(e)=> handleInputChange(e)} required placeholder="email@exemplo.com" type="email"/>

      <label for="password" >Senha</label>
      <input  id="password" name="password" value={pw} onChange={(e)=> handleInputChange(e)} required type="password"/>

      <label for="repassword" >Repita a senha</label>
      <input id="repassword" name="repassword" onChange={(e)=> handleInputChange(e)} required type="password"/>

      <div className="form_button" >
        <button className="submit_google" type="submit">CADASTRAR COM GOOGLE </button>
        <button className="submit_trad" type="submit"> CADASTRAR </button>
      </div>

    </div>
  </form>
   
    </div>
  </div>
  )
}