
import "./consulta.css"

export default function Consulta() {

  return(
      
      <div className='consultaFlex' >
        <h2>Dados para a realização da consulta</h2>

        <label htmlFor="name">Nome do responsável</label>
        <input name="name" type="text" placeholder="nome do Responsável" />

        <label htmlFor="cpf">CPF do Responsável</label>
        <input name="cpf" type="text" placeholder="CPF do responsável" />

        <label htmlFor="date" >Data para realização da consulta </label>
        <input name="date" type="date" />

        <label htmlFor="selectHour">Horário para realização da consulta</label>
        <select>
        <option name="selectHour" value="" selected disabled hidden>Escolha aqui</option>
          <option value="8" >8:00h</option>
          <option value="10">10:00h</option>
          <option value="13">13:00h</option>
          <option value="15">15:00</option>
        </select>

     <button>Enviar solicitação de consulta</button>
  </div>
 
  )
  
}