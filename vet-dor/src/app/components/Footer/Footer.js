import React from "react";
import "./Footer.css";
import {MessageCircle} from "react-feather"; 
import {Facebook} from "react-feather"; 

export default function Footer() {
  return(
<div className="footer_Flex" >
    <div className="footer_Info"> 
     <span  >
        Sobre a Clinica
     </span>
     <span>
        Tabela de preços
     </span>
     <span>
        Desenvolvedores
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
  
  );
}