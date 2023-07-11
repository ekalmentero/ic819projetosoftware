import { MinusCircle } from "react-feather";
import "./userProfile.css";
const Pic = "/assets/Pic.png"

export default function userProfile() {
  return(
  <div className="page_flex">
    <div className="UserProfile_flex" >
      <div className="Title_flex" >
        <h1>Perfil de usuário</h1>
      </div>

      <div className="Profile_data">
      <label for="name" >Nome</label>
        <input id="name" value="" name="name" placeholder="Seu nome" type="text"/>

        <label for="cpf" >CPF</label>
        <input id="cpf" value="" name="cpf" placeholder="Seu cpf" type="text"/>

        <label for="celular" >número de celular</label>
          <input id="celular" value="" name="celular" placeholder="Seu número de celular" type="text"/>

        <label for="email" >Email</label>
        <input id="email" value="" name="email" placeholder="Seu email" type="text"/>
        
        <button  className="submit_trad" type="submit"> Perfil do Animal </button>
      </div>
    </div>
  </div>
  );
}