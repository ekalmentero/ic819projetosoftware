import "./Cadastro_Form.css"


export default function Cadastro_Form(){
  return(
  <div>

<h2>Cadastre-se e comece a cuidar dos seus pets </h2>
    
    <div className="form_Flex">

    <div className="first_div" >
      <label for="name" >Nome Completo</label>
      <input id="name" name="name" placeholder="Seu nome" type="text"/>

      <label for="cpf" >CPF (somente números) </label>
      <input id="cpf" name="cpf"  placeholder="XXX-XXX-XXX-XX" type="number"/>

      <label for="dataNasc" >Data de nascimento </label>
      <input  id="dataNasc" name="dataNasc" placeholder="DD/MM/AAAA" type="date"/>

      <label for="cell" >Celular (somente números)</label>
      <input id="cell" name="cell"  placeholder="(XX)XXXXX-XXXX " type="number"/>
    </div>

    <div className="second_div">
      <label for="mail" >E-mail</label>
      <input id="mail" name="mail" placeholder="email@exemplo.com" type="email"/>

      <label for="password" >Senha</label>
      <input  id="password" name="password" type="password"/>

      <label for="repassword" >Repita a senha</label>
      <input id="repassword" name="repassword"  type="password"/>

      <button type="submit">CADASTRAR</button>
    <button type="submit"> CADASTRAR COM GOOGLE </button>

    </div>

   
    </div>
  </div>
  )

}