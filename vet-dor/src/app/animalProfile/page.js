"use client"
import "./AniProfile.css";
const Pic = "/assets/Pic.png"
import { MinusCircle } from "react-feather";

const { useRouter } = require('next/navigation');
import { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../../contexts/usuarioContext';
import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";
import { fichaPetPath, LoginPath } from "../../helpers/paths";

export default function AniProfile() {
  const router = useRouter();

  const { cpfUsuario } = useContext(UsuarioContext);
  const [aniInfo, setAniInfo] = useState({});

  useEffect(() => {
    console.log(`cpf =${cpfUsuario}`);

    // se o context não estiver setado, o usuario não está logado: mandar pra LOGIN!
    // if (!cpfUsuario) {
      // alert("usuario não logado");
    //   router.push(LoginPath)
    // }

    const getAni = async () => {
      console.log("[getAni]");
        
      const response = await fetch("http://localhost:8080/getAni", {
        method: "POST",
        body: JSON.stringify({ cpfResponsavel: cpfUsuario }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      
      return response.json();
    };

    getAni().then((resData) => {
      console.log(`[getAni.then] resData = ${JSON.stringify(resData)}`);

      if(resData.code !== "OK") {
        window.alert(resData.message);
        return;
      
      } else {
        console.log("[getAni.then] tudo certo")
        const dbResult = resData.result;
        setAniInfo(dbResult);
      }
    });
  }, []);

  return(
    <div className="page_flex">
      <Header/>
      <div className="AniProfile_flex" >
        <div className="Title_flex" >
          <h1>Perfil do meu PET</h1>
          <MinusCircle/>
        </div>

        <div className="Profile_pic" >
          <img width="150px" src={Pic}/>
          <h2>{aniInfo.name}</h2>
        </div>

        <div className="Profile_data">
          <label htmlFor="age">Idade</label>
          <input id="age" value={aniInfo?.age} name="age" type="text"/>

          <label htmlFor="race">Raça</label>
          <input id="race" value={aniInfo.race} name="race" type="text"/>

          <label htmlFor="sexo">Sexo</label>
          <input id="sexo" value={aniInfo.sexo} name="sexo" type="text"/>

          <label htmlFor="species">Especie</label>
          <input id="species" value={aniInfo.species} name="species" type="text"/>

          <button className="aniConsults" type="button" onClick={()=>{router.push(fichaPetPath)}}>Dados de Consultas</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}