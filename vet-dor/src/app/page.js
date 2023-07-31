"use client"
import React from "react";
const banner = "/assets/home-banner.png";
const img_consultas = "/assets/img-consultas.png";
const img_vacinas = "/assets/img-vacinas.png";
const img_tabela_precos = "/assets/tabela-precos.png";
import "./Home/homepage.css";
import Footer from './components/Footer/Footer'
import Header from "./components/Header/header";

import { cadastroPath, DevsPath } from "../helpers/paths";
import { Activity } from "react-feather";
import { Droplet } from "react-feather";

const { useRouter } = require('next/navigation');
// const { usuarioProvider } = require('../contexts/usuarioContext');

// const usuarioContext = useContext(usuarioProvider);

export default function Home() {

  const router = useRouter();
  
  return (
    <div className="all">
    <Header/>
    <div className="home-banner">
      <img src={banner}></img>
    </div>

    <main className="homepage">
      <div className="content">
        <div className="sobre">
          <section className="section-sobre consultas">
            <div className="texto">
              <div className="titulo">
                <Activity className="icon"/>
                <h2>Consultas</h2>
              </div>
              <div className="descricao">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sem varius, vestibulum felis et, congue purus. Nulla laoreet venenatis eleifend. Nunc vulputate, urna eu rhoncus bibendum, lectus felis laoreet ligula, in imperdiet lorem tellus in felis. Pellentesque sit amet efficitur odio. Donec ornare malesuada diam et elementum.
              </div>
            </div>

            <div className="foto">
              <img className="img-consultas" src={img_consultas}></img>
            </div>
          </section>

          <section className="section-sobre vacinas">
            <div className="foto">
              <img className="img-consultas" src={img_vacinas}></img>
            </div>

            <div className="texto">
              <div className="titulo">
                <Droplet className="icon"/>
                <h2>Vacinas</h2>
              </div>
              <div className="descricao">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sem varius, vestibulum felis et, congue purus. Nulla laoreet venenatis eleifend. Nunc vulputate, urna eu rhoncus bibendum, lectus felis laoreet ligula, in imperdiet lorem tellus in felis. Pellentesque sit amet efficitur odio. Donec ornare malesuada diam et elementum.
              </div>
            </div>
          </section>
        </div>
        

        <section className="section-precos">
          <div className="esquerda">
            <div className="texto">
              <h1> Consulte nossa tabela de preços</h1>
              <h3>Cadastre seu pet e marque uma consulta com a gente!</h3>
            </div>

            <div onClick={()=>{router.push(cadastroPath)}} className="botao-cadastro">
              <a  className="botao verde extra-grande" >Faça seu cadastro</a>
            </div>
          </div>

          <div className="direita">
            <div className="tabela">
              <img className="tabela-precos" src={img_tabela_precos}></img>
            </div>
          </div>
        </section>
      </div>
    </main> 
    <Footer/>
  </div>
  )
}