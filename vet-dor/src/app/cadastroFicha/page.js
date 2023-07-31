"use client"

import { useState } from "react"
import "./cadastroFichaPet.css"
import DOMPurify from "dompurify";
import { async } from "@firebase/util";
const validations = require("./../validacoes/index");

const { useRouter } = require('next/navigation');
import { recuperarFichaPetPath } from "../../helpers/paths";

export default function CadastroFicha() {
  const router = useRouter();

  const [IdAnimal, setId] = useState(null);
  const [Date, setDate] = useState(null);
  const [text,setText] = useState(null);
  const [TypeFile, setType ] = useState(null);

  console.log(IdAnimal);
  console.log(text);
  console.log(Date);
  console.log(TypeFile);

  const handleSubmit = (e) => {
    e.preventDefault();

    const TypeFileLimpo = DOMPurify.sanitize(TypeFile);
    const textLimpo = DOMPurify.sanitize(text);
    const dateLimpo = DOMPurify.sanitize(Date);
    const idAnimalLimpo = DOMPurify.sanitize(IdAnimal)

    if (textLimpo.length == 0 ) {
        window.alert("Não foi inserido nenhum texto")
    }
    if (dateLimpo.length == 0) {
      window.alert("Nenhuma Data foi inserida")
    }
    if (TypeFileLimpo.length == 0 || TypeFileLimpo == null ) {
      window.alert("Não foi definido o tipo de documento")
    }
    if (!validations.cpfValidation(idAnimalLimpo)) {
        window.alert("código do paciente digitado de maneira incorreta ou não foi digitado")
    }
    
    console.log(`handleSubmit= tudo válido`);

    const PetFicha = {
      idAnimal: idAnimalLimpo,
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

      router.push(recuperarFichaPetPath)
    });
  }

  return(
    <>
      <div className="Text-div" >
        <h1 className="Title-text" > Escreva aqui ... sobre o PET </h1>

        <div className="MetaData" >
          <div className="dataDiv">
            <label for="date" >Digite aqui a data em que essa consulta foi realizada  </label>
              <input onChange={(e)=> {setDate(e.target.value) }} name="date" type="date" className="date"/>
            <label className="label" for="date" >(mês/dia/ano)</label>
          </div>
          <div className="typeFileDiv" >
            <label className="TypeFile" >Selecione o tipo de documento que vai querer Enviar</label>
            <select required selected="Diagnostico" onChange={(e) =>{setType(e.target.value)}}  className="FileSelect" name="TypeFileSelect" >
              <option value="" selected disabled hidden>Escolha aqui</option>
              <option value="Diagnostico" >Diagnostico</option>
              <option value="Laudo">Laudo</option>
              <option value="Observações" >Observações</option>
          </select>
          </div>
          <div className="dataDiv">
            <label for="id" >Cpf do responsável do animal</label>
              <input onChange={(e)=> {setId(e.target.value) }} name="id" type="text" className="date"/>
          </div>

        </div>

          <textarea onChange={ (e)=>{ setText(e.target.value)}} className="Text-area" placeholder="texto referente as avaliações médicas do pet" >
          </textarea>

        <button onClick={ (e)=> { handleSubmit(e)}} className="Button-submit" >Enviar o Arquivo</button>

      </div>

    </>
  )
}