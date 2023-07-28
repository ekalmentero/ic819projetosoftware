"use client"
import { useState } from "react";
import "./recuperarFicha.css"
import DOMPurify from "dompurify";
const validations = require("./../validacoes/index");


export default function RecoverFicha() {

  const [IdAnimal, setId] = useState(null);
  const [Date, setDate] = useState(null);
  const [TypeFile, setType ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const idAnimalLimpo = DOMPurify.sanitize(IdAnimal);
    const dateLimpo = DOMPurify.sanitize(Date);
    const TypeFileLimpo = DOMPurify.sanitize(TypeFile);

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
      data: dateLimpo
    }

    const RecoverData = async () =>{
      console.log(`[postData] userData = ${JSON.stringify(PetFicha)}`)

      console.log(`fetch recoverFile `);
      const response = await fetch("http://localhost:8080/recoverFile", {
        method: "POST",
        body: JSON.stringify(PetFicha),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      console.log(`[login] JSON.stringify(response) = ${JSON.stringify(response)}`);

      return response.json();
    };

    RecoverData().then((resData)=> {
      if(resData.code !== "OK") {
        console.log(`login.then erro`);
        window.alert(resData.message);
        return;
      } else {
        // Verificar se o objeto que vou receber é esse mesmo
        console.log(`[recoverData].then ${JSON.stringify(JSON.stringify(resData.result))}`);
      }
    });


 }

  return(
      <div className="main" >
        <h1>Ensira os dados solicitados e recupere as fichas das consultas passadas</h1>
        
        <div className="Metadata" >

        <div className="idAnimal">
          <label for="id" >Digite aqui o id do animal </label>
          <input onChange={(e)=>{setId(e.target.value)}} name="id" type="text"/>
        </div>

        <div className="date" >
          <label for="date" >Digite aqui a data em que essa consulta foi realizada  </label>
          <input onChange={(e)=>{setDate(e.target.value)}} name="date" type="date"/>
          <label className="label" for="date" >(mês/dia/ano)</label>
        </div>

        <div className="typeFile">
            <label className="TypeFile" >Selecione o tipo de documento que vai querer Enviar</label>
              <select required selected="Diagnostico" onChange={(e) =>{setType(e.target.value)}}  className="FileSelect" name="TypeFileSelect" >
                <option value="" selected disabled hidden>Escolha aqui</option>
                <option value="Diagnostico" >Diagnostico</option>
                <option value="Laudo">Laudo</option>
                <option value="Observações" >Observações</option>
              </select>
         </div>
          
        </div>

        <p></p>

        <button onClick={ (e)=> { handleSubmit(e)}} className="Button-submit" >Enviar o Arquivo</button>


      </div>
    
  );
}