"use client"

import { useState } from "react"
import "./cadastroFichaPet.css"
import DOMPurify from "dompurify";
import { async } from "@firebase/util";

export default function CadastroFicha() {

  const [Date, setDate] = useState(null);
  const [fileName,setFileName] = useState(null);
  const [text,setText] = useState(null);

  console.log(Date);
  const handleSubmit = (e) => {
    e.preventDefault();

    let textLimpo = DOMPurify.sanitize(text);
    let dateLimpo = DOMPurify.sanitize(Date);

    if (textLimpo.length == 0 ) {
        window.alert("Não foi inserido nenhum texto")
    }
    if (dateLimpo.length == 0) {
      window.alert("Nenhuma Data foi inserida")
    }
    
    console.log(`handleSubmit= tudo válido`);

    const PetFicha = {
      texto: textLimpo,
      data: dateLimpo
    }

    const postData = async () =>{
      console.log(`fetch`);

      const response = await fetch("http://localhost:8080/storeFile", {
        method: "POST",
        body: JSON.stringify(PetFicha),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
    }


  }



  
  return(
    <>
      <div className="Text-div" >
        <h1 className="Title-text" > Escreva aqui ... sobre o PET </h1>

          <label for="date" >Digite aqui a data em que essa consulta foi realizada  </label>
          <input onChange={(e)=> {setDate(e.target.value) }} name="date" type="date" className="date"/>
          <label className="label" for="date" >(mês/dia/ano)</label>


          <textarea onChange={ (e)=>{ setText(e.target.value)}} className="Text-area" placeholder="texto referente as avaliações médicas do pet" >
          </textarea>

        <button onClick={ (e)=> { handleSubmit(e)}} className="Button-submit" >Enviar o Arquivo</button>

      </div>

    </>
  )
}