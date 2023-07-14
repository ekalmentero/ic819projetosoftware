"use client"
import { useState } from "react";

import "./aniRegister.css";
import DOMPurify from "dompurify";

const validations = require('./../validacoes');

export default function aniRegister() {
  const [nome, setNome] = useState(null);
  const [age, setAge] = useState(null);
  const [race, setRace] = useState(null);
  const [gender, setGender] = useState(null)
  const [ownerCpf, setOwnerCpf] = useState(null)
  const [species, setSpecies] = useState(null)

  const handleSubmit = (e)=>{
    e.preventDefault();

    console.log('[handleSubmit]');


    // Sanitizando as entradas
    const nomeLimpo = DOMPurify.sanitize(nome);
    const ageLimpo = DOMPurify.sanitize(age);
    const raceLimpo = DOMPurify.sanitize(race);
    const genderLimpo = DOMPurify.sanitize(gender);
    const ownerCpfLimpo = DOMPurify.sanitize(ownerCpf)
    const speciesLimpo = DOMPurify.sanitize(species)
   

    console.log(`nomeLimpo = ${nomeLimpo}`);
    console.log(`ageLimpo = ${ageLimpo}`);
    console.log(`raceLimpo = ${raceLimpo}`);
    console.log(`genderLimpo = ${genderLimpo}`);
    console.log(`ownerCpfLimpo = ${ownerCpfLimpo}`);
    console.log(`speciesLimpo = ${speciesLimpo}`);

    const StringOnly = /^[A-Za-z]/;
    const NumberOnly = /^[0-9]*$/;

    // Validando as entradas
    if(!validations.nameValidation(nomeLimpo)) {
      window.alert("Nome Inválido");
      return;
    }

    if(NumberOnly.test(ageLimpo) !== true) {
      window.alert("Idade do animal inválida");
      return;
    }
    
    if(StringOnly.test(raceLimpo) !== true ) {
      window.alert("raça do animal inválida");
      return;
    }

    if(genderLimpo.toUpperCase() !== "MACHO" && genderLimpo.toUpperCase() !== "FÊMEA") {
      window.alert("sexo inválido");
      return;
    }

    if(!validations.cpfValidation(ownerCpfLimpo)) {
      window.alert("cpf do dono inválido");
      return;
    }

    if(speciesLimpo.toUpperCase() !== "CACHORRO" && speciesLimpo.toUpperCase() !== "GATO") {
      window.alert("cpf do dono inválido");
      return;
    }

    console.log("tudo válido");

    const aniData = {
      nome: nomeLimpo,
			raca: raceLimpo,
			sexo: genderLimpo,
			especie: speciesLimpo,
			idade: ageLimpo,
			cpfResponsavel: ownerCpfLimpo,
    }

    console.log("fetch para a rota de cadastro do animal");

    const PostDataAni = async () => {
      const response = await fetch("http://localhost:8080/createAni", {
        method: "POST",
        body: JSON.stringify(aniData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      return response.json();
    };

    PostDataAni().then((resData) =>{
      if (resData.code !== "OK" ) {
        window.alert(resData.message);
        return;
      } else {
        console.log("Redirecionando para o perfil do Animal");
        
        // Setar context Ani
      }
    });
}


  return(
  <div className="page_flex">
    <div className="AniProfile_flex" >
      <div className="Title_flex" >
        <h1>Perfil do meu PET</h1>
      </div>

    <div className="Profile_pic" >
      {/* é necessário termos um componente que ajude nos a termos  */}
      <h2>Caramelinho</h2>
    </div>

    <div className="Profile_data">
      <label for="name" >Nome</label>
      <input id="name" onChange={(e)=>setNome(e.target.value)}  name="name" placeholder="Nome do animal" type="text"/>
      
      <label for="name" >Idade</label>
      <input id="name" onChange={(e)=>setAge(e.target.value)}  name="name" placeholder="Idade do Animal" type="text"/>

      <label for="name" >Raça</label>
      <input id="name" onChange={(e)=>setRace(e.target.value)}  name="name" placeholder="Raça do animal" type="text"/>

      <label for="name" >Sexo</label>
      <input id="name" onChange={(e)=>setGender(e.target.value)} name="name" placeholder="Macho ou Fêmea" type="text"/>

      <label for="name" >CPF do responsável</label>
      <input id="name" onChange={(e)=>setOwnerCpf(e.target.value)}  name="name" placeholder="CPF do responsável" type="text"/>

      <label for="name" >Especie</label>
      <input id="name" onChange={(e)=> setSpecies(e.target.value)} name="name" placeholder="Cachorro ou Gato" type="text"/>

        <button className="button_submit" onClick={(e) => handleSubmit(e)} type="submit">Cadastrar novo animal </button>
    </div>
    </div>
  </div>
  );
}