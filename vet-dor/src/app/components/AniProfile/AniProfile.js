"use client"
import { MinusCircle } from "react-feather";
import "./AniProfile.css";
const Pic = "/assets/Pic.png"
import Header from "../Header/header";
import Footer from "../Footer/Footer";

import { UsuarioContext } from '../../../contexts/usuarioContext';
import { useContext } from "react";

export default function AniProfile() {
  const { cpfUsuario, setCpfUsuario } = useContext(UsuarioContext);

  return(
    <div className="page_flex">
      <Header/>
      <div className="AniProfile_flex" >
        <div className="Title_flex" >
          <h1>Perfil do meu PET</h1>
          <MinusCircle/>
        </div>

      <div class="foto-botao">
        <div className="Profile_pic" >
          <img width="150px" src={Pic}/>
          <h2>Caramelinho</h2>
        </div>
        <a className="submit_trad botao verde normal" href=""> Dados de Consultas </a>
      </div>

      <div className="Profile_data">
        <div class="first_div">
          <label className="labelIdade" for="name" >Idade</label>
          <input readOnly  id="name" value="5 anos" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Data de Nascimento</label>
          <input readOnly  id="name" value="20/03/2018" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Raça</label>
          <input readOnly  id="name" value="Vira-lata Caramelo" name="name" placeholder="Seu nome" type="text"/>
        </div>

        <div class="second_div">
          <label className="labelSexo" for="name" >Sexo</label>
          <input readOnly  id="name" value="Macho" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Nome do Responsável</label>
          <input readOnly  id="name" value="Marcos Castro" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Especie</label>
          <input readOnly  id="name" value="Cachorro" name="name" placeholder="Seu nome" type="text"/>

          {/* <button className="submit_trad" type="submit"> Dados de Consultas </button> */}
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}