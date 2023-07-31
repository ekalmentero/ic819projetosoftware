"use client"
import React from "react";
import { LogIn } from "react-feather";
const logo = "/assets/logo-verde-branco.png";
import "./header.css";

import { cadastroPath, LoginPath, sobreNosPath } from "../../../helpers/paths"

const { useRouter } = require('next/navigation');

export default function Header() {

 const router = useRouter();

  return(
    <header>
      <div className="header_flex" >
        <div className="menu_header">
            <span>
            <a onClick={() => { router.push(sobreNosPath) }} class="nav-bar-item quem-somos">QUEM SOMOS</a>
            </span>
            <span>
              <a class="nav-bar-item contato">CONTATO</a>
            </span>
            <span>
              <a onClick={()=>{ router.push(LoginPath) }} class="nav-bar-item contato">LOGIN</a>
            </span>
            <span>
              <a onClick={()=>{ router.push(cadastroPath) }} class="nav-bar-item contato">CADASTRAR</a>
            </span>
          </div>
          <img className="logo_menu" src={logo} />
          <LogIn className="header_icon"   />
      </div>
    </header>
  
);
}

