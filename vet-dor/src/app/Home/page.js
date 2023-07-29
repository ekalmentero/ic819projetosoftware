import React from "react";
const banner = "/assets/home-banner.png";
const img_consultas = "/assets/img-consultas.png";
const img_vacinas = "/assets/img-vacinas.png";
const img_tabela_precos = "/assets/tabela-precos.png";
import "./homepage.css";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/header";

import { Activity } from "react-feather";
import { Droplet } from "react-feather";

export default function Home() {
  return(
    <div class="all">
      <Header/>
      <div class="home-banner">
        <img src={banner}></img>
      </div>

      <main class="homepage">
        <div class="content">
          <div class="sobre">
            <section class="section-sobre consultas">
              <div class="texto">
                <div class="titulo">
                  <Activity class="icon"/>
                  <h2>Consultas</h2>
                </div>
                <div class="descricao">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sem varius, vestibulum felis et, congue purus. Nulla laoreet venenatis eleifend. Nunc vulputate, urna eu rhoncus bibendum, lectus felis laoreet ligula, in imperdiet lorem tellus in felis. Pellentesque sit amet efficitur odio. Donec ornare malesuada diam et elementum.
                </div>
              </div>

              <div class="foto">
                <img class="img-consultas" src={img_consultas}></img>
              </div>
            </section>

            <section class="section-sobre vacinas">
              <div class="foto">
                <img class="img-consultas" src={img_vacinas}></img>
              </div>

              <div class="texto">
                <div class="titulo">
                  <Droplet class="icon"/>
                  <h2>Vacinas</h2>
                </div>
                <div class="descricao">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et sem varius, vestibulum felis et, congue purus. Nulla laoreet venenatis eleifend. Nunc vulputate, urna eu rhoncus bibendum, lectus felis laoreet ligula, in imperdiet lorem tellus in felis. Pellentesque sit amet efficitur odio. Donec ornare malesuada diam et elementum.
                </div>
              </div>
            </section>
          </div>
          

          <section class="section-precos">
            <div class="esquerda">
              <div class="texto">
                <h1> Consulte nossa tabela de preços</h1>
                <h3>Cadastre seu pet e marque uma consulta com a gente!</h3>
              </div>

              <div class="botao-cadastro">
                <a class="botao verde extra-grande" href="">Faça seu cadastro</a>
              </div>
            </div>

            <div class="direita">
              <div class="tabela">
                <img class="tabela-precos" src={img_tabela_precos}></img>
              </div>
            </div>
          </section>
        </div>
      </main> 
      <Footer/>
    </div>

);
}
