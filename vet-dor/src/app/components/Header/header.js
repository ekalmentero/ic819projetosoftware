import React from "react";
import { LogIn } from "react-feather";
const logo = "/assets/Logo_temp.png";
import "./header.css";

export default function Header() {
  return(
  <div className="header_flex" >
    <div className="menu_header">
        <span>
          QUEM SOMOS
        </span>
        <span>
          CONTATO
        </span>
        <span>
          TABELA DE PREÇOS
        </span>
      </div>
      <img className="logo_menu" src={logo} />
      <LogIn className="header_icon"   />
  </div>
);
}

