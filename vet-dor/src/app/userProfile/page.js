"use client"

import { useContext, useEffect, useState } from "react";

import "./userProfile.css";
const Pic = "/assets/Pic.png"

import { UsuarioContext } from "../../contexts/usuarioContext"

export default function userProfile() {
  const { cpfUsuario } = useContext(UsuarioContext);
  const [infoUsuario, setInfoUsuario] = useState({});
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      console.log("[getUser]");
        
      const response = await fetch("http://localhost:8080/getUser", {
        method: "POST",
        body: JSON.stringify({ cpfUsuario }),
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
    
    setTimeout(() => {
      console.log(`1 infoUsuario = ${JSON.stringify(infoUsuario)}`);
      console.log("[useEffect] ok");
    }, 3000)
  });

  console.log(`2 infoUsuario = ${JSON.stringify(infoUsuario)}`);

  return (
    <div className="page_flex">
      <div className="UserProfile_flex" >
        <div className="Title_flex" >
          <h1>Perfil de usuário</h1>
        </div>

        <div className="Profile_data">
        <label for="name">Nome</label>
          <input contentEditable={editProfile} id="name" value={infoUsuario?.name} name="name" placeholder="Seu nome" type="text"/>

          <label for="cpf">CPF</label>
          <input contentEditable={editProfile} id="cpf" value={infoUsuario?.cpf} name="cpf" placeholder="Seu cpf" type="text"/>

          <label for="celular">Número de celular</label>
            <input contentEditable={editProfile} id="celular" value={infoUsuario?.cel} name="celular" placeholder="Seu número de celular" type="text"/>

          <label for="email">Email</label>
          <input contentEditable={editProfile} id="email" value={infoUsuario?.email} name="email" placeholder="Seu email" type="text"/>
          
          <button className="submit_trad" type="submit" disabled={!editProfile}>Perfil do Animal</button>
        </div>
      </div>
    </div>
  );
}