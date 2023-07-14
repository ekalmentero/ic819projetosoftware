"use client"
import "./visualizar_ficha.css"
import { useState } from "react";
// imports referentes a implementação do firebase

export default function Visualizar_Ficha(){

//--------------------------------------------------------

// Link para um artigo ensinando a enviar artigo = https://blog.logrocket.com/firebase-cloud-storage-firebase-v9-react/
// Link da documentação do próprio firebase = https://firebase.google.com/docs/storage/web/upload-files

    return(
        <main>
            <div className="form">
                <h1>Ficha do Pet</h1>
                <div className="header-info">
                    <div className="left">
                        <img className="perfil-cachorro" src="https://pegadanatural.com.br/wp-content/uploads/3-maneiras-de-cuidar-do-seu-filhote-de-cachorro-com-qualidade.jpg" alt=""/>
                        <h2>Caramelinho</h2>
                    </div>
                    

                    <div className="right">
                        <div className="info-ficha">
                            <div className="item">
                                <label for="medico">Médico Veterinário</label>
                                <input type="text" name="medico" id="medico" value="Fulaninho Silva" readonly/>
                            </div>
                            
                            <div className="item">
                                <label for="crm">CRM</label>
                                <input type="text" name="crm" id="crm" value="123456789" readonly/>
                            </div>
                            
                            <div className="item">
                                <label for="data">Data</label>
                                <input type="text" name="data" id="data" value="12/01/2023" readonly/>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="area-pdfs">
                    <div className="pdf">
                        <p className="etiqueta grande laranja">Diagnóstico</p>
                        <object data="sample-pdf.pdf#page=1&zoom=50" type="application/pdf" className="pdf-diagnostico" name="pdf-diagnostico"> <p>Não foi possível carregar o PDF. Baixe o arquivo diretamente.</p> </object>
                    </div>

                    <div className="pdf">
                        <p className="etiqueta grande laranja">Laudo</p>
                        <object data="sample-pdf.pdf#page=1&zoom=50" type="application/pdf" className="pdf-laudo" name="pdf-laudo"> <p>Não foi possível carregar o PDF. Baixe o arquivo diretamente.</p> </object>
                    </div>

                    <div className="pdf">
                        <p className="etiqueta grande laranja">Receitas</p>
                        <object data="sample-pdf.pdf#page=1&zoom=50" type="application/pdf" className="pdf-receitas" name="pdf-receitas"> <p>Não foi possível carregar o PDF. Baixe o arquivo diretamente.</p> </object>
                    </div>
                    
                </div>
            </div>
        </main>
    )
}   