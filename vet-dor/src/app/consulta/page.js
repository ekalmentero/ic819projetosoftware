"use client"
import "./consulta.css"
import Header from "../components/Header/header"
import Footer from "../components/Footer/Footer"
import { useState, useEffect } from "react"
import DOMPurify from "dompurify"
import validations from "../validacoes/index"

export default function Consulta() {
  const [nomeUsuario, setNome] = useState("");
  const [cpfUsuario, setCpf] = useState("");
  const [dataConsulta, setData] = useState("");
  const [horaConsulta, setHora] = useState("");

  const [consultasCadastradas, setConsultasCadastradas] = useState([]);

  useEffect(() => {
    setConsultasCadastradas([{ date: '2023-06-19', time: 15 }, { date: '2023-08-10', time: 10 }]);

    // async function getData() {
    //   const response = await fetch('http://localhost:8080/getAllAppointments', {
    //     method: 'GET',
    //   })

    //   return response.json()
    // };

    // getData().then((resData) => {
    //   console.log(`[getData.then] resData = ${resData}`);

    //   if (resData.code !== 'OK') {
    //     window.alert(resData.message);
    //     return;
    //   }

    //   const appointments = resData.result;
    //   setConsultasCadastradas(appointments);
    // })

   console.log(`[useEffect] fim`);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // sanitizar
    const nomeLimpo = DOMPurify.sanitize(nomeUsuario);
    const cpfLimpo = DOMPurify.sanitize(cpfUsuario);
    const dataLimpo = DOMPurify.sanitize(dataConsulta);
    const horaLimpo = DOMPurify.sanitize(horaConsulta);

    // validar
    if (!validations.nameValidation(nomeLimpo)) {
      window.alert("nome do responsável não informado");
    }

    if (!validations.cpfValidation(cpfLimpo)) {
      window.alert("cpf do responsável não informado");
    }

    if (dataLimpo.length == 0 || !dataLimpo || dataLimpo === null || dataLimpo === '') {
      window.alert("Data da consulta não informada");
    }

    if (horaLimpo.length == 0 || !horaLimpo || horaLimpo === null || horaLimpo === '') {
      window.alert("hora da consulta não informada");
    }

    console.log(`tudo válido`);

    const consultaData = {
      nomeUsuario: nomeLimpo,
      cpfUsuario: cpfLimpo,
      dataConsulta: dataLimpo,
      horaConsulta: horaLimpo
    }

    // fecth para /scheduleAppointment
    const postData = async () => {
      console.log(`[postData] consultaData = ${JSON.stringify(consultaData)}`);

      const response = await fetch("http://localhost:8080/scheduleAppointment", {
        method: "POST",
        body: JSON.stringify(consultaData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      return response.json();
    }
    postData().then((resData) => {
      console.log(`[postData.then] resData = ${resData}`);

      window.alert(resData.message);
      return;
    });
  }

  return (
    <div className='consultaFlex' >
      <Header />
      <h2>Dados para a realização da consulta</h2>

      <div className="consultainfo" >
        <div className='consult_div1' >
          <div className="consultaname" >
            <label htmlFor="name">Nome do responsável</label>
            <input onChange={(e) => { setNome(e.target.value) }} name="name" type="text" placeholder="nome do Responsável" />
          </div>

          <div className="consultacpf">
            <label htmlFor="cpf">CPF do Responsável</label>
            <input onChange={(e) => { setCpf(e.target.value) }} name="cpf" type="text" placeholder="CPF do responsável" />
          </div>
        </div>

        <div className='consult_div2'>
          <div className="consultadata">
            <label htmlFor="date" >Data da consulta </label>
            <input onChange={(e) => { setData(e.target.value) }} name="date" type="date" />
          </div>

          <label htmlFor="selectHour">Horário da consulta</label>
          <select onChange={(e) => { setHora(e.target.value) }} className="consultselect" >
            <option name="selectHour" value="" selected disabled hidden>Escolha aqui</option>
            <option value="8" >8:00h</option>
            <option value="10">10:00h</option>
            <option value="13">13:00h</option>
            <option value="15">15:00</option>
          </select>

          <button onClick={(e) => { handleSubmit(e) }} className="consultaButton" >Enviar solicitação de consulta</button>
        </div>
      </div>

      <div className="consultasMarcadas">
        <h2>Consultas Marcadas</h2>
        <p>Consulte aqui os horários que já estão reservados para outras consultas</p>
        {consultasCadastradas ?

          consultasCadastradas.map((c) => (
              <div className="consultaItem">
                <span> Dia:  {c.date} </span>
                {' '}
                <span> Horário {c.time}</span>
              </div>
            )
          )
        :
          <p>Nehnuma consulta cadastrada ainda</p>
        }
      </div>

      <Footer />
    </div>
  )
}