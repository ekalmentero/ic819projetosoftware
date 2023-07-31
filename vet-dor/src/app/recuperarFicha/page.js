"use client"

import "./recuperarFicha.css"

import DOMPurify from "dompurify";

const { useRouter } = require('next/navigation');

import { useState, useContext, useEffect } from 'react';
import { UsuarioContext } from '../../contexts/usuarioContext';

import { recuperarFichaPetPath, LoginPath } from "../../helpers/paths";
const validations = require("./../validacoes/index");

export default function RecoverFicha() {
  const router = useRouter();
  const { cpfUsuario } = useContext(UsuarioContext);

  console.log(`cpf =${cpfUsuario}`);
  useEffect(() => {
    // se o context não estiver setado, o usuario não está logado: mandar pra LOGIN!
    // if (!cpfUsuario) {
      // alert("usuario não logado");
    //   router.push(LoginPath)
    // }
  }, []);   

  const [Date, setDate] = useState("");
  const [TypeFile, setType ] = useState("");

  const [ficha, setFicha] = useState({});

  const [fichaCarregada, setFichaCarregada] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cpfLimpo = DOMPurify.sanitize(cpfUsuario);
    const dateLimpo = DOMPurify.sanitize(Date);
    const TypeFileLimpo = DOMPurify.sanitize(TypeFile);

    if (dateLimpo.length == 0) {
      window.alert("Nenhuma Data foi inserida");
    }

    if (TypeFileLimpo.length == 0 || TypeFileLimpo == null ) {
      window.alert("Não foi definido o tipo de documento");
    }

    if (!validations.cpfValidation(cpfUsuario)) {
      window.alert("código do paciente digitado de maneira incorreta ou não foi digitado");
    }

    console.log(`[handleSubmit] tudo válido`);

    const fichaPet = {
      idAnimal: cpfLimpo,
      tipoArquivo: TypeFileLimpo,
      data: dateLimpo
    }

    const recoverData = async () =>{
      console.log(`[recoverData] fichaPet = ${JSON.stringify(fichaPet)}`)

      console.log(`fetch recoverFile `);
      const response = await fetch("http://localhost:8080/recoverFile", {
        method: "POST",
        body: JSON.stringify(fichaPet),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      console.log(`[login] JSON.stringify(response) = ${JSON.stringify(response)}`);

      return response.json();
    };

    recoverData().then((resData)=> {
      if(resData.code !== "OK") {
        console.log(`login.then erro`);
        window.alert(resData.message);
        return;
      } else {
        // Verificar se o objeto que vou receber é esse mesmo
        console.log(`[recoverData].then ${JSON.stringify(JSON.stringify(resData.result))}`);

        setFicha({
          texto: resData.result.getAniFile.texto,
          nomeAnimal: resData.result.getAniInfo.name,
          sexo: resData.result.getAniInfo.sexo,
          raca: resData.result.getAniInfo.race,
          idade: resData.result.getAniInfo.age
        })

        setFichaCarregada(true);
      }
    });
  }

  return (
    <div className="main">
      <h1>Insira os dados solicitados e recupere as fichas das consultas passadas</h1>
      
      <div className="Metadata">
        <div className="date">
          <label for="date">Digite aqui a data em que essa consulta foi realizada  </label>
          <input onChange={(e)=>{setDate(e.target.value)}} name="date" type="date"/>
          <label className="label" for="date">(mês/dia/ano)</label>
        </div>

        <div className="typeFile">
          <label className="TypeFile">Se lecione o tipo de documento que vai querer Enviar</label>
          <select required selected="Diagnostico" onChange={(e) =>{setType(e.target.value)}} className="FileSelect" name="TypeFileSelect">
            <option value="" selected disabled hidden>Escolha aqui</option>
            <option value="Diagnostico">Diagnostico</option>
            <option value="Laudo">Laudo</option>
            <option value="Observações">Observações</option>
          </select>
        </div>

        <button onClick={ (e)=> { handleSubmit(e)}} className="Button-submit">Recuperar</button>
      </div>

      {fichaCarregada ? <>
        <div className="AniData">
          <div className="idAnimal">
            <label for="paciente">Nome do paciente </label>
            <input value={ficha?.nomeAnimal}  name="paciente" type="text"/>
          </div>

          <div className="idAnimal">
            <label for="id">Sexo </label>
            <input value={ficha?.sexo}  name="id" type="text"/>
          </div>

          <div className="idAnimal">
            <label for="id">Raça </label>
            <input  value={ficha?.raca}  name="id" type="text"/>
          </div>

          <div className="idAnimal">
            <label for="id">Idade </label>
            <input value={`${ficha?.idade} anos`} name="id" type="text"/>
          </div>
        </div>

        <textarea className="Text-area" value={JSON.stringify(ficha?.texto)}></textarea>
      </>
      : null}
    </div>
  );
}