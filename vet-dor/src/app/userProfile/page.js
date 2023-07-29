"use client"

import { useContext, useEffect, useState } from "react";

import "./userProfile.css";
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
const Pic = "/assets/Pic.png"

import { UsuarioContext } from "../../contexts/usuarioContext"

export default function userProfile() {
  const { cpfUsuario } = useContext(UsuarioContext);
  const [infoUsuario, setInfoUsuario] = useState({});

  useEffect(() => {
    console.log(`cpf =${cpfUsuario}`);
    
    const getUser = async () => {
      console.log("[getUser]");
        
      const response = await fetch("http://localhost:8080/getUser", {
        method: "POST",
        body: JSON.stringify({ cpf: cpfUsuario }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
        
      return response.json();
    };

    getUser().then((resData) => {
      console.log(`[getUser.then] resData = ${JSON.stringify(resData)}`);

      if(resData.code !== "OK") {
        window.alert(resData.message);
        return;
        
      } else {
        const dbResult = resData.result;

        let aux = {
          name: dbResult.name,
          cpf: dbResult.cpf,
          cel: dbResult.cel,
          email: dbResult.email
        }

        setInfoUsuario(aux);
      }
    });
  }, []);

  return (
    <div className="page_flex">
      <Header/> 
       
      
      <div className="UserProfile_flex" >
      
      <div className="Title_flex" >
       <h1>Perfil de usuário</h1>
        </div>

    <div className="Flex" >
        <div className="first_div" >    
          <label for="name">Nome</label>
            <input readOnly  id="name" value={infoUsuario?.name} name="name" placeholder="Seu nome" type="text"/>

            <label for="cpf">CPF</label>
            <input readOnly id="cpf" value={infoUsuario?.cpf} name="cpf" placeholder="Seu cpf" type="text"/>
        </div>
        <div className="second_div">
            <label for="celular">Número de celular</label>
              <input readOnly  id="celular" value={infoUsuario?.cel} name="celular" placeholder="Seu número de celular" type="text"/>

            <label for="email">Email</label>
            <input  readOnly id="email" value={infoUsuario?.email} name="email" placeholder="Seu email" type="text"/>
            
            <button className="submit_trad" type="submit">Perfil do Animal</button>
        </div>
      </div>
    </div>

    <Footer/>
    </div>
  );
}