"use client"
import React from "react";
import "./Footer.css";
import {MessageCircle} from "react-feather"; 
import {Facebook} from "react-feather"; 
const { useRouter } = require('next/navigation');
import { DevsPath } from "../../../helpers/paths";

export default function Footer() {

  const router = useRouter();

  return(
    <footer>
        <div className="footer_Flex" >
          <div className="footer_Info"> 
            <span>
              <a class="nav-bar-item sobre-clinica" href="">Sobre a clínica</a>
            </span>
            <span>
              <a onClick={()=>{router.push(DevsPath)}} class="nav-bar-item dev" href="">Desenvolvedores</a>
            </span>
          </div>

          <h1>CONTATO</h1>

          <div className="footer_Contact" >
            <span>
              contato@vetdor.com
            </span>

            <div className="whatsap_Contact">
              <MessageCircle/>
              <span>
                (xx)xxxxx-xxxx
              </span>
            </div>
            
            <div className="faceboot_Contact" >
              <Facebook/>
              <span>
                /VetDor
              </span>
            </div>
          </div>
      </div> 
    </footer>

  
  );
}