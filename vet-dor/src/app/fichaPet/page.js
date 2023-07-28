"use client"
import "./visualizar_ficha.css"
import { useState } from "react";

export default function Visualizar_Ficha() {
// Link para um artigo ensinando a enviar artigo = https://blog.logrocket.com/firebase-cloud-storage-firebase-v9-react/
// Link da documentação do próprio firebase = https://firebase.google.com/docs/storage/web/upload-files
    const [f, setF] = useState({});

    const handleFileChange = (e) => {
        if (e.target.files) {
            setF(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        
        if (!f) {
            alert('Arquivo inválido');
            return
        }

        console.log(f);


        // const formData = new FormData();
        // formData.append('file', f);
        // // testar: formData.set()
        // console.log(formData);

        // const postData = async () => {
        //     console.log('[postData] fetch para /storeFile');
        //     const response = await fetch("http://localhost:8080/storeFile", {
        //         method: "POST",
        //         body: formData,
        //     })
        //     return response.json();
        // }

        // postData().then((resData) => {
        //     console.log(`[postData.then] resData = ${resData}`);
        
        //     window.alert(resData.message);
        //     // document.getElementById('pdfForm').reset();
        //     return;
        // });
    }
    
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
                        <p className="etiqueta grande laranja">Receita</p>
                        <object data="sample-pdf.pdf#page=1&zoom=50" type="application/pdf" className="pdf-diagnostico" name="pdf-diagnostico"> <p>Não foi possível carregar o PDF. Baixe o arquivo diretamente.</p> </object>
                    </div>
                    
                    <div className="pdf">
                        <p className="etiqueta grande laranja">Laudo</p>
                        <object data="sample-pdf.pdf#page=1&zoom=50" type="application/pdf" className="pdf-laudo" name="pdf-laudo"> <p>Não foi possível carregar o PDF. Baixe o arquivo diretamente.</p> </object>
                    </div>

                    <div className="pdf">
                        <form onSubmit={(e)=>{e.preventDefault()}} id="pdfForm">
                            <p className="etiqueta grande laranja">Diagnóstico</p>
                            <input id="inputDiagnostico" type="file"  onChange={handleFileChange} />
                            <button  type="submit" onClick={handleSubmit } >Enviar arquivo</button>
                        </form>
                    </div>

                    <div className="pdf">
                        <p className="etiqueta grande laranja">Receitas</p>
                        <input  type="file"/>
                        <button >Enviar Receita</button>
                    </div>

                    <div className="pdf">
                        <p className="etiqueta grande laranja">Laudo</p>
                        <input type="file"/>
                        <button>Enviar Laudo</button>
                    </div>
                </div>
                
            </div>
        </main>
    )
}   