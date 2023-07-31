"use client"
import "./visualizar_ficha.css"

const { useRouter } = require('next/navigation');

import { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../../contexts/usuarioContext';

import { recuperarFichaPetPath, LoginPath } from "../../helpers/paths";

export default function Visualizar_Ficha() {
  // Link para um artigo ensinando a enviar artigo = https://blog.logrocket.com/firebase-cloud-storage-firebase-v9-react/
  // Link da documentação do próprio firebase = https://firebase.google.com/docs/storage/web/upload-files

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
  }, [])

  return (
    <main>
      <div className="form">
        <h1>Ficha do Pet</h1>
        <div className="header-info">
          <div className="left">
            <img className="perfil-cachorro" src="https://pegadanatural.com.br/wp-content/uploads/3-maneiras-de-cuidar-do-seu-filhote-de-cachorro-com-qualidade.jpg" alt=""/>
            <h2>{aniInfo.name ? aniInfo.name : "Caramelinho"}</h2>
          </div>

          <div className="right">
            <div className="info-ficha">
              <div className="item">
                <label for="medico">Médico Veterinário</label>
                <input readOnly type="text" name="medico" id="medico" value="Fulaninho Silva" readonly/>
              </div>
              
              <div className="item">
                <label for="crm">CRMV</label>
                <input readOnly type="text" name="crm" id="crm" value="123456789" readonly/>
              </div>
              
              <div className="item">
                <label for="data">Data</label>
                <input readOnly type="text" name="data" id="data" value="12/01/2023" readonly/>
              </div>
            </div>
          </div>
        </div>

        <div className="area-pdfs">
          <div className="pdf">
            <p className="etiqueta grande laranja">Diagnóstico</p>
            <button className="botao verde" onClick={()=>{ router.push(recuperarFichaPetPath)}}>Acessar</button>
          </div>
          <div className="pdf">
            <p className="etiqueta grande laranja">Observações</p>
            <button className="botao verde" onClick={()=>{ router.push(recuperarFichaPetPath)}}>Acessar</button>

          </div>
            
          <div className="pdf">
            <p className="etiqueta grande laranja">Laudo</p>
            <button className="botao verde" onClick={()=>{ router.push(recuperarFichaPetPath)}}>Acessar</button>
          </div>
        </div>  
      </div>
    </main>
  )
}   