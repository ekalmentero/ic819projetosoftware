"use client"

import { useState } from "react"
import "./cadastroFichaPet.css"
import DOMPurify from "dompurify";
import { async } from "@firebase/util";

export default function CadastroFicha() {

  const [Date, setDate] = useState(null);
  const [text,setText] = useState(null);
  const [TypeFile, setType ] = useState(null);

  console.log(text);
  console.log(Date);
  console.log(TypeFile);

  const handleSubmit = (e) => {
    e.preventDefault();

    const  TypeFileLimpo = DOMPurify.sanitize(TypeFile);
    const textLimpo = DOMPurify.sanitize(text);
    const dateLimpo = DOMPurify.sanitize(Date);

    if (textLimpo.length == 0 ) {
        window.alert("Não foi inserido nenhum texto")
    }
    if (dateLimpo.length == 0) {
      window.alert("Nenhuma Data foi inserida")
    }
    if (TypeFileLimpo.length == 0 || TypeFileLimpo == null ) {
      window.alert("Não foi definido o tipo de documento")
    }
    
    console.log(`handleSubmit= tudo válido`);

    const PetFicha = {
      tipoArquivo: TypeFileLimpo,
      texto: textLimpo,
      data: dateLimpo
    }

    const postData = async () =>{
      console.log(`[postData] userData = ${JSON.stringify(PetFicha)}`)
      
      console.log(`fetch`);
      const response = await fetch("http://localhost:8080/storeFile", {
        method: "POST",
        body: JSON.stringify(PetFicha),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      return response.json();
    };

    postData().then((resdata)=>{
      console.log(`[postData.then] resData= ${JSON.stringify(resdata)}`);

        if (resdata.code !== "OK") {
          window.alert(resdata.message);  
          return;
      }
    });
  }

  return(
    <>
      <div className="Text-div" >
        <h1 className="Title-text" > Escreva aqui ... sobre o PET </h1>

          <label for="date" >Digite aqui a data em que essa consulta foi realizada  </label>
          <input onChange={(e)=> {setDate(e.target.value) }} name="date" type="date" className="date"/>
          <label className="label" for="date" >(mês/dia/ano)</label>

          <label className="TypeFile" >Selecione o tipo de documento que vai querer Enviar</label>
          <select required selected="Diagnostico" onChange={(e) =>{setType(e.target.value)}}  className="FileSelect" name="TypeFileSelect" >
          <option value="" selected disabled hidden>Escolha aqui</option>
            <option value="Diagnostico" >Diagnostico</option>
            <option value="Laudo">Laudo</option>
            <option value="Observações" >Observações</option>
          </select>
          <textarea onChange={ (e)=>{ setText(e.target.value)}} className="Text-area" placeholder="texto referente as avaliações médicas do pet" >
          </textarea>

        <button onClick={ (e)=> { handleSubmit(e)}} className="Button-submit" >Enviar o Arquivo</button>

      </div>

    </>
  )
}